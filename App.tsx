import React from 'react';
import OneSignal from 'react-native-onesignal';
import { ONESIGNAL_APP_ID } from 'react-native-dotenv';

import { HomeScreen } from "./src/Screens/HomeScreen";
import { useInAppUpdate } from './src/hooks/useInAppUpdate'

declare const global: {HermesInternal: null | {}};


const App = () => {

  OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId(ONESIGNAL_APP_ID);

  useInAppUpdate();

  return <HomeScreen/>;
};

export default App;
