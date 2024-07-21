import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import Onboard from '../screens/onboarding';
import {NavigationContainer} from '@react-navigation/native';
import DashBoard from '../screens/Home/DashBoard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EarnScreen from '../screens/Home/EarnScreen';

const Stack = createNativeStackNavigator();

export const MyStack = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  useEffect(() => {
    async function checkWelcome() {
      const welcomeDisplayed = await AsyncStorage.getItem('welcomeDisplayed');
      if (!welcomeDisplayed) {
        setShowWelcome(true);
        await AsyncStorage.setItem('welcomeDisplayed', 'true');
      }
    }
    checkWelcome();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        {showWelcome ? (
          <Stack.Screen
            name="Onboarding"
            component={Onboard}
            options={{
              // headerBackTitleVisible: false,
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="Home"
            component={DashBoard}
            options={{
              // headerBackTitleVisible: false,
              headerShown: false,
            }}
          />
        )}
        <Stack.Screen
          name="EarnScreen"
          component={EarnScreen}
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
