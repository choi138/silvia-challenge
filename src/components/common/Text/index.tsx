import { TextProps } from 'react-native';

import { colors } from 'src/styles';

import * as S from './styled';

export type FontColor = keyof (typeof colors)['text'];
export type FontAlign = 'center' | 'left' | 'right';
export type FontFamily = 'bold' | 'medium' | 'regular' | 'thin';

export interface TextCustomProps {
  size?: number;
  font?: FontFamily;
  color?: FontColor;
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
  font: fonts = 'medium',
  color = 'default',
  align = 'center',
  onPress,
  ...props
}) => {
  return (
    <S.TextElement
      size={size}
      font={fonts}
      color={color}
      align={align}
      onPress={onPress}
      {...props}
    >
      {children}
    </S.TextElement>
  );
};
