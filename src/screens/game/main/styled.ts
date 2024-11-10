import styled from '@emotion/native';

import { colors } from 'src/styles';

export const GameMainContainer = styled.View`
  flex: 1;
  row-gap: 40px;
  align-items: center;
`;

export const GameMainImageWrapper = styled.View`
  width: 140px;
  height: 140px;
  padding: 20px;
  border-color: ${colors.border};
  border-width: 1px;
  border-radius: 16px;
`;
