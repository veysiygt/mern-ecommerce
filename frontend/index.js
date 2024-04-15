// App.js veya App.tsx

import React from 'react';
import { Provider } from 'react-redux';
import App from './src/App';

const Index = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Index;
