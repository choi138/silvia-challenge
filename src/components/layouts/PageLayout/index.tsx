import React from 'react';

import { Button, GoBackIcon } from 'src/components/common';

import * as S from './styled';

export interface PageLayoutProps {
  children: React.ReactNode;
  button?: { text: string; onPress: () => void };
  hasGoBackIcon?: boolean;
}

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
