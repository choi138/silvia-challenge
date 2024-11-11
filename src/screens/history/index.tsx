import React, { useEffect, useState } from 'react';
import { FlatList, Image, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text, HistoryCard, Header } from 'src/components';
import { GameHistoryStorageProps } from 'src/types';
import { STORAGE_GAME_HISTORY_KEY } from 'src/constant/keys';
import { SadGIF } from 'src/assets';
import { Format } from 'src/utils';
import { useModal } from 'src/providers';
import { GAME_STAGE_COUNT } from 'src/stores';

import * as S from './styled';

/**
 * 게임 기록 화면
 */
export const HistoryScreen: React.FC = () => {
  const { open, close } = useModal();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(true);
  const [histories, setHistories] = useState<GameHistoryStorageProps[]>([]);

  /** 스토리지에 저장되어 있는 기록을 가져옵니다 */
  const getGameHistory = async () => {
    const storageData = await AsyncStorage.getItem(STORAGE_GAME_HISTORY_KEY);

    setHistories(storageData ? JSON.parse(storageData) : []);
  };

  useEffect(() => {
    getGameHistory();
    /** getGameHistory의 데이터 값이 불러오기 전에 렌더링 되는것을 방지하기 위하여 0.1초의 딜레이를 줍니다 */
    setTimeout(() => setIsLoading(false), 100);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: insets.bottom }}>
      <FlatList
        // 생성일 기준으로 내림차순 정렬
        data={histories.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )}
        ListHeaderComponent={
          <Header title="🧠 근원님의 검사 기록" subtitle="매일매일 인지 검사를 기록하고 있어요!" />
        }
        style={{ width: '100%' }}
        contentContainerStyle={{
          rowGap: 20,
          padding: 20,
        }}
        renderItem={({ item }) => (
          <HistoryCard
            {...item}
            date={new Date(item.createdAt)}
            onPress={() =>
              open({
                title: '기록 상세',
                children: (
                  <S.HistoryModal>
                    <Text align="left">일시: {Format.date(new Date(item.createdAt))}</Text>
                    <View>
                      <Text align="left">라운드 수: {item.rounds.length}</Text>
                      <Text align="left">정확도: {item.accuracy}%</Text>
                    </View>
                    <View>
                      {item.rounds.map((item, index) => {
                        const stageTotalTime = item.stages.reduce(
                          (acc, stage) => acc + (stage.reactionTime || 0),
                          0,
                        );
                        return (
                          <Text key={index} align="left">
                            {index + 1}라운드 - {(stageTotalTime / GAME_STAGE_COUNT).toFixed(1)}초
                          </Text>
                        );
                      })}
                    </View>
                    <View>
                      <Text align="left">소요시간: {item.accuracy}초</Text>
                      <Text align="left">
                        평가: {item.score}점 ({item.score >= 50 ? '안전' : '위험'})
                      </Text>
                    </View>
                  </S.HistoryModal>
                ),
                onPressButton: close,
              })
            }
          />
        )}
        keyExtractor={(item) => item.createdAt}
      />
      {!isLoading && histories.length === 0 && (
        <S.HistoryNotFoundContainer>
          <Image source={SadGIF} style={{ width: 140, height: 140 }} />
          <Text size={24} font="bold">
            아직 기록된 내용이 없어요
          </Text>
        </S.HistoryNotFoundContainer>
      )}
    </SafeAreaView>
  );
};
