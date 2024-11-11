import React from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GAME_LIST } from 'src/constant/gameList';
import { Card, Header, Text } from 'src/components';
import { useNavigate } from 'src/hooks';
import { RootStackParams } from 'src/types';
import { chunk } from 'src/utils';

import * as S from './styled';

export const HomeScreen: React.FC = () => {
  const { navigate } = useNavigate();

  const gameRows = chunk(GAME_LIST, 2);

  /** 클릭시 해당 페이지로 이동하는 함수 */
  const onPressNavigate = (url?: keyof RootStackParams) => {
    if (!url) return;
    navigate(url);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <S.HomeContainer>
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
      </S.HomeContainer>
    </SafeAreaView>
  );
};
