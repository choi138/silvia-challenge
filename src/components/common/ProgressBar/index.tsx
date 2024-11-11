import React from 'react';
import { ViewProps } from 'react-native';

import { isAndroid } from 'src/utils';

import { Text } from '../Text';

import * as S from './styled';

export type ProgressBarVariant = 'accuracy' | 'avgReactionTime';

export interface ProgressBarCustomProps {
  progress: number;
  text: string;
  variant: ProgressBarVariant;
}

export type ProgressBarProps = ProgressBarCustomProps & ViewProps;

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, text, variant }) => {
  /**
   * 프로그레스바의 flex 값을 계산합니다
   * 최대: 1, 최저: 0,
   */
  const getFlexValue = () => (variant === 'accuracy' ? progress / 100 : (8 - progress) / 7.9);

  return (
    <S.ProgressBarContainer>
      <S.ProgressBarRow>
        <Text font="regular" size={15} style={{ flex: isAndroid ? 0.6 : 0.5 }} align="left">
          {text}
        </Text>
        <S.ProgressBarWrapper>
          <S.ProgressBar
            style={{
              flex: getFlexValue(),
            }}
            variant={variant}
          />
        </S.ProgressBarWrapper>
      </S.ProgressBarRow>
      <S.ProgressBarTextWrapper>
        <Text font="regular">
          {progress}
          {variant === 'accuracy' ? '%' : '초'}
        </Text>
      </S.ProgressBarTextWrapper>
    </S.ProgressBarContainer>
  );
};
