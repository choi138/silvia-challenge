import React from 'react';
import { ViewProps } from 'react-native';

import { Text } from '../Text';

import * as S from './styled';

export type TagVariant = 'safe' | 'danger';
export type TagSize = 'small' | 'medium';

export interface TagCustomProps {
  variant: TagVariant;
  size?: TagSize;
}

export type TagProps = TagCustomProps & ViewProps;

/**
 * 안전/위험을 표시하는 태그 컴포넌트
 * @param variant 태그의 종류
 * @param size 태그의 크기
 */
export const Tag: React.FC<TagProps> = ({ variant, size = 'medium', ...props }) => {
  return (
    <S.Tag {...props} variant={variant}>
      <Text color="white" size={size === 'medium' ? 19 : 13}>
        {props.children}
      </Text>
    </S.Tag>
  );
};
