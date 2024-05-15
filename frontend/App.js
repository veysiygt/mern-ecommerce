import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Toast from 'react-native-toast-message';
import Index from './src/index';

const App = () => (
  <Provider store={store}>
    <Index />
    <Toast />
  </Provider>
);

export default App;
