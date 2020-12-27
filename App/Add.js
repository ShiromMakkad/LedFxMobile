import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Input } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Add() {
    return (
        <SafeAreaView>
            <View>
                <Text>IP Address: </Text>
                <Input placeholder="192.168.1.67" />
            </View>
        </SafeAreaView>
    )
}
