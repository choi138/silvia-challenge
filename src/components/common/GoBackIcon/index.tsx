import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export interface GoBackCustomIconProps {
  size?: number;
  onPress?: () => void;
}

export type GoBackIconProps = GoBackCustomIconProps & TouchableOpacityProps;

/**
 * 뒤로가기 아이콘 컴포넌트
 * @param props 커스텀 아이콘 속성
 */
export const GoBackIcon: React.FC<GoBackIconProps> = ({ size = 32, ...props }) => {
  const navigation = useNavigation();

  /**
   * 아이콘 클릭 시 뒤로가기를 실행합니다.
   */
  const onIconPress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={onIconPress} {...props}>
      <FontAwesomeIcon icon={faAngleLeft} size={size} />
    </TouchableOpacity>
  );
};
