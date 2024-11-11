import styled from '@emotion/native';

import { colors } from 'src/styles';

export const Card = styled.Pressable<{ width: number }>`
  width: ${({ width }) => width.toString()}%;
  border-radius: 16px;
  padding: 16px;
  border-color: ${colors.border};
  border-width: 1px;
  background-color: ${colors.background};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const CardColumn = styled.View`
  align-items: center;
  justify-content: center;
  row-gap: 10px;
`;

export const CardRow = styled.View`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  column-gap: 14px;
`;
