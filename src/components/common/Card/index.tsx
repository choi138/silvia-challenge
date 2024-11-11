import React from 'react';
import { PressableProps } from 'react-native';

import * as S from './styled';

interface CardColumnProps {
  children: React.ReactNode;
}

/** 카드 열 컴포넌트 */
const CardColumn: React.FC<CardColumnProps> = ({ children }) => {
  return <S.CardColumn>{children}</S.CardColumn>;
};

interface CardRowProps {
  children: React.ReactNode;
}

/** 카드 행 컴포넌트 */
const CardRow: React.FC<CardRowProps> = ({ children }) => {
  return <S.CardRow>{children}</S.CardRow>;
};

interface CardCustomProps {
  children: React.ReactNode;
  width?: number;
}

type CardProps = CardCustomProps & PressableProps;

/**
 * 카드 컴포넌트
 * @param children 카드 내용
 */
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
