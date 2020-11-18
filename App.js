import React from 'react';
import { StatusBar } from 'expo-status-bar'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ThemeProvider } from 'react-native-elements'
import { View, SafeAreaView, Platform } from 'react-native';
import Browser from './App/Browser'

global.theme = {
  colors: {
    primary: '#1D7DB9'
  }
}

//This ensures that there is a single color status bar on both IOS and Android and that the content starts below it. 
const ColoredStatusBar = ({backgroundColor, ...props}) => (
    <View style={{height: getStatusBarHeight(true), backgroundColor: backgroundColor}}>
        <StatusBar translucent={Platform.OS === 'ios' ? true : false} backgroundColor={backgroundColor} {...props} />
    </View>
);

export default function App() {
  return (
    <View>
      <ColoredStatusBar backgroundColor={global.theme.colors.primary} style='light' />
      <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'never', bottom: 'never' }}>
        <ThemeProvider theme={global.theme}>
          <Browser />
        </ThemeProvider>
      </SafeAreaView>
    </View>
  );
}
