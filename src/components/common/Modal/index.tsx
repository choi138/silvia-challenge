import { useEffect, useRef } from 'react';
import { Animated, Modal as RNModal } from 'react-native';

import { Text } from '../Text';
import { Button } from '../Button';

import * as S from './styled';

export interface ModalProps {
  title: string;
  children?: React.ReactNode;
  onPressButton?: () => void;
}

/**
 * 모달 컴포넌트
 * @param title 모달 제목
 * @param children 모달 내용
 * @param onPressButton 모달 버튼 클릭시 발생할 이벤트
 */
const ModalComponent: React.FC<ModalProps> = ({ title, children, onPressButton }) => {
  return (
    <RNModal animationType="slide" transparent={true} visible={true}>
      <S.ModalWrapper>
        <S.ModalContainer>
          <Text size={24} font="bold">
            {title}
          </Text>
          {children}
          <Button onPress={onPressButton} width="100%" size="small">
            닫기
          </Button>
        </S.ModalContainer>
      </S.ModalWrapper>
    </RNModal>
  );
};

/**
 * 모달 오버레이 컴포넌트
 * @param children 모달 오버레이 내용
 */
const ModalOverlay: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  /** 배경색 애니메이션 값 */
  const backgroundColor = useRef(new Animated.Value(0)).current;

  /** 배경색을 변경 애니메이션 */
  const backgroundTransition = () => {
    Animated.timing(backgroundColor, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  /** 배경색 애니메이션 */
  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', 'rgba(0,0,0,0.5)'],
  });

  useEffect(() => {
    /** 처음 컴포넌트가 실행될때 배경색이 변경됩니다 */
    backgroundTransition();
  }, []);

  return (
    <S.ModalOverlay style={{ backgroundColor: interpolatedBackgroundColor }}>
      {children}
    </S.ModalOverlay>
  );
};

export const Modal = Object.assign(ModalComponent, {
  Overlay: ModalOverlay,
});
