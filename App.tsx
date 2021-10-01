import React from 'react';
import { Alert } from 'react-native';
import {
    getTrackingStatus,
    requestTrackingPermission,
  } from 'react-native-tracking-transparency';

import {HomeScreen} from "./src/Screens/HomeScreen";

declare const global: {HermesInternal: null | {}};

const App = () => {

  React.useEffect(() => {
    getTrackingStatus()
      .then((status) => {
          if (status === 'not-determined') {
            request();
          }
      })
      .catch((e) => Alert.alert('Error', e?.toString?.() ?? e));
  }, []);

  const request = React.useCallback(async () => {
    try {
      await requestTrackingPermission();
    } catch (e) {
      Alert.alert('Error', e?.toString?.() ?? e);
    }
  }, []);

  return <HomeScreen/>;
};

export default App;
