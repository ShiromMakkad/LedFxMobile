import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import hexToRgba from 'hex-to-rgba';

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
    return <ListItem 
                title={device.name}
                subtitle={device.ip}
                rightIcon={isDeleting ? { name: 'trash-can', type: 'material-community', color: global.theme.colors.error, size: 33, onPress: onDelete } : undefined} 
                bottomDivider
                chevron={ isDeleting ? undefined : {size: 33} }
                containerStyle={{ backgroundColor: isSelected ? hexToRgba(global.theme.colors.success, 0.25) : global.theme.colors.background }}
                onPress={onPress}
                underlayColor={hexToRgba(global.theme.colors.success, 0.25)}
                />

    // return (
        // <TouchableWithoutFeedback onPress={onPress} onPressIn={() => { setDepressed(true) }} onPressOut={() => { setDepressed(false) }} >
        //     <View style={[styles.view, { backgroundColor: isSelected || depressed ? global.theme.colors.lightGray : global.theme.colors.background }]}>
        //         <View>
        //             <Text style={styles.header}>{device.name}</Text>
        //             <View style={{ height: 5 }} />
        //             <Text style={styles.text}>{device.ip}</Text>
        //         </View>
        //         {
        //             isDeleting ?
        //                 <TouchableOpacity onPress={onDelete} activeOpacity={0.75}>
        //                     <View style={{ borderRadius: 100, backgroundColor: global.theme.colors.error, padding: 10, zIndex: 1 }}>
        //                         <MaterialCommunityIcons name="trash-can" size={40} color={global.theme.colors.background} />
        //                     </View>
        //                 </TouchableOpacity>
        //                 :
        //                 null
        //         }
        //     </View>
        // </TouchableWithoutFeedback>
        // <ListItem onPress={onPress}>
        //     <ListItem.Content>
        //             <ListItem.Title>{device.name}</ListItem.Title>
        //             <ListItem.Subtitle>{device.ip}</ListItem.Subtitle>
        //         {/* {
        //             isDeleting ?
        //                 <ListItem.Chevron name='trash-can' type='material-community' color={global.theme.colors.error} />
        //                 // <TouchableOpacity onPress={onDelete} activeOpacity={0.75}>
        //                 //     <View style={{ borderRadius: 100, backgroundColor: global.theme.colors.error, padding: 10, zIndex: 1 }}>
        //                 //         <MaterialCommunityIcons name="trash-can" size={40} color={global.theme.colors.background} />
        //                 //     </View>
        //                 // </TouchableOpacity>
        //                 :
        //                 null
        //         } */}
        //     </ListItem.Content>
        // </ListItem>
    // )

}
