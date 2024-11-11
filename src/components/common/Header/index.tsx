import React from 'react';

import { Text } from '../Text';

import * as S from './styled';

export interface HeaderProps {
  title: string;
  subtitle: string;
}

/**
 * 헤더 컴포넌트
 * @param title 헤더 제목
 * @param subtitle 헤더 부제목
 */
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
