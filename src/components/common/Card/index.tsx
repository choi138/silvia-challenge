import React from 'react';

import * as S from './styled';

interface CardColumnProps {
  children: React.ReactNode;
}

const CardColumn: React.FC<CardColumnProps> = ({ children }) => {
  return <S.CardColumn>{children}</S.CardColumn>;
};

interface CardRowProps {
  children: React.ReactNode;
}

const CardRow: React.FC<CardRowProps> = ({ children }) => {
  return <S.CardRow>{children}</S.CardRow>;
};

interface CardProps {
  children: React.ReactNode;
  width?: number;
}

const CardElement: React.FC<CardProps> = ({ children, width = 100 }) => {
  return <S.Card width={width}>{children}</S.Card>;
};

export const Card = Object.assign(CardElement, {
  Column: CardColumn,
  Row: CardRow,
});
