import styled from '@emotion/native';

import { colors } from 'src/styles';

export const CircleContainer = styled.View`
  flex: 1;
  row-gap: 20px;
  align-items: center;
`;

export const CircleRow = styled.View`
  width: 80%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CirclePositionWrapper = styled.TouchableOpacity<{
  top: number;
  left: number;
}>`
  ${({ top }) => top && `top: ${top}px;`}
  ${({ left }) => left && `left: ${left}px;`}
`;

export const CircleWrapper = styled.View<{ hasImage?: boolean }>`
  width: 70px;
  height: 70px;
  padding: 4px;
  border-color: ${colors.circle.border};
  border-width: ${({ hasImage }) => (hasImage ? '0px' : '2px')};
  border-radius: 100px;
`;

export const Circle = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 100px;
  background-color: ${colors.circle.default};
`;
