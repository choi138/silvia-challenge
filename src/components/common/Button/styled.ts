import { TouchableOpacity } from 'react-native';

import styled, { css, ReactNativeStyle } from '@emotion/native';

import { colors } from 'src/styles';

import { ButtonCustomProps, ButtonSize, ButtonVariant } from '.';

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

const variants: Record<ButtonVariant, ReactNativeStyle> = {
  primary: css`
    background-color: ${colors.primary.default};
  `,
};

export const ButtonElement = styled(TouchableOpacity)<Required<ButtonCustomProps>>`
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 12px;

  ${(props) => sizes[props.size]}
  ${(props) => variants[props.variant]}
`;
