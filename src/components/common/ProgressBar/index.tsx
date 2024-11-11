import React from 'react';
import { ViewProps } from 'react-native';

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
  const getFlexValue = () => (variant === 'accuracy' ? progress / 100 : progress / 8);

  return (
    <S.ProgressBarContainer>
      <S.ProgressBarRow>
        <Text font="regular" size={15} style={{ flex: 0.5 }} align="left">
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
