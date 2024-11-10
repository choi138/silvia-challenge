import React from 'react';
import { Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button, PageLayout, Text } from 'src/components';
import { BrainGIF } from 'src/assets';
import { useGameStore } from 'src/stores';
import { useNavigate } from 'src/hooks';
import { Tag } from 'src/components/common/Tag';

import * as S from './styled';

/** 검사 결과를 저장하는 스토리의 키 */
export const STORAGE_INSPECTION_DATA_KEY = 'inspection-data';

export const InspectionDoneScreen: React.FC = () => {
  const { game } = useGameStore();
  const { navigate } = useNavigate();

  if (!game) {
    navigate('InspectionStart');
    return null;
  }

  /** 위험 여부 */
  const isDanger = game.score < 50;
  /** 포맷팅한 평균 정확도 */
  const accuracy = (game.accuracy * 100).toFixed(0);
  /** 포맷팅한 평균 반응 시간 */
  const avgReactionTime = game.avgReactionTime.toFixed(1);

  /** 검사 결과를 스토리지에 저장합니다 */
  const onPressSaveData = async () => {
    const data = await AsyncStorage.getItem(STORAGE_INSPECTION_DATA_KEY);
    const parsedData = data ? JSON.parse(data) : [];

    await AsyncStorage.setItem(
      STORAGE_INSPECTION_DATA_KEY,
      JSON.stringify([
        ...parsedData,
        {
          score: (game.score * 100).toFixed(0),
          accuracy: accuracy,
          avgReactionTime: avgReactionTime,
          rounds: game.rounds,
          totalTime: game.totalTime,
          createdAt: new Date().toISOString(),
        },
      ]),
    );

    navigate('History');
  };

  return (
    <PageLayout>
      <S.InspectionDoneContainer>
        <Image source={BrainGIF} style={{ width: 160, height: 160 }} />
        <Text size={30} fonts="bold">
          검사가 끝났어요!
        </Text>
        <Text size={20} fonts="regular">
          정확도 {accuracy}% / 평균 {avgReactionTime}초
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
      <Button onPress={onPressSaveData}>저장하기</Button>
    </PageLayout>
  );
};
