import React from 'react';
import {Provider} from 'react-redux';
import reduxStore from './src/Redux/CreateStore';
import MainStackNaviator from './src/Navigators/MainStackNavigators';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Provider store={reduxStore()}>
          <MainStackNaviator />
        </Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
