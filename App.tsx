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
function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <MyStack />
        <Footer />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
