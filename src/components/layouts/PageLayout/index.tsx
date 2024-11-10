import React from 'react';

import { Button, GoBackIcon } from 'src/components/common';

import * as S from './styled';

export interface PageLayoutProps {
  children: React.ReactNode;
  button?: { text: string; onPress: () => void };
  hasGoBackIcon?: boolean;
}

/**
 * 페이지의 레이아웃을 구성합니다
 * @param children 페이지의 내용
 * @param button 버튼
 * @param hasGoBackIcon 뒤로가기 아이콘 표시 여부
 */
export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  hasGoBackIcon = true,
  button,
}) => {
  return (
    <S.PageLayoutContainer>
      {hasGoBackIcon && <GoBackIcon />}
      {children}
      {button && <Button onPress={button.onPress}>{button.text}</Button>}
    </S.PageLayoutContainer>
  );
};
