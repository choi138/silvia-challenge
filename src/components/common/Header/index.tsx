import React from 'react';

import { Text } from '../Text';

import * as S from './styled';

export interface HeaderProps {
  title: string;
  subtitle: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <S.Header>
      <Text size={30} font="bold">
        {title}
      </Text>
      <Text size={18} font="regular">
        {subtitle}
      </Text>
    </S.Header>
  );
};
