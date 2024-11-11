import React from 'react';
import { Image } from 'react-native';

import { CheerUpGIF, ClappingHandsGIF } from 'src/assets';
import { Button, PageLayout, Text } from 'src/components';
import { useGameStore } from 'src/stores';
import { useNavigate } from 'src/hooks';

import * as S from './styled';

/**
 * 게임의 라운드가 끝난 후 보여지는 화면
 */
export const GameRoundDoneScreen: React.FC = () => {
  const { game } = useGameStore();
  const { navigate, initNavigate } = useNavigate();

  if (!game) {
    navigate('GameStart');
    return null;
  }

  /** 이전 라운드와 현재 라운드의 평균 반응 시간의 차이 */
  const prevRoundTimeDiff =
    (game.prevRound?.avgReactionTime ?? 0) - (game.currentRound.avgReactionTime ?? 0);
  /** 남은 라운드 수 */
  const roundLeft = game.rounds.length - (game.currentRoundIndex + 1);
  /** 이전 라운드와 현재 라운드의 평균 반응 시간이 같은지 여부 */
  const isSameTime = Number(prevRoundTimeDiff.toFixed(1)) === 0;
  /** 현재 라운드가 이전 라운드보다 느린지 여부 */
  const isSlower = !isSameTime && prevRoundTimeDiff < 0 && game.prevRound;

  const onPressNextRound = () => {
    if (game.nextRound()) {
      navigate('GameMain');
    } else {
      initNavigate('GameDone');
    }
  };

  /**
   * 전에 라운드가 있다면, 이전 기록과 비교하여 같은 시간인지, 느린지, 빠른지를 반환합니다.
   * 없다면 현재 라운드의 시간을 반환합니다.
   */
  const getMessage = () => {
    if (game.prevRound) {
      if (isSameTime) {
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
        <Image
          source={isSlower ? CheerUpGIF : ClappingHandsGIF}
          style={{ width: 160, height: 160 }}
        />
        <Text size={30} font="bold">
          {isSlower ? '조금 더 힘내세요!' : '잘 하셨습니다!'}
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
