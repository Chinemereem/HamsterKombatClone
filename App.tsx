/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {MyStack} from './src/navigation/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Footer from './src/navigation/Footer';
import {TimerProvider} from './src/screens/Home/TimerContext';
function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1, backgroundColor: '#1D1F24'}}>
        {/* <MyStack /> */}
        <TimerProvider>
          <Footer />
        </TimerProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
