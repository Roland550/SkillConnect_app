import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { ComponentStyles } from './Styles'
import ScreenStyles from '../screen/screenStyle'


export default function Messages() {
  return (
    <SafeAreaView >
      <View style = {ScreenStyles.messages}>
        <Text style = {ComponentStyles.messages_content}>Message</Text>
      </View>
    </SafeAreaView>
  )
}