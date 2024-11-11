import React from 'react';
import { Image } from 'react-native';

import { ClappingHandsGIF } from 'src/assets';
import { Button, PageLayout, Text } from 'src/components';
import { useGameStore } from 'src/stores';
import { useNavigate } from 'src/hooks';

import * as S from './styled';

export const GameRoundDoneScreen: React.FC = () => {
  const { game } = useGameStore();
  const { navigate, initNavigate } = useNavigate();

  if (!game) {
    navigate('GameStart');
    return null;
  }

  const prevRoundTimeDiff =
    (game.prevRound?.avgReactionTime ?? 0) - (game.currentRound.avgReactionTime ?? 0);

  const roundLeft = game.rounds.length - (game.currentRoundIndex + 1);

  const onPressNextRound = () => {
    if (game.nextRound()) {
      navigate('GameMain');
    } else {
      initNavigate('GameDone');
    }
  };

  const getMessage = () => {
    if (game.prevRound) {
      if (Math.abs(prevRoundTimeDiff) <= 0.01) {
        return `이전 기록과 같은 시간이에요.`;
      } else if (prevRoundTimeDiff < 0) {
        return `이전 기록보다 ${-prevRoundTimeDiff.toFixed(1)}초 늦어졌어요.`;
      } else {
        return `이전 기록보다 ${prevRoundTimeDiff.toFixed(1)}초 빨랐어요.`;
      }
    } else {
      return `${game.currentRound.totalTime.toFixed(1)}초 걸렸어요.`;
    }
  };

  return (
    <PageLayout hasGoBackIcon={false}>
      <S.GameRoundDoneContainer>
        <Image source={ClappingHandsGIF} style={{ width: 160, height: 160 }} />
        <Text size={30} font="bold">
          잘 하셨습니다!
        </Text>
        <Text size={20} font="regular" color="gray">
          {getMessage()}
        </Text>
      </S.GameRoundDoneContainer>
      <S.GameRoundDoneButtonContainer>
        <Button onPress={onPressNextRound}>다음 라운드</Button>
        <Text size={14} font="regular" color="gray">
          {roundLeft > 1 ? `${roundLeft} 라운드 남았어요.` : '마지막 라운드에요.'}
        </Text>
      </S.GameRoundDoneButtonContainer>
    </PageLayout>
  );
};
