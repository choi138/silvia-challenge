import React from 'react';
import { Image } from 'react-native';

import { StartGamePng } from 'src/assets/images';
import { useNavigate } from 'src/hooks';
import { PageLayout, Text } from 'src/components';
import { useGameStore } from 'src/stores';

import * as S from './styled';

/**
 * 검사 화면
 */
export const InspectionStartScreen: React.FC = () => {
  const { navigate } = useNavigate();
  const { newGame } = useGameStore();

  /**
   * 메인 화면으로 이동합니다
   */
  const onPressGoToInspectionMainScreen = () => {
    newGame();
    navigate('InspectionMain');
  };

  return (
    <PageLayout button={{ text: '검사 시작', onPress: onPressGoToInspectionMainScreen }}>
      <S.InspectionStartContentContainer>
        <Image source={StartGamePng} style={{ width: 140, height: 140 }} />
        <Text size={30} fonts="bold">
          같은 그림 찾기 게임{'\n'}
          시작하기
        </Text>
      </S.InspectionStartContentContainer>
    </PageLayout>
  );
};
