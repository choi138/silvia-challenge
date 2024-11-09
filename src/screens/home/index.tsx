import React from 'react';

import * as S from './styled';

export const HomeScreen: React.FC = () => {
  return (
    <S.HomeScreenContainer>
      <S.Row>
        <S.OffsetCircleWrapper offset={{ bottom: 20, right: 20 }}>
          <S.Circle />
        </S.OffsetCircleWrapper>
        <S.CircleWrapper>
          <S.Circle />
        </S.CircleWrapper>
      </S.Row>
      <S.Row isMiddle>
        <S.CircleWrapper>
          <S.Circle />
        </S.CircleWrapper>
        <S.Square />
        <S.CircleWrapper>
          <S.Circle />
        </S.CircleWrapper>
      </S.Row>
      <S.Row>
        <S.CircleWrapper>
          <S.Circle />
        </S.CircleWrapper>
        <S.OffsetCircleWrapper offset={{ top: 20, left: 20 }}>
          <S.Circle />
        </S.OffsetCircleWrapper>
      </S.Row>
    </S.HomeScreenContainer>
  );
};
