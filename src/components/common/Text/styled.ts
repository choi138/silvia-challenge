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
    font-weight: 900;
  `,
  medium: css`
    font-weight: 600;
  `,
  regular: css`
    font-weight: 400;
  `,
  thin: css`
    font-weight: 300;
  `,
};

export const TextElement = styled.Text<Required<TextCustomProps>>`
  font-size: ${(props) => props.size.toString()}px;

  ${(props) => aligns[props.align]}
  ${(props) => variants[props.color]}
  ${(props) => fontFamily[props.font]}
`;
