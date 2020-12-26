import React, { useState, useContext, useEffect } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'
import { useNavigation } from '@react-navigation/native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { ThemeContext, Button } from 'react-native-elements'

export default function Browser({ devices, setDevices }) {
    const [webViewState, setWebViewState] = useState(1);
    // 0 means show page
    // 1 means show loading screen
    // -1 means show error screen
    // 2 is the starting value because we might display the getting started screen

    const { theme } = useContext(ThemeContext)
    const navigation = useNavigation();

    useEffect(() => {
        if(devices.devices.length === 0) {
            navigation.navigate("Add");
        }
    })

    let webViewRef;

    const displaySpinner = () => {
        return (
            <View style={ styles.view }>
                <ActivityIndicator size="large" style={{ transform: [{ scale: 2 }], marginVertical: 25 }} color={global.theme.colors.primary} />
            </View>
        );
    }

    const displayNoDevice = () => {
        setWebViewState(2);
        return (
            <View style={styles.view}>
                <MaterialCommunityIcons name="lightbulb-off-outline" size={150} color={global.theme.colors.lightGray} style={{ margin: 5 }} />
                <Text style={[styles.text, { color: global.theme.colors.lightGray }]}>No devices found</Text>
                <View style={{height: 100}} />
                <Button buttonStyle={global.styles.button} title=" ADD DEVICE" onPress={() => { navigation.navigate("Add") }} />
            </View>
        )
    }

    const displayError = () => {
        return (
            <View style={styles.view}>
                <MaterialCommunityIcons name="wifi-off" size={150} color={global.theme.colors.info} style={{ margin: 5 }} />
                <Text style={[styles.text, { color: global.theme.colors.info }]}>
                    {"Failed to load the " } 
                    <Text style={{fontWeight: 'bold'}}>{ devices.devices[devices.metadata.selected_device].name }</Text>
                    { " device"}
                    </Text>
                <View style={{height: 100}} />
                <Button buttonStyle={global.styles.button} icon={<MaterialCommunityIcons name="refresh" color={theme.colors.white} />} title=" TRY AGAIN" onPress={() => { webViewRef.reload() }} />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            { webViewState === 1 ? displaySpinner() : null}
            { webViewState == -1 ? displayError() : null } 
            {
                devices.devices.length !== 0 ?
                    <WebView
                        ref={ref => (webViewRef = ref)}
                        startInLoadingState={true}
                        onError={() => { setWebViewState(-1) }}
                        onLoad={() => { setWebViewState(0) }}
                        onLoadStart={() => { setWebViewState(1) }}
                        onNavigationStateChange={(navState) => { if (navState.url === "about:blank" && !navState.loading) setWebViewState(-1) }} //Necessary because sometimes it loads about:blank when a site doesn't render and says that the result was successful
                        style={[{ marginBottom: useBottomTabBarHeight() }, webViewState === 0 ? { display: "flex" } : { display: "none" }]}
                        source={{ uri: devices.devices[devices.metadata.selected_device].protocol + "://" + devices.devices[devices.metadata.selected_device].ip + ":" + devices.devices[devices.metadata.selected_device].port + "/" }} />
                :
                displayNoDevice()
            }
        </SafeAreaView >
    )
}

const styles = { ...global.styles, ...StyleSheet.create({
    text: {
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 55
    },
    view: {
        height: '100%',
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
    }
})}