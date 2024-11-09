import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import { HomeScreen } from 'src/screens/home';
import { BottomTabParams } from 'src/types/bottomTabsParams.type';

const BottomTab = createBottomTabNavigator<BottomTabParams>();

/**
 * 앱의 바텀 탭을 생성합니다.
 * @returns 바텀 탭
 */
export const MainTabs: React.FC = () => {
  /**
   * 바텀바의 스크린 옵션을 반환합니다.
   * @param title 바텀바에 표시할 타이틀
   * @param icon 바텀바에 표시할 아이콘
   * @returns 바텀바 스크린 옵션
   */
  const getScreenOptions = (title: string, icon: IconProp) => ({
    title,
    tabBarIcon: ({ color }: { color: string }) => (
      <FontAwesomeIcon icon={icon} size={25} color={color} />
    ),
  });

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={getScreenOptions('홈', faHouse)}
      />
    </BottomTab.Navigator>
  );
};
