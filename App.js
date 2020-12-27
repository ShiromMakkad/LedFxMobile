import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ThemeProvider } from 'react-native-elements'
import { View, Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer  } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-community/async-storage'
import Browser from './App/Browser'
import Devices from './App/Devices'
import Add from './App/Add'

global.theme = {
  colors: {
    primary: '#18BFD9',
    secondary: '#333333',
    success: '#3CB479',
    error: '#F44336',
    warning: '#BAA441',
    info: '#949494',
    lightGray: '#d1d1d1',
    background: '#FAFAFA'
  }
}

global.styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 16
  },
  text: {
    fontFamily: "Roboto",
  },
})

//This ensures that there is a single color status bar on both IOS and Android and that the content starts below it. 
const ColoredStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ height: getStatusBarHeight(true), backgroundColor: backgroundColor }}>
    <StatusBar translucent={Platform.OS === 'ios' ? true : false} backgroundColor={backgroundColor} {...props} />
  </View>
);

const Tab = createBottomTabNavigator();

export default function App() {
  const [selectedDevice, setSelectedDevice] = useState(-1)
  const [devices, setDevices] = useState([])

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('devices', JSON.stringify(devices))
      await AsyncStorage.setItem('selectedDevice', JSON.stringify(selectedDevice))
    } catch (e) {
      console.warn('Failed to save the data to the storage. Error: ' + e)
    }
  }

  const readData = async () => {
    try {
      const devicesRead = await AsyncStorage.getItem('devices')
      const selectedDeviceRead = await AsyncStorage.getItem('selectedDevice')
  
      if (devicesRead !== null) {
        setDevices(JSON.parse(devicesRead));
      }
      else {
        console.warn("Error reading devices")
      }

      if (selectedDeviceRead !== null) {
        setSelectedDevice(JSON.parse(selectedDeviceRead));
      }
      else {
        console.warn("Error reading selected device")
      }
    } catch (e) {
      console.warn('Failed to fetch the data from storage')
    }
  }

  useEffect(() => {
    readData();
  }, [])

  useEffect(() => {
    saveData();
  }, [devices, selectedDevice])

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
              keyboardHidesTabBar: true,
              activeTintColor: global.theme.colors.primary,
              inactiveTintColor: global.theme.colors.background,
              safeAreaInsets: { top: 0, bottom: 7, right: 0, left: 0 },
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
              options={{
                tabBarLabel: 'Lights',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="lightbulb" size={size} color={color} />
                ),
              }}>
              {() => { return <Browser devices={devices} selectedDevice={selectedDevice} /> }}
            </Tab.Screen>
            <Tab.Screen
              name="Devices"
              options={{
                tabBarLabel: 'Devices',
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome5 name="broadcast-tower" size={size * 0.85} color={color} />
                ),
              }}>
              {() => { return <Devices devices={devices} setDevices={setDevices} selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} /> }}
            </Tab.Screen>
            <Tab.Screen
              name="Add"
              options={{
                tabBarLabel: 'Add Device',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="plus" size={size * 1.4} color={color} />
                ),
              }}>
              {() => { return <Add devices={devices} setDevices={setDevices} /> }}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

