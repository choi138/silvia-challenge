import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { Text } from '../Text';

import * as S from './styled';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonWidth = '50%' | '100%';

export interface ButtonCustomProps {
  size?: ButtonSize;
  width?: ButtonWidth;
}

export type ButtonProps = ButtonCustomProps & TouchableOpacityProps;
export type ButtonStyleProps = ButtonCustomProps & TouchableOpacityProps;

/**
 * 버튼 컴포넌트
 * @param size 버튼 크기
 * @param variant 버튼 색상
 * @param width 버튼 너비
 */
const Button = React.forwardRef<TouchableOpacity, ButtonProps>(
  ({ size = 'medium', width = '100%', ...props }, ref) => {
    return (
      <S.ButtonElement ref={ref} size={size} width={width} {...props} activeOpacity={0.8}>
        <Text color="white" size={16}>
          {props.children}
        </Text>
      </S.ButtonElement>
    );
  },
);

Button.displayName = 'Button';

export { Button };
