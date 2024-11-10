import styled, { css, ReactNativeStyle } from '@emotion/native';

import { colors } from 'src/styles';

import { TagCustomProps, TagVariant } from '.';

const variants: Record<TagVariant, ReactNativeStyle> = {
  safe: css`
    background-color: ${colors.tag.safe};
  `,
  danger: css`
    background-color: ${colors.tag.danger};
  `,
};
export const Tag = styled.View<TagCustomProps>`
  padding: 4px 8px;
  border-radius: 50%;
  ${(props) => variants[props.variant]}
`;
