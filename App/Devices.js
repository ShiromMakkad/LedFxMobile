import React, { useState, useEffect } from 'react'
import { View, TouchableWithoutFeedback, StyleSheet, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import produce from 'immer'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { ListItem } from 'react-native-elements'
import hexToRgba from 'hex-to-rgba';
import { useIsFocused, useNavigation } from '@react-navigation/native'

export default function Devices({ devices, setDevices, selectedDevice, setSelectedDevice }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const isFocused = useIsFocused();
    const navigation = useNavigation();

    useEffect(() => {
        if(isFocused && devices.length === 0) {
            navigation.navigate("Add");
        }
    }, [isFocused])

    const deleteDevice = (deviceIdx) => {
        if(selectedDevice == deviceIdx) {
            setSelectedDevice(-1)
        }
        setDevices(devices => produce(devices, devicesDraft => { devicesDraft.splice(deviceIdx, 1) }))
        if(deviceIdx < selectedDevice && selectedDevice !== -1) {
            setSelectedDevice(selectedDevice - 1);
        }
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

      const renderItem = ({ item: device, index: i }) => (
          // If anyone can fix the lag on this, please do. I've spent hours on it. 
          <TouchableWithoutFeedback onPress={() => setSelectedDevice(i)}>
              <ListItem
                  title={device.name}
                  subtitle={device.ip}
                  rightIcon={isDeleting ? { name: 'trash-can', type: 'material-community', color: global.theme.colors.error, size: 33, onPress: () => deleteDevice(i) } : undefined}
                  bottomDivider
                  containerStyle={{ backgroundColor: selectedDevice == i ? hexToRgba(global.theme.colors.success, 0.25) : global.theme.colors.background }}
                  underlayColor={hexToRgba(global.theme.colors.success, 0.25)}
              />
          </TouchableWithoutFeedback>
      );

    return (
        <SafeAreaView style={{ marginBottom: useBottomTabBarHeight(), flex: 1 }}>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                data={devices}
            />
            <TouchableWithoutFeedback onPress={() => { setIsDeleting(!isDeleting) }}>
                <View style={styles.floating}>
                    <MaterialCommunityIcons name={isDeleting ? "check" : "trash-can"} size={35} color={global.theme.colors.background} />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}