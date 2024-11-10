import React, { useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text, HistoryCard, Header } from 'src/components';
import { GameHistoryStorageProps } from 'src/types';
import { STORAGE_GAME_HISTORY_KEY } from 'src/constant/keys';
import { SadGIF } from 'src/assets';

import * as S from './styled';

export const HistoryScreen: React.FC = () => {
  const [histories, setHistories] = useState<GameHistoryStorageProps[]>([]);

  /** 스토리지에 저장되어 있는 기록을 가져옵니다 */
  const getGameHistory = async () => {
    const storageData = await AsyncStorage.getItem(STORAGE_GAME_HISTORY_KEY);

    setHistories(storageData ? JSON.parse(storageData) : []);
  };

  useEffect(() => {
    getGameHistory();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <FlatList
        data={histories.reverse()}
        style={{ width: '100%' }}
        ListHeaderComponent={
          <Header title="🧠 근원님의 검사 기록" subtitle="매일매일 인지 검사를 기록하고 있어요!" />
        }
        contentContainerStyle={{
          rowGap: 20,
          padding: 20,
        }}
        renderItem={({ item }) => <HistoryCard {...item} date={new Date(item.createdAt)} />}
        keyExtractor={(item) => item.createdAt}
      />
      {histories.length === 0 && (
        <S.HistoryNotFoundContainer>
          <Image source={SadGIF} style={{ width: 160, height: 160 }} />
          <Text size={30} fonts="bold">
            아직 기록된 내용이 없어요
          </Text>
        </S.HistoryNotFoundContainer>
      )}
    </SafeAreaView>
  );
};
