import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { ProgressBar, Tag, Text } from 'src/components';
import { GameRound } from 'src/stores';

import { STORAGE_INSPECTION_DATA_KEY } from '../inspection';

import * as S from './styled';

export interface HistoryStateProps {
  score: number;
  accuracy: number;
  avgReactionTime: number;
  rounds: GameRound[];
  totalTime: number;
  createdAt: string;
}

export const HistoryScreen: React.FC = () => {
  const [history, setHistory] = useState<HistoryStateProps[]>([]);

  /** 스토리지에 저장되어 있는 기록을 가져옵니다 */
  const getInspectionHistory = async () => {
    const history = await AsyncStorage.getItem(STORAGE_INSPECTION_DATA_KEY);

    setHistory(history ? JSON.parse(history) : []);
  };

  useEffect(() => {
    getInspectionHistory();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      {history ? (
        <FlatList
          data={history}
          style={{ width: '100%' }}
          ListHeaderComponent={
            <S.Header>
              <Text size={30} fonts="bold">
                🧠 근원님의 검사 기록
              </Text>
              <Text size={18} fonts="regular">
                매일매일 인지 검사를 기록하고 있어요!
              </Text>
            </S.Header>
          }
          contentContainerStyle={{
            rowGap: 20,
            padding: 20,
          }}
          renderItem={({ item }) => {
            const date = new Date(item.createdAt);
            return (
              <S.Card>
                <S.CardInnerContainer>
                  <Text size={15}>
                    {date.getMonth() + 1}월 {date.getDate()}일{' '}
                    {date.getHours() > 12 ? '오후' : '오전'} {Math.floor(date.getHours() / 12)}시{' '}
                    {date.getMinutes()}분
                  </Text>
                  <S.ProgressBarContainer>
                    <ProgressBar progress={item.accuracy} text="정확도" variant="accuracy" />
                    <ProgressBar
                      progress={item.avgReactionTime}
                      text="반응속도"
                      variant="avgReactionTime"
                    />
                  </S.ProgressBarContainer>
                </S.CardInnerContainer>
                <S.ScoreContainer>
                  <Text size={26}>{item.score}점</Text>
                  <Tag variant={item.score < 0.5 ? 'danger' : 'safe'} size="small">
                    {item.score < 0.5 ? '위험' : '안전'}
                  </Tag>
                </S.ScoreContainer>
              </S.Card>
            );
          }}
          keyExtractor={(item) => item.createdAt}
        />
      ) : (
        <Text>No history available</Text>
      )}
    </SafeAreaView>
  );
};
