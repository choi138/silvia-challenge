import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

import { GameCircle, PageLayout, Text } from 'src/components';
import { GameImage, useGameStore } from 'src/stores';
import { useNavigate } from 'src/hooks';
import { Format, isAndroid } from 'src/utils';

import * as S from './styled';

export interface CircleStateProp {
  top: number;
  left: number;
  image: GameImage;
  index: number;
}

/**
 * 게임의 메인 화면
 */
export const GameMainScreen: React.FC = () => {
  const { initNavigate } = useNavigate();

  const { game } = useGameStore();

  if (!game) {
    initNavigate('GameStart');
    return null;
  }

  /** 정답 이미지가 보여지는 상태 */
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  /** 문제 이미지들이 보여지는 시간 */
  const [imagesShowTime, setImagesShownTime] = useState(2);
  /** 문제가 시작된 시간 */
  const [startedTime, setStartedTime] = useState(new Date());
  /** 문제를 푸는 시간 */
  const [solvingTime, setSolvingTime] = useState(0);
  /** 원의 위치와 이미지를 저장하는 배열 */
  const [circles] = useState<CircleStateProp[]>(
    game.currentRound.images.map((image, index) => ({
      top: Math.floor(Math.random() * (isAndroid ? 20 : 60)),
      left: Math.max(0, Math.floor(Math.random() * 60) - 35),
      image: image,
      index: index,
    })),
  );

  /** 유저가 선택한 원의 인덱스를 저장하고, 반응 시간을 계산합니다. */
  const onPressCircle = (index: number) => {
    if (imagesShowTime > 0 || game.currentStage.userChoiceIndex !== undefined) return;

    game.currentStage.userChoiceIndex = index;
    game.currentStage.reactionTime = (new Date().getTime() - startedTime.getTime()) / 1000;

    /** 1초 동안 문제 이미지를 보여줍니다. */
    setImagesShownTime(1);
  };

  /**
   * 배열의 인덱스에 따라 원을 렌더링합니다
   * @param start 시작 인덱스
   * @param end 종료 인덱스
   * @returns 원 컴포넌트
   */
  const renderCircles = (start: number, end: number) =>
    circles
      .slice(start, end)
      .map((circle) => (
        <GameCircle
          key={circle.index}
          left={circle.left}
          top={circle.top}
          img={circle.image.src}
          opened={
            imagesShowTime > 0 &&
            (game.currentStage.userChoiceIndex === undefined ||
              game.currentStage.userChoiceIndex === circle.index)
          }
          onPress={() => onPressCircle(circle.index)}
        />
      ));

  useEffect(() => {
    setTimeout(() => {
      if (imagesShowTime <= 0) {
        return;
      }
      setImagesShownTime((prev) => prev - 1);

      /** 1초 딜레이가 있기 때문에 answerShowTime이 1이 되면 실행합니다. */
      if (imagesShowTime <= 1) {
        /** 문제 이미지가 없어지면 정답 이미지를 보여줍니다. */
        if (!isAnswerShown) {
          setIsAnswerShown(true);
        }

        /** 유저가 선택한 원이 있는지 확인합니다.
         * 다음 스테이지가 있다면 다음 스테이지로 이동합니다.
         * 다음 스테이지가 없고 게임의 모든 라운드가 끝나지 않았다면 다음 라운드로 이동합니다.
         * 다음 스테이지가 없고 게임의 모든 라운드가 끝났다면 게임 종료 화면으로 이동합니다.
         */
        if (game.currentStage.userChoiceIndex !== undefined) {
          if (game.currentRound.nextStage()) {
          } else {
            initNavigate(
              game.rounds.length - (game.currentRoundIndex + 1) ? 'GameRoundDone' : 'GameDone',
            );
          }
        }

        /** 문제가 표시되는 시간을 측정하기 위해 시작 시간을 저장합니다. */
        setStartedTime(new Date());
      }
    }, 1000);

    /**  isAnswerShownCount가 0이 되면 1초마다 setSolvingTime을 1씩 증가 */
    if (imagesShowTime === 0) {
      const timer = setInterval(() => {
        setSolvingTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setSolvingTime(0);
    }
  }, [imagesShowTime]);

  return (
    <PageLayout
      hasGoBackIcon={false}
      time={Format.time(imagesShowTime > 0 ? imagesShowTime : solvingTime)}
    >
      <S.GameMainContainer>
        <Text size={30} font="bold">
          아래 그림과 동일한 것을{'\n'}
          찾아보세요!
        </Text>
        <S.GameMainImageWrapper>
          {isAnswerShown && (
            <Image
              source={game.currentRound.currentImage.src}
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </S.GameMainImageWrapper>
        <GameCircle.Container>
          <GameCircle.Row>{renderCircles(0, 2)}</GameCircle.Row>
          <GameCircle.Row>{renderCircles(2, 3)}</GameCircle.Row>
          <GameCircle.Row>{renderCircles(3, 5)}</GameCircle.Row>
          <GameCircle.Row>{renderCircles(5, 6)}</GameCircle.Row>
        </GameCircle.Container>
      </S.GameMainContainer>
    </PageLayout>
  );
};
