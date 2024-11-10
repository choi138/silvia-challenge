import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { colors } from 'src/styles';
import {
  InspectionMainScreen,
  InspectionRoundDoneScreen,
  InspectionStartScreen,
} from 'src/screens/inspection';
import { RootStackParams } from 'src/types';
import { InspectionDoneScreen } from 'src/screens/inspection/done';

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
        initialRouteName="InspectionRoundDone"
      >
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="InspectionStart" component={InspectionStartScreen} />
        <Stack.Screen name="InspectionMain" component={InspectionMainScreen} />
        <Stack.Screen name="InspectionRoundDone" component={InspectionRoundDoneScreen} />
        <Stack.Screen name="InspectionDone" component={InspectionDoneScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
