import React from 'react';
import { Image, ImageSourcePropType, TouchableOpacityProps } from 'react-native';

import * as S from './styled';

export interface CircleContainerProps {
  children: React.ReactNode;
}

/**
 * 게임에서 사용하는 원의 컨테이너 컴포넌트
 * @param children 원 행 컴포넌트
 */
const CircleContainer: React.FC<CircleContainerProps> = ({ children }) => {
  return <S.CircleContainer>{children}</S.CircleContainer>;
};

export interface CircleRowProps {
  children: React.ReactNode;
}

/**
 * 게임에서 사용하는 원의 행 컴포넌트
 * @param children 원 컴포넌트
 */
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

/**
 * 게임에서 사용하는 원 컴포넌트
 * @param top 원의 상단 위치
 * @param left 원의 좌측 위치
 * @param img 원의 이미지
 * @param opened 원이 열려있는지 여부
 * @param props TouchableOpacityProps
 */
const CircleComponent: React.FC<CircleProps> = ({ top, left, img, opened = true, ...props }) => {
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

export const GameCircle = Object.assign(CircleComponent, {
  Container: CircleContainer,
  Row: CircleRow,
});
