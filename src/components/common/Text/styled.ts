import styled, { css, ReactNativeStyle } from '@emotion/native';

import { colors } from 'src/styles';

import { FontAlign, FontFamily, FontColor, TextCustomProps } from '.';

const variants: Record<FontColor, ReactNativeStyle> = {
  default: css`
    color: ${colors.text.default};
  `,
  white: css`
    color: ${colors.text.white};
  `,
  gray: css`
    color: ${colors.text.gray};
  `,
  link: css`
    color: ${colors.text.link};
  `,
  darkGray: css`
    color: ${colors.text.darkGray};
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
    font-weight: 900;
  `,
  medium: css`
    font-family: SpoqaHanSansNeo-Medium;
    font-weight: 700;
  `,
  regular: css`
    font-family: SpoqaHanSansNeo-Regular;
    font-weight: 400;
  `,
  light: css`
    font-family: SpoqaHanSansNeo-Light;
    font-weight: 300;
  `,
  thin: css`
    font-family: SpoqaHanSansNeo-Thin;
    font-weight: 100;
  `,
};

export const TextElement = styled.Text<Required<TextCustomProps>>`
  font-size: ${(props) => props.size.toString()}px;

  ${(props) => aligns[props.align]}
  ${(props) => variants[props.color]}
  ${(props) => fontFamily[props.fonts]}
`;
