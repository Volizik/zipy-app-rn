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
import React, {FC, useEffect} from 'react';
import {Platform} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {HomeScreen} from "./src/Screens/HomeScreen";
import {CurrencyScreen} from './src/Screens/CurrencyScreen';
import {TrackingScreen} from './src/Screens/TrackingScreen';
import {SizeChartScreen} from './src/Screens/SizeChartScreen';
import {FindzipScreen} from './src/Screens/FindzipScreen';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {googleSignInConfigure} from "./src/utils/google-signin";
import {ZipyIcon} from './src/components/icons/ZipyIcon';
import {TrackingIcon} from './src/components/icons/TrackingIcon';
import {SizeChartIcon} from './src/components/icons/SizeChartIcon';
import {ZipCodeIcon} from './src/components/icons/ZipCodeIcon';
import {CalculatorIcon} from './src/components/icons/CalculatorIcon';
import {SvgProps} from "react-native-svg";

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
                      initialRouteName='ראשי'
                      screenOptions={({ route }) => ({
                          tabBarIcon: ({ color, size, focused }) => {
                              let icons: {[key: string]: FC<SvgProps>} = {
                                  'מעקב משלוחים': TrackingIcon,
                                  'המרת מידות': SizeChartIcon,
                                  'ראשי': ZipyIcon,
                                  'איתור מיקוד': ZipCodeIcon,
                                  'המרת מטבע': CalculatorIcon,
                              };
                              const DynamicIcon = icons[route.name];

                              return <DynamicIcon color={color} width={size} height={size} />;
                          },
                      })}
                      tabBarOptions={{
                          activeTintColor: '#7866ff',
                          inactiveTintColor: '#8D8D8F',
                      }}

                  >
                      <Tab.Screen name="מעקב משלוחים" component={TrackingScreen} />
                      <Tab.Screen name="המרת מידות" component={SizeChartScreen} />
                      <Tab.Screen name="ראשי" component={HomeScreen} />
                      <Tab.Screen name="איתור מיקוד" component={FindzipScreen} />
                      <Tab.Screen name="המרת מטבע" component={CurrencyScreen} />
                  </Tab.Navigator>
              </NavigationContainer>
          ) : <HomeScreen/>}
      </>
  )
};

export default App;
