import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from './src/redux/store';
import Toast from 'react-native-toast-message';
import Index from './src/index';

const App = () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <Index />
      <Toast />
    </SafeAreaProvider>
  </Provider>
);

export default App;