import React from 'react';
import { Image } from 'react-native';

import { ClappingHandsGIF } from 'src/assets';
import { Button, PageLayout, Text } from 'src/components';
import { useGameStore } from 'src/stores';
import { useNavigate } from 'src/hooks';

import * as S from './styled';

export const InspectionRoundDoneScreen: React.FC = () => {
  const { game } = useGameStore();
  const { navigate } = useNavigate();

  if (!game) {
    navigate('InspectionStart');
    return null;
  }

  const prevRoundTimeDiff =
    (game.prevRound?.avgReactionTime ?? 0) - (game.currentRound.avgReactionTime ?? 0);

  const roundLeft = game.rounds.length - (game.currentRoundIndex + 1);

  const onPressNextRound = () => {
    if (game.nextRound()) {
      navigate('InspectionMain');
    } else {
      navigate('InspectionDone');
    }
  };

  return (
    <PageLayout>
      <S.RoundDoneContainer>
        <Image source={ClappingHandsGIF} style={{ width: 160, height: 160 }} />
        <Text size={30} fonts="bold">
          잘 하셨습니다!
        </Text>
        <Text size={20} fonts="regular" variants="gray">
          {game.prevRound
            ? prevRoundTimeDiff < 0
              ? `이전 기록보다 ${-prevRoundTimeDiff.toFixed(1)}초 늦어졌어요.`
              : `이전 기록보다 ${prevRoundTimeDiff.toFixed(1)}초 빨랐어요.`
            : `${game?.currentRound.avgReactionTime.toFixed(1)}초 걸렸어요.`}
        </Text>
      </S.RoundDoneContainer>
      <S.RoundDoneButtonContainer>
        <Button onPress={onPressNextRound}>다음 라운드</Button>
        <Text size={14} fonts="regular" variants="gray">
          {roundLeft > 1 ? `${roundLeft} 라운드 남았어요.` : '마지막 라운드에요.'}
        </Text>
      </S.RoundDoneButtonContainer>
    </PageLayout>
  );
};
