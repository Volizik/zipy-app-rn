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
import {CurrencyScreen} from './src/Screens/CurrencyScreen';
import {TrackingScreen} from './src/Screens/TrackingScreen';
import {MehesScreen} from './src/Screens/MehesScreen';
import {FindzipScreen} from './src/Screens/FindzipScreen';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {googleSignInConfigure} from "./src/utils/google-signin";
import Icon from 'react-native-vector-icons/FontAwesome';

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
                  <Tab.Navigator
                      initialRouteName='Buy Online'
                      screenOptions={({ route }) => ({
                          tabBarIcon: ({ color, size }) => {
                              let iconName: {[key: string]: string} = {
                                  'Track': 'briefcase',
                                  'Sizechart': 'list',
                                  'Buy Online': 'globe',
                                  'Customs': 'credit-card',
                                  'Exchange': 'calculator',
                              };

                              return <Icon name={iconName[route.name]} size={size} color={color} />;
                          },
                      })}
                  >
                      <Tab.Screen name="Track" component={TrackingScreen} />
                      <Tab.Screen name="Sizechart" component={FindzipScreen} />
                      <Tab.Screen name="Buy Online" component={HomeScreen} />
                      <Tab.Screen name="Customs" component={MehesScreen} />
                      <Tab.Screen name="Exchange" component={CurrencyScreen} />
                  </Tab.Navigator>
              </NavigationContainer>
          ) : <HomeScreen/>}
      </>
  )
};

export default App;
