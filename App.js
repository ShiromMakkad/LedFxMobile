import React from 'react';
import { StatusBar } from 'expo-status-bar'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ThemeProvider } from 'react-native-elements'
import { View, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLightbulb, faBroadcastTower, faPlus } from '@fortawesome/free-solid-svg-icons'
import Browser from './App/Browser'
import Devices from './App/Devices'
import Add from './App/Add'

global.theme = {
  colors: {
    primary: '#1D7DB9',
    secondary: '#212121',
    success: '#3CB479',
    error: '#F44336',
    warning: '#BAA441',
  }
}

//This ensures that there is a single color status bar on both IOS and Android and that the content starts below it. 
const ColoredStatusBar = ({backgroundColor, ...props}) => (
    <View style={{height: getStatusBarHeight(true), backgroundColor: backgroundColor}}>
        <StatusBar translucent={Platform.OS === 'ios' ? true : false} backgroundColor={backgroundColor} {...props} />
    </View>
);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ThemeProvider theme={global.theme}>
      <ColoredStatusBar backgroundColor={global.theme.colors.secondary} style='light' />
      <SafeAreaProvider>
        <NavigationContainer theme={global.theme}>
          <Tab.Navigator
            initialRouteName="Browser"
            screenOptions={{
              cardStyle: {
                backgroundColor: global.theme.colors.secondary
              }
            }}
            tabBarOptions={{
              activeTintColor: global.theme.colors.primary,
              inactiveTintColor: '#ffffff',
              safeAreaInsets: {top: 0, bottom: 7, right: 0, left: 0},
              tabStyle: {
                paddingTop: 7 
              },
              style: {
                position: 'absolute',
                backgroundColor: global.theme.colors.secondary,
              }
            }}
          >
            <Tab.Screen
              name="Browser"
              component={Browser}
              options={{
                tabBarLabel: 'Lights',
                tabBarIcon: ({ color, size }) => (
                  <FontAwesomeIcon icon={faLightbulb} size={size} color={color} />
                ),
              }} 
            />
            <Tab.Screen
              name="Devices"
              component={Devices}
              options={{
                tabBarLabel: 'Devices',
                tabBarIcon: ({ color, size }) => (
                  <FontAwesomeIcon icon={faBroadcastTower} size={size} color={color} />
                ),
              }} 
            />
            <Tab.Screen
              name="Add"
              component={Add}
              options={{
                tabBarLabel: 'Add Device',
                tabBarIcon: ({ color, size }) => (
                  <FontAwesomeIcon icon={faPlus} size={size} color={color} />
                ),
              }} 
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

