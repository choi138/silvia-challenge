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
      <Text size={30} fonts="bold">
        {title}
      </Text>
      <Text size={18} fonts="regular">
        {subtitle}
      </Text>
    </S.Header>
  );
};
