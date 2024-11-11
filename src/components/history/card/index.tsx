import React from 'react';
import { PressableProps } from 'react-native';

import { GameHistoryStorageProps } from 'src/types';
import { Card, ProgressBar, Tag, Text } from 'src/components/common';
import { Format } from 'src/utils';

import * as S from './styled';

export type HistoryCardProps = GameHistoryStorageProps &
  PressableProps & {
    date: Date;
  };

/**
 * 기록 탭에서 사용하는 카드 컴포넌트
 * @param date 날짜
 * @param accuracy 정확도
 * @param avgReactionTime 평균 반응속도
 * @param score 점수
 */
export const HistoryCard: React.FC<HistoryCardProps> = ({
  date,
  accuracy,
  avgReactionTime,
  score,
  ...props
}) => {
  return (
    <Card {...props}>
      <S.CardContainer>
        <S.CardInnerContainer>
          <Text size={15}>{Format.date(date)}</Text>
          <S.ProgressBarContainer>
            <ProgressBar progress={accuracy} text="정확도" variant="accuracy" />
            <ProgressBar progress={avgReactionTime} text="반응속도" variant="avgReactionTime" />
          </S.ProgressBarContainer>
        </S.CardInnerContainer>
        <S.ScoreContainer>
          <Text size={26}>{score}점</Text>
          <Tag variant={score < 50 ? 'danger' : 'safe'} size="small">
            {score < 50 ? '위험' : '안전'}
          </Tag>
        </S.ScoreContainer>
      </S.CardContainer>
    </Card>
  );
};
