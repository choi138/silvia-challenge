import React from 'react';

import { GameHistoryStorageProps } from 'src/types';
import { Card, ProgressBar, Tag, Text } from 'src/components/common';

import * as S from './styled';

export type HistoryCardProps = GameHistoryStorageProps & {
  date: Date;
};

export const HistoryCard: React.FC<HistoryCardProps> = ({
  date,
  accuracy,
  avgReactionTime,
  score,
}) => {
  return (
    <Card>
      <S.CardContainer>
        <S.CardInnerContainer>
          <Text size={15}>
            {date.getMonth() + 1}월 {date.getDate()}일 {date.getHours() > 12 ? '오후' : '오전'}{' '}
            {Math.ceil(date.getHours() / 12)}시 {date.getMinutes()}분
          </Text>
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
