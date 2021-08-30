import 'react-native-gesture-handler';
import React, {FC} from 'react';
import {Platform} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {SvgProps} from "react-native-svg";

import {HomeScreen} from "./src/Screens/HomeScreen";
import {CurrencyScreen} from './src/Screens/CurrencyScreen';
import {TrackingScreen} from './src/Screens/TrackingScreen';
import {SizeChartScreen} from './src/Screens/SizeChartScreen';
import {FindzipScreen} from './src/Screens/FindzipScreen';
import {ZipyIcon} from './src/components/icons/ZipyIcon';
import {TrackingIcon} from './src/components/icons/TrackingIcon';
import {SizeChartIcon} from './src/components/icons/SizeChartIcon';
import {ZipCodeIcon} from './src/components/icons/ZipCodeIcon';
import {CalculatorIcon} from './src/components/icons/CalculatorIcon';
import { tabsNames } from './src/constants'

declare const global: {HermesInternal: null | {}};

const Tab = createBottomTabNavigator();

const App = () => {

  return (
      <>
          {Platform.OS === 'ios' ? (
              <NavigationContainer>
                  <Tab.Navigator
                      initialRouteName={tabsNames.home}
                      screenOptions={({ route, navigation }) => ({
                          tabBarIcon: ({ color, size, focused }) => {
                              let icons: {[key: string]: FC<SvgProps>} = {
                                  [tabsNames.tracking]: TrackingIcon,
                                  [tabsNames.sizeChart]: SizeChartIcon,
                                  [tabsNames.home]: ZipyIcon,
                                  [tabsNames.zipCode]: ZipCodeIcon,
                                  [tabsNames.calculator]: CalculatorIcon,
                              };
                              const DynamicIcon = icons[route.name];

                              return <DynamicIcon
                                        color={color} 
                                        width={size} 
                                        height={size} 
                                    />;
                          },

                      })}
                      tabBarOptions={{
                          activeTintColor: '#7866ff',
                          inactiveTintColor: '#8D8D8F',
                          labelStyle: {
                              fontSize: 12
                          },
                      }}

                  >
                      <Tab.Screen name={tabsNames.tracking} component={TrackingScreen} />
                      <Tab.Screen name={tabsNames.sizeChart} component={SizeChartScreen} />
                      <Tab.Screen name={tabsNames.home} component={HomeScreen} />
                      <Tab.Screen name={tabsNames.zipCode} component={FindzipScreen} />
                      <Tab.Screen name={tabsNames.calculator} component={CurrencyScreen} />
                  </Tab.Navigator>
              </NavigationContainer>
          ) : <HomeScreen/>}
      </>
  )
};

export default App;
