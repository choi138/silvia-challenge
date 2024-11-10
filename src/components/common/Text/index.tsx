import { TextProps } from 'react-native';

import { colors } from 'src/styles';
import { fonts } from 'src/styles/fonts.styles';

import * as S from './styled';

export type FontVariants = keyof (typeof colors)['text'];
export type FontAlign = 'center' | 'left' | 'right';
export type FontFamily = keyof typeof fonts;

export interface TextCustomProps {
  size?: number;
  fonts?: keyof typeof fonts;
  variants?: FontVariants;
  align?: FontAlign;
}

export type TextComponentProps = TextCustomProps & TextProps;

/**
 * 텍스트 컴포넌트
 * @param children 텍스트 내용
 * @param size 텍스트 크기
 * @param fonts 텍스트 폰트
 * @param variants 텍스트 색상
 * @param align 텍스트 정렬
 * @param onPress 텍스트 클릭시 발생할 이벤트
 */
export const Text: React.FC<TextComponentProps> = ({
  children,
  size = 14,
  fonts = 'medium',
  variants = 'default',
  align = 'center',
  onPress,
  ...props
}) => {
  return (
    <S.TextElement
      size={size}
      fonts={fonts}
      variants={variants}
      align={align}
      onPress={onPress}
      {...props}
    >
      {children}
    </S.TextElement>
  );
};
