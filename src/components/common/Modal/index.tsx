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

const ModalOverlay: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const backgroundColor = useRef(new Animated.Value(0)).current;

  const backgroundTransition = () => {
    Animated.timing(backgroundColor, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', 'rgba(0,0,0,0.5)'],
  });

  useEffect(() => {
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
