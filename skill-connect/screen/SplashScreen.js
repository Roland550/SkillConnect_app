import { View, Text } from 'react-native'
import React from 'react'
import ScreenStyles from './screenStyle'
ScreenStyles
export default function SplashScreen() {
  return (
    <View style={ScreenStyles.splash}>
      <Text style={ScreenStyles.SplashText}>Skill Connect</Text>
    </View>
  )
}