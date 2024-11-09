import React from 'react';
import { Image } from 'react-native';

import { GameIcon } from 'src/assets/icons';
import { PageLayout } from 'src/components/layouts';
import { Text } from 'src/components/common';
import { useNavigate } from 'src/hooks';

import * as S from './styled';

/**
 * 검사 화면
 */
export const InspectionScreen: React.FC = () => {
  const { navigate } = useNavigate();

  const onPressGoToMainScreen = () => {
    navigate('Main');
  };

  return (
    <PageLayout button={{ text: '검사 시작', onPress: onPressGoToMainScreen }}>
      <S.InspectionContentContainer>
        <Image source={GameIcon} style={{ width: 140, height: 140 }} />
        <Text size={30} fonts="bold">
          같은 그림 찾기 게임{'\n'}
          시작하기
        </Text>
      </S.InspectionContentContainer>
    </PageLayout>
  );
};
