import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';

export default function DeviceItem({ device, isSelected, isDeleting, onPress, onDelete }) {
    const [depressed, setDepressed] = useState(false);

    const styles = {
        ...global.styles, ...StyleSheet.create({
            header: {
                fontSize: 24,
                fontWeight: 'bold',
            },
            text: {
                fontSize: 18,
                color: global.theme.colors.secondary
            },
            view: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderBottomWidth: 1,
                borderColor: global.theme.colors.info
            }
        })
    }
    return (
        <TouchableWithoutFeedback onPress={onPress} onPressIn={() => { setDepressed(true) }} onPressOut={() => { setDepressed(false) }} >
            <View style={[styles.view, { backgroundColor: isSelected || depressed ? global.theme.colors.lightGray : global.theme.colors.background }]}>
                <View>
                    <Text style={styles.header}>{device.name}</Text>
                    <View style={{ height: 5 }} />
                    <Text style={styles.text}>{device.ip}</Text>
                </View>
                {
                    isDeleting ?
                        <TouchableOpacity onPress={onDelete} activeOpacity={0.75}>
                            <View style={{ borderRadius: 100, backgroundColor: global.theme.colors.error, padding: 10, zIndex: 1 }}>
                                <MaterialCommunityIcons name="trash-can" size={40} color={global.theme.colors.background} />
                            </View>
                        </TouchableOpacity>
                        :
                        null
                }
            </View>
        </TouchableWithoutFeedback>
    )

}
