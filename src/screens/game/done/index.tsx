import React from 'react';
import { Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button, Chart, PageLayout, Text } from 'src/components';
import { BrainGIF } from 'src/assets';
import { useGameStore } from 'src/stores';
import { useNavigate } from 'src/hooks';
import { Tag } from 'src/components/common/Tag';
import { STORAGE_GAME_HISTORY_KEY } from 'src/constant/keys';

import * as S from './styled';

export const GameDoneScreen: React.FC = () => {
  const { game } = useGameStore();
  const { navigate, initNavigate } = useNavigate();

  if (!game) {
    initNavigate('GameStart');
    return null;
  }

  /** 위험 여부 */
  const isDanger = game.score < 0.5;
  /** 포맷팅한 평균 정확도 */
  const accuracy = (game.accuracy * 100).toFixed(0);
  /** 포맷팅한 평균 반응 시간 */
  const avgReactionTime = game.avgReactionTime.toFixed(1);

  /** 검사 결과를 스토리지에 저장합니다 */
  const onPressSaveData = async () => {
    const data = await AsyncStorage.getItem(STORAGE_GAME_HISTORY_KEY);
    const parsedData = data ? JSON.parse(data) : [];

    await AsyncStorage.setItem(
      STORAGE_GAME_HISTORY_KEY,
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
    navigate('Main');
  };

  /** number[] 배열을 { value: number; }[] 배열로 변환 */
  const formattedReactionTimeList = game.reactionTimeList.map((time) => ({
    value: Number(time.toFixed(1)),
  }));

  return (
    <PageLayout hasGoBackIcon={false}>
      <S.GameDoneContainer>
        <S.GameResultHeaderContainer>
          <Image source={BrainGIF} style={{ width: 160, height: 160 }} />
          <Text size={30} fonts="bold">
            검사가 끝났어요!
          </Text>
          <Text size={20} fonts="regular">
            정확도 {accuracy}% / 평균 {avgReactionTime}초
          </Text>
        </S.GameResultHeaderContainer>
        <Chart
          data={formattedReactionTimeList}
          xLabelTexts={Array.from({ length: game.reactionTimeList.length }, (_, i) => `${i + 1}회`)}
          yLabelSuffix="초"
        />
        <S.GameResultTextContainer>
          <Text size={20} fonts="regular">
            결과는
          </Text>
          <Tag variant={isDanger ? 'danger' : 'safe'}>{isDanger ? '위험' : '안전'}</Tag>
          <Text size={20} fonts="regular">
            입니다.
          </Text>
        </S.GameResultTextContainer>
      </S.GameDoneContainer>
      <Button onPress={onPressSaveData}>저장하기</Button>
    </PageLayout>
  );
};
