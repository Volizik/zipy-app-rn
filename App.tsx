import React from 'react';

import { HomeScreen } from "./src/Screens/HomeScreen";
import { useInAppUpdate } from './src/hooks/useInAppUpdate'

declare const global: {HermesInternal: null | {}};


const App = () => {

  useInAppUpdate();

  return <HomeScreen/>;
};

export default App;
