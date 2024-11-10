import React from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LineChart, ruleTypes } from 'react-native-gifted-charts';

import { GAME_LIST } from 'src/constant/gameList';
import { Card, Header, Text } from 'src/components';
import { useNavigate } from 'src/hooks';
import { RootStackParams } from 'src/types';
import { chunk } from 'src/utils';
import { useGameStore } from 'src/stores';

import * as S from './styled';

export const HomeScreen: React.FC = () => {
  const { navigate } = useNavigate();
  const { game } = useGameStore();

  const gameRows = chunk(GAME_LIST, 2);

  /** 클릭시 해당 페이지로 이동하는 함수 */
  const onPressNavigate = (url?: keyof RootStackParams) => {
    if (!url) return;
    navigate(url);
  };
  const lineData = [
    { value: 0 },
    { value: 2 },
    { value: 2.4 },
    { value: 3.2 },
    { value: 2 },
    { value: 3.2 },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <S.HomeContainer>
        <Header title="👋 안녕하세요 근원님!" subtitle="어떤 종류의 인지 검사를 하고싶은가요?" />
        <Card.Column>
          {gameRows.map((row, rowIndex) => (
            <Card.Row key={rowIndex}>
              {row.map((game) => (
                <Card width={48} key={game.title}>
                  <TouchableOpacity
                    onPress={() => onPressNavigate(game.linkTo)}
                    activeOpacity={0.6}
                  >
                    <S.CardContentContainer>
                      <Image source={game.gif} style={{ width: 60, height: 60 }} />
                      <Text size={17}>{game.title}</Text>
                      <Text size={15} color="link">
                        {game.description}
                      </Text>
                    </S.CardContentContainer>
                  </TouchableOpacity>
                </Card>
              ))}
            </Card.Row>
          ))}
        </Card.Column>
      </S.HomeContainer> */}
      <View style={{ width: '100%' }}>
        <LineChart
          data={lineData}
          disableScroll
          thickness={4}
          dataPointsColor="#6066F3"
          dataPointsWidth={10}
          height={140}
          isAnimated
          adjustToWidth
          curved
          curveType={0}
          showVerticalLines
          color="#6066F3"
          backgroundColor={'#FFFFFF'}
          maxValue={4}
          xAxisLength={1}
          verticalLinesColor="#DEDEDE"
          rulesType="solid"
          yAxisColor="#DEDEDE"
          xAxisColor="#DEDEDE"
          xAxisLabelTexts={Array.from({ length: 6 }, (_, i) => `${i + 1}라운드`)}
          trimYAxisAtTop
          noOfSections={2}
          initialSpacing={0}
          endSpacing={0}
        />
      </View>
    </SafeAreaView>
  );
};
