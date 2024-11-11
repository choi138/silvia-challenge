import { View } from 'react-native';

import styled, { css, ReactNativeStyle } from '@emotion/native';

import { colors } from 'src/styles';

import { ProgressBarVariant } from '.';

export const ProgressBarContainer = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ProgressBarRow = styled.View`
  flex: 0.8;
  flex-direction: row;
  align-items: center;
  column-gap: 12px;
`;

const variants: Record<ProgressBarVariant, ReactNativeStyle> = {
  accuracy: css`
    background-color: ${colors.progressBar.accuracy};
  `,
  avgReactionTime: css`
    background-color: ${colors.progressBar.avgReactionTime};
  `,
};

export const ProgressBarWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
`;

export const ProgressBar = styled(View)<{ variant: ProgressBarVariant }>`
  height: 8px;
  border-radius: 100px;
  ${(props) => variants[props.variant]}
`;

export const ProgressBarTextWrapper = styled.View`
  flex: 0.2;
  align-items: flex-end;
`;
