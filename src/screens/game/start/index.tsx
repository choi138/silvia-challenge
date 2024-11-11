import React from 'react';
import { Image } from 'react-native';

import { StartGamePNG } from 'src/assets/images';
import { useNavigate } from 'src/hooks';
import { PageLayout, Text } from 'src/components';
import { useGameStore } from 'src/stores';

import * as S from './styled';

/**
 * 게임 시작 화면
 */
export const GameStartScreen: React.FC = () => {
  const { navigate } = useNavigate();
  const { newGame } = useGameStore();

  /**
   * 게임 메인 화면으로 이동합니다
   */
  const onPressGoToGameMainScreen = () => {
    newGame();
    navigate('GameMain');
  };

  return (
    <PageLayout button={{ text: '게임 시작', onPress: onPressGoToGameMainScreen }}>
      <S.GameStartContentContainer>
        <Image source={StartGamePNG} style={{ width: 140, height: 140 }} />
        <Text size={30} font="bold">
          같은 그림 찾기 게임{'\n'}
          시작하기
        </Text>
      </S.GameStartContentContainer>
    </PageLayout>
  );
};
