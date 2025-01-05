import { View, Text, TouchableOpacity, Button, SafeAreaView } from 'react-native'
import React, { useRef, useState} from 'react'

import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ScreenStyles from '../screen/screenStyle';




export default function Header() {
  

   
  return (
    <SafeAreaView style={ScreenStyles.dashboard}>
      <View style={ScreenStyles.dashboard_header}>
         
        <Text style={ScreenStyles.dashboard_title}>Dashboard</Text>
       <View style={ScreenStyles.dashboard_icon_container}>
       <TouchableOpacity style={ScreenStyles.dashboard_icon}><AntDesign name="search1" size={24} color="black" /></TouchableOpacity>
        <TouchableOpacity style={ScreenStyles.dashboard_icon}><Ionicons name="notifications-outline" size={24} color="black" /></TouchableOpacity>
        <TouchableOpacity style={ScreenStyles.dashboard_icon}><FontAwesome name="user-circle-o" size={24} color="black" /></TouchableOpacity>
       </View>
      </View>

    
     
    </SafeAreaView>
  )
}