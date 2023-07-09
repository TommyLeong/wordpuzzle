import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppConfig from '../Configs/AppConfig';

import HomeScreen from '../Containers/HomeScreen';
import PuzzleScreen from '../Containers/PuzzleScreen';
import LeaderboardScreen from '../Containers/LeaderboardScreen';
import ScoreScreen from '../Containers/ScoreScreen';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator name="wordpuzzlestack" initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: AppConfig.themeColor,
          },
        }}
      />
      <Stack.Screen
        name="PuzzleScreen"
        component={PuzzleScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: AppConfig.themeColor,
          },
        }}
      />

      <Stack.Screen
        name="LeaderboardScreen"
        component={LeaderboardScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: AppConfig.themeColor,
          },
        }}
      />

      <Stack.Screen
        name="ScoreScreen"
        component={ScoreScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: AppConfig.themeColor,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
