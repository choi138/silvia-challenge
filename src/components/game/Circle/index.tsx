import React from 'react';
import { Image, ImageSourcePropType, TouchableOpacityProps } from 'react-native';

import * as S from './styled';

export interface CircleContainerProps {
  children: React.ReactNode;
}

const CircleContainer: React.FC<CircleContainerProps> = ({ children }) => {
  return <S.CircleContainer>{children}</S.CircleContainer>;
};

export interface CircleRowProps {
  children: React.ReactNode;
}

const CircleRow: React.FC<CircleRowProps> = ({ children }) => {
  return <S.CircleRow>{children}</S.CircleRow>;
};

export interface CircleCustomProps {
  top: number;
  left: number;
  img: ImageSourcePropType;
  opened: boolean;
}

export type CircleProps = CircleCustomProps & TouchableOpacityProps;

const CircleElement: React.FC<CircleProps> = ({ top, left, img, opened = true, ...props }) => {
  return (
    <S.CirclePositionWrapper top={top} left={left} {...props} activeOpacity={0.8}>
      {opened ? (
        <S.CircleWrapper hasImage>
          <Image source={img} style={{ width: '100%', height: '100%' }} />
        </S.CircleWrapper>
      ) : (
        <S.CircleWrapper>
          <S.Circle />
        </S.CircleWrapper>
      )}
    </S.CirclePositionWrapper>
  );
};

export const GameCircle = Object.assign(CircleElement, {
  Container: CircleContainer,
  Row: CircleRow,
});
