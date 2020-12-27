import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import DropDownPicker from 'react-native-dropdown-picker';
import produce from 'immer'
import { useNavigation } from '@react-navigation/native'

export default function Add({ setDevices }) {
    const navigation = useNavigation();
    const [device, setDevice] = useState({
        name: "",
        protocol: "http",
        ip: "",
        port: "8888"
    })

    const addDevice = () => {
        console.log(device);
        if(device.name !== "" && device.ip !== "") {
            setDevices(devices => produce(devices, devicesDraft => { devicesDraft.push({ name: device.name, protocol: device.protocol, ip: device.ip, port: device.port }) }))
            setDevice({
                name: "",
                protocol: "http",
                ip: "",
                port: "8888"
            })
            navigation.navigate("Devices");
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginHorizontal: 10, marginVertical: 20, height:500 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Add Device: </Text>
                <View>
                    <Text style={{ marginLeft: 10 }} >Name: </Text>
                    <Input value={device.name} onChangeText={value => setDevice({ ...device, name: value })} placeholder="Name" />
                </View>
                <View>
                    <Text style={{ marginLeft: 10 }} >IP Address: </Text>
                    <Input value={device.ip} onChangeText={value => setDevice({ ...device, ip: value })} placeholder="192.168.1.67" />
                </View>
                <View>
                    <Text style={{ marginLeft: 10 }}>Port: </Text>
                    <Input value={device.port} onChangeText={value => setDevice({ ...device, port: value })} placeholder="8888" />
                </View>
                <View style={{ marginHorizontal: 10 }}>
                    <Text>Protocol: </Text>
                    <View style={{ height: 8 }} />
                    <DropDownPicker
                        items={[
                            { label: 'http', value: 'http' },
                            { label: 'https', value: 'https' },
                        ]}
                        defaultValue={device.protocol}
                        containerStyle={{ height: 50 }}
                        itemStyle={{
                            justifyContent: 'flex-start',
                            paddingVertical: 15
                        }}
                        labelStyle={{
                            fontSize: 18
                        }}
                        onChangeItem={protocol => { setDevice({ ...device, protocol: protocol.value }) }}
                        />
                </View>
                <View/>
                <Button onPress={() => { addDevice() }} buttonStyle={{ marginHorizontal: 10 }}
                    title="Add Device"
                /> 
            </View>
        </SafeAreaView>
    )
}
