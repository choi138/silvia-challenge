import styled, { css, ReactNativeStyle } from '@emotion/native';

import { colors } from 'src/styles';

import { FontAlign, FontFamily, FontVariants, TextCustomProps } from '.';

const variants: Record<FontVariants, ReactNativeStyle> = {
  default: css`
    color: ${colors.text.default};
  `,
  white: css`
    color: ${colors.text.white};
  `,
};

const aligns: Record<FontAlign, ReactNativeStyle> = {
  center: css`
    text-align: center;
  `,
  left: css`
    text-align: left;
  `,
  right: css`
    text-align: right;
  `,
};

const fontFamily: Record<FontFamily, ReactNativeStyle> = {
  bold: css`
    font-family: SpoqaHanSansNeo-Bold;
  `,
  medium: css`
    font-family: SpoqaHanSansNeo-Medium;
  `,
  regular: css`
    font-family: SpoqaHanSansNeo-Regular;
  `,
  light: css`
    font-family: SpoqaHanSansNeo-Light;
  `,
  thin: css`
    font-family: SpoqaHanSansNeo-Thin;
  `,
};

export const TextElement = styled.Text<Required<TextCustomProps>>`
  font-size: ${(props) => props.size.toString()}px;

  ${(props) => aligns[props.align]}
  ${(props) => variants[props.variants]}
  ${(props) => fontFamily[props.fonts]}
`;
