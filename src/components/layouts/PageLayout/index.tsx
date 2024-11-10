import React from 'react';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

import { Button, GoBackIcon } from 'src/components/common';
import { TimerHeader } from 'src/components/common/TimerHeader';

import * as S from './styled';

export interface PageLayoutCustomProps {
  children: React.ReactNode;
  button?: { text: string; onPress: () => void };
  hasGoBackIcon?: boolean;
  time?: string;
}

export type PageLayoutProps = PageLayoutCustomProps & SafeAreaViewProps;

/**
 * 페이지의 레이아웃을 구성합니다
 * @param children 페이지의 내용
 * @param button 버튼
 * @param hasGoBackIcon 뒤로가기 아이콘 표시 여부
 */
export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  hasGoBackIcon = true,
  time,
  button,
  ...props
}) => {
  return (
    <S.PageLayoutContainer {...props}>
      {hasGoBackIcon && <GoBackIcon />}
      {time !== undefined && <TimerHeader time={time} />}
      {children}
      {button && <Button onPress={button.onPress}>{button.text}</Button>}
    </S.PageLayoutContainer>
  );
};
