import React from 'react';
import { Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button, Chart, PageLayout, Text } from 'src/components';
import { BrainGIF } from 'src/assets';
import { useGameStore } from 'src/stores';
import { useNavigate } from 'src/hooks';
import { Tag } from 'src/components/common/Tag';
import { STORAGE_GAME_HISTORY_KEY } from 'src/constant/keys';
import { Format } from 'src/utils';

import * as S from './styled';

/**
 * 게임이 끝난 후 결과를 보여주는 화면
 */
export const GameDoneScreen: React.FC = () => {
  const { game } = useGameStore();
  const { initNavigate } = useNavigate();

  /** 게임이 없다면 게임 시작 화면으로 이동합니다 */
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
    /** 기존 데이터를 불러옵니다 */
    const data = await AsyncStorage.getItem(STORAGE_GAME_HISTORY_KEY);
    const parsedData = data ? JSON.parse(data) : [];

    /** 불러온 데이터에 새로운 데이터를 추가합니다 */
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
          createdAt: new Date(),
        },
      ]),
    );

    /** 저장이 완료되면 메인 화면으로 이동합니다 */
    initNavigate('Main');
  };

  return (
    <PageLayout hasGoBackIcon={false}>
      <S.GameDoneContainer>
        <S.GameResultHeaderContainer>
          <Image source={BrainGIF} style={{ width: 160, height: 160 }} />
          <Text size={30} font="bold">
            검사가 끝났어요!
          </Text>
          <Text size={20} font="regular">
            정확도 {accuracy}% / 평균 {avgReactionTime}초
          </Text>
        </S.GameResultHeaderContainer>
        <Chart
          data={Format.list(game.reactionTimeList)}
          xLabelTexts={Array.from({ length: game.reactionTimeList.length }, (_, i) => `${i + 1}회`)}
          yLabelSuffix="초"
        />
        <S.GameResultTextContainer>
          <Text size={20} font="regular">
            결과는
          </Text>
          <Tag variant={isDanger ? 'danger' : 'safe'}>{isDanger ? '위험' : '안전'}</Tag>
          <Text size={20} font="regular">
            입니다.
          </Text>
        </S.GameResultTextContainer>
      </S.GameDoneContainer>
      <Button onPress={onPressSaveData}>저장하기</Button>
    </PageLayout>
  );
};
