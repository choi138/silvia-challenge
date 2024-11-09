import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { RootStackParams } from 'src/types/stackParams.types';
import { colors } from 'src/styles';
import { InspectionScreen } from 'src/screens/inspection';

import { MainTabs } from '../mainTabs';

const Stack = createStackNavigator<RootStackParams>();

/**
 * 스크린들을 스택으로 관리하는 네비게이터입니다.
 * @return 스택 네비게이터
 */
export const RootStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.background },
        }}
        initialRouteName="Inspection"
      >
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Inspection" component={InspectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
