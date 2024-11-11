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

export const GameMainScreen: React.FC = () => {
  const [isFirstShown, setIsFirstShown] = useState(true);
  const [isAnswerShownCount, setIsAnswerShownCount] = useState(2);
  const [startedTime, setStartedTime] = useState(new Date());
  const [solvingTime, setSolvingTime] = useState(0);

  const { initNavigate } = useNavigate();

  const { game } = useGameStore();

  if (!game) {
    initNavigate('GameStart');
    return null;
  }

  const [circles] = useState<CircleStateProp[]>(
    game.currentRound.images.map((image, index) => ({
      top: Math.floor(Math.random() * (isAndroid ? 20 : 60)),
      left: Math.max(0, Math.floor(Math.random() * 60) - 35),
      image: image,
      index: index,
    })),
  );

  const onPressCircle = (index: number) => {
    if (isAnswerShownCount > 0 || game.currentStage.userChoiceIndex !== undefined) return;

    game.currentStage.userChoiceIndex = index;
    game.currentStage.reactionTime = (new Date().getTime() - startedTime.getTime()) / 1000;

    setIsAnswerShownCount(1);
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
            isAnswerShownCount > 0 &&
            (game.currentStage.userChoiceIndex === undefined ||
              game.currentStage.userChoiceIndex === circle.index)
          }
          onPress={() => onPressCircle(circle.index)}
        />
      ));

  useEffect(() => {
    setTimeout(() => {
      if (isAnswerShownCount <= 0) {
        return;
      }
      setIsAnswerShownCount((prev) => prev - 1);

      if (isAnswerShownCount <= 1) {
        if (isFirstShown) {
          setIsFirstShown(false);
        }

        if (game.currentStage.userChoiceIndex !== undefined) {
          if (game.currentRound.nextStage()) {
          } else {
            initNavigate(
              game.rounds.length - (game.currentRoundIndex + 1) ? 'GameRoundDone' : 'GameDone',
            );
          }
        }

        setStartedTime(new Date());
      }
    }, 1000);

    /**  isAnswerShownCount가 0이 되면 1초마다 setSolvingTime을 1씩 증가 */
    if (isAnswerShownCount === 0) {
      const timer = setInterval(() => {
        setSolvingTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setSolvingTime(0);
    }
  }, [isAnswerShownCount]);

  return (
    <PageLayout
      hasGoBackIcon={false}
      time={Format.time(isAnswerShownCount > 0 ? isAnswerShownCount : solvingTime)}
    >
      <S.GameMainContainer>
        <Text size={30} font="bold">
          아래 그림과 동일한 것을{'\n'}
          찾아보세요!
        </Text>
        <S.GameMainImageWrapper>
          {(!isFirstShown || isAnswerShownCount <= 0) && (
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
