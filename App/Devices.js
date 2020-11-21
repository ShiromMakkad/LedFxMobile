import React from 'react'
import { View, Text, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import produce from 'immer'

export default function Devices({ devices, setDevices }) {
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <View>
                <Text>Test Devices</Text>
                <Button title="Test" onPress={() => { setDevices(devices => produce(devices, devicesDraft => { devicesDraft.devices[devicesDraft.metadata.selected_device].ip = "http://127.0.0.1" })); navigation.navigate('Browser') }} />
            </View>
        </SafeAreaView>
    )
}
