import { TouchableOpacity } from 'react-native';

import styled, { css, ReactNativeStyle } from '@emotion/native';

import { colors } from 'src/styles';

import { ButtonCustomProps, ButtonSize } from '.';

const sizes: Record<ButtonSize, ReactNativeStyle> = {
  large: css`
    padding: 18px 22px;
  `,
  medium: css`
    padding: 16px 20px;
  `,
  small: css`
    padding: 14px 18px;
  `,
};

export const ButtonElement = styled(TouchableOpacity)<Required<ButtonCustomProps>>`
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 12px;
  background-color: ${colors.button};

  ${(props) => sizes[props.size]}
`;
