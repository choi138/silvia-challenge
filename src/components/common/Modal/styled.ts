import { Animated } from 'react-native';

import styled from '@emotion/native';

import { colors } from 'src/styles';

export const ModalOverlay = styled(Animated.View)`
  flex: 1;
  position: absolute;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;

export const ModalWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.View`
  width: 80%;
  background-color: ${colors.white};
  border-radius: 16px;
  padding: 18px;
  row-gap: 10px;
  align-items: flex-start;
  justify-content: center;
`;

export const asdf = styled.View`
  width: 100%;
  height: 10px;
  border: 1px solid red;
`;
