import styled from '@emotion/native';

import { colors } from 'src/styles';

export const HomeScreenContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Row = styled.View<{ isMiddle?: boolean }>`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: ${({ isMiddle }) => (isMiddle ? '80%' : '60%')};
  margin-bottom: 30px;
`;

export const CircleWrapper = styled.View`
  padding: 2px;
  border-color: #b0c4de;
  border-width: 2px;
  border-radius: 50%;
`;

export const Circle = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${colors.circle};
`;

export const Square = styled.View`
  width: 80px;
  height: 80px;
  border-width: 2px;
  border-color: #b0c4de;
  margin: 14px;
`;

export const OffsetCircleWrapper = styled(CircleWrapper)<{
  offset: { top?: number; bottom?: number; left?: number; right?: number };
}>`
  position: relative;
  ${(props) => props.offset.top && `top: ${props.offset.top}px;`}
  ${(props) => props.offset.bottom && `bottom: ${props.offset.bottom}px;`}
  ${(props) => props.offset.left && `left: ${props.offset.left}px;`}
  ${(props) => props.offset.right && `right: ${props.offset.right}px;`}
`;

export const TopLeftCircleWrapper = styled.View`
  bottom: 20px;
  right: 20px;
`;

export const BottomRightCircle = styled.View`
  top: 20px;
  left: 20px;
`;
