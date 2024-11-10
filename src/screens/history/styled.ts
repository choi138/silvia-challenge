import styled from '@emotion/native';

import { colors } from 'src/styles';

export const Header = styled.View`
  align-items: flex-start;
  row-gap: 10px;
  margin-bottom: 20px;
`;

export const CardWrapper = styled.View`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Card = styled.View`
  width: 100%;
  border-radius: 16px;
  padding: 16px;
  padding-right: 0;
  border-color: ${colors.border};
  border-width: 1px;
  background-color: ${colors.background};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  column-gap: 14px;
`;

export const CardInnerContainer = styled.View`
  flex: 0.7;
  align-items: flex-start;
  row-gap: 10px;
`;

export const ProgressBarContainer = styled.View`
  width: 100%;
  row-gap: 4px;
`;

export const ScoreContainer = styled.View`
  flex: 0.3;
  width: 100%;
  row-gap: 10px;
  align-items: center;
`;
