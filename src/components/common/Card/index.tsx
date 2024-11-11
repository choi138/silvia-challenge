import React from 'react';
import { PressableProps } from 'react-native';

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

interface CardCustomProps {
  children: React.ReactNode;
  width?: number;
}

type CardProps = CardCustomProps & PressableProps;

const CardComponent: React.FC<CardProps> = ({ children, width = 100, ...props }) => {
  return (
    <S.Card width={width} {...props}>
      {children}
    </S.Card>
  );
};

export const Card = Object.assign(CardComponent, {
  Column: CardColumn,
  Row: CardRow,
});
