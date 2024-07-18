import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Onboard from '../screens/onboarding';
import {NavigationContainer} from '@react-navigation/native';
import DashBoard from '../screens/Home/DashBoard';

const Stack = createNativeStackNavigator();

export const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          component={Onboard}
          options={{
            // headerBackTitleVisible: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={DashBoard}
          options={{
            // headerBackTitleVisible: false,
            headerShown: false,
          }}
        />
        {/* <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
