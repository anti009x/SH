import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import FlashMessage from 'react-native-flash-message';
import Router from './src/router';
import { Provider, useSelector } from 'react-redux';
import store from './src/config/redux/store';
import AnimasiLogin from './src/components/AnimasiLogin';
import { TimeProvider } from './src/components/Time/TimeContext';

const MainApp = () => {
  const stateGlobal = useSelector(state => state);
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {stateGlobal.loading && <AnimasiLogin />}
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <TimeProvider>
        <MainApp />
      </TimeProvider>
    </Provider>
  );
};

export default App;
