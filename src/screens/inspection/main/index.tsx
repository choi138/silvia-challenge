import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

import { Circle, PageLayout, Text } from 'src/components';
import { GameImage, useGameStore } from 'src/stores';
import { useNavigate } from 'src/hooks';

import * as S from './styled';

export interface CircleStateProp {
  top: number;
  left: number;
  right: number;
  bottom: number;
  image: GameImage;
  index: number;
}

export const InspectionMainScreen: React.FC = () => {
  const [isFirstShown, setIsFirstShown] = useState(true);
  const [isAnswerShownCount, setIsAnswerShownCount] = useState(2);
  const [startedTime, setStartedTime] = useState(new Date());
  const { navigate } = useNavigate();

  const { game } = useGameStore();

  if (!game) {
    navigate('InspectionStart');
    return null;
  }

  const [circles] = useState<CircleStateProp[]>(
    game.currentRound.images.map((image, index) => ({
      top: Math.floor(Math.random() * 40),
      left: Math.floor(Math.random() * 40),
      right: Math.floor(Math.random() * 40),
      bottom: Math.floor(Math.random() * 40),
      image: image,
      index: index,
    })),
  );

  useEffect(() => {
    setTimeout(() => {
      if (isAnswerShownCount <= 0) {
        return;
      }
      setIsAnswerShownCount((prev) => {
        if (prev <= 1) {
          if (isFirstShown) {
            setIsFirstShown(false);
          }

          if (game.currentStage.userChoiceIndex !== undefined) {
            if (game.currentRound.nextStage()) {
            } else {
              navigate('InspectionRoundDone');
            }
          }

          setStartedTime(new Date());
        }

        return prev - 1;
      });
    }, 1000);
  }, [isAnswerShownCount]);

  const onCirclePress = (index: number) => {
    if (isAnswerShownCount > 0 || game.currentStage.userChoiceIndex !== undefined) return;

    // 2초 동안 누른 원의 사진을 보여줍니다
    game.currentStage.userChoiceIndex = index;
    game.currentStage.reactionTime = (new Date().getTime() - startedTime.getTime()) / 1000;

    setIsAnswerShownCount(2);
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
        <Circle
          key={circle.index}
          right={circle.right}
          left={circle.left}
          top={circle.top}
          bottom={circle.bottom}
          img={circle.image.src}
          opened={
            isAnswerShownCount > 0 &&
            (game.currentStage.userChoiceIndex === undefined ||
              game.currentStage.userChoiceIndex === circle.index)
          }
          onPress={() => onCirclePress(circle.index)}
        />
      ));

  return (
    <PageLayout>
      <S.InspectionMainContainer>
        <Text size={30} fonts="bold">
          아래 그림과 동일한 것을{'\n'}
          찾아보세요! {isAnswerShownCount}
        </Text>
        <S.InspectionMainImageWrapper>
          {(!isFirstShown || isAnswerShownCount <= 0) && (
            <Image
              source={game.currentRound.currentImage.src}
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </S.InspectionMainImageWrapper>
        <Circle.Container>
          <Circle.Row>{renderCircles(0, 2)}</Circle.Row>
          <Circle.Row>{renderCircles(2, 3)}</Circle.Row>
          <Circle.Row>{renderCircles(3, 5)}</Circle.Row>
          <Circle.Row>{renderCircles(5, 6)}</Circle.Row>
        </Circle.Container>
      </S.InspectionMainContainer>
    </PageLayout>
  );
};
