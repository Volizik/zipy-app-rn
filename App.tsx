/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Platform} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {HomeScreen} from "./src/Screens/HomeScreen";
import {SettingsScreen} from "./src/Screens/SettingsScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {googleSignInConfigure} from "./src/utils/google-signin";

declare const global: {HermesInternal: null | {}};

const Tab = createBottomTabNavigator();

const App = () => {

    useEffect(() => {
        googleSignInConfigure();
    })

  return (
      <>
          {Platform.OS === 'ios' ? (
              <NavigationContainer>
                  <Tab.Navigator>
                      <Tab.Screen name="Home" component={HomeScreen} />
                      <Tab.Screen name="Tracking" component={SettingsScreen} />
                  </Tab.Navigator>
              </NavigationContainer>
          ) : <HomeScreen/>}
      </>
  )
};

export default App;
