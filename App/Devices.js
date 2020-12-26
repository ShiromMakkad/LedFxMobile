import React, { useState } from 'react'
import DeviceItem from './components/DeviceItem'
import { View, ScrollView, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import produce from 'immer'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function Devices({ devices, setDevices }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const setSelectedDevice = (deviceIdx) => {
        setDevices(devices => produce(devices, devicesDraft => { devicesDraft.metadata.selected_device = deviceIdx }))
    }

    const deleteDevice = (deviceIdx) => {
        setDevices(devices => produce(devices, devicesDraft => { devicesDraft.devices.splice(deviceIdx, 1) }))
    }
 
    const styles = {
        ...global.styles, ...StyleSheet.create({
            floating: {
                borderRadius: 100,
                padding: 10,
                backgroundColor: isDeleting ? global.theme.colors.success : global.theme.colors.error,
                position: 'absolute',
                bottom: 10,
                right: 10,
                zIndex: 2
            },
        })
    }

    return (
        <SafeAreaView style={{ marginBottom: useBottomTabBarHeight(), flex: 1 }}>
            <ScrollView>
                {devices.devices.map((device, i) => {
                    return <DeviceItem device={device} isSelected={devices.metadata.selected_device === i} isDeleting={isDeleting} key={i} onPress={() => { setSelectedDevice(i) }} onDelete={ () => { deleteDevice(i) } } />
                })}
            </ScrollView>
            <TouchableWithoutFeedback onPress={() => { setIsDeleting(!isDeleting) }}>
                <View style={ styles.floating }>
                    <MaterialCommunityIcons name={ isDeleting ? "check" : "trash-can" } size={35} color={ global.theme.colors.background } />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}