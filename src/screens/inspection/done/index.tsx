import React from 'react';
import { Image } from 'react-native';

import { Button, PageLayout, Text } from 'src/components';
import { BrainGIF } from 'src/assets';
import { useGameStore } from 'src/stores';
import { useNavigate } from 'src/hooks';
import { Tag } from 'src/components/common/Tag';

import * as S from './styled';

export const InspectionDoneScreen: React.FC = () => {
  const { game } = useGameStore();
  const { navigate } = useNavigate();

  if (!game) {
    navigate('InspectionStart');
    return null;
  }

  const isDanger = game.score < 50;

  return (
    <PageLayout>
      <S.InspectionDoneContainer>
        <Image source={BrainGIF} style={{ width: 160, height: 160 }} />
        <Text size={30} fonts="bold">
          검사가 끝났어요!
        </Text>
        <Text size={20} fonts="regular">
          정확도 {(game.accuracy * 100).toFixed(0)}% / 평균 {game.avgReactionTime.toFixed(1)}초
        </Text>
        <S.InspectionDoneResultTextContainer>
          <Text size={20} fonts="regular">
            결과는
          </Text>
          <Tag variant={isDanger ? 'danger' : 'safe'}>{isDanger ? '위험' : '안전'}</Tag>
          <Text size={20} fonts="regular">
            입니다.
          </Text>
        </S.InspectionDoneResultTextContainer>
      </S.InspectionDoneContainer>
      <Button>저장하기</Button>
    </PageLayout>
  );
};
