// Only import react-native-gesture-handler on native platforms
import "react-native-gesture-handler";
import { View, Text, StyleSheet } from "react-native";
import React , { useState, useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import Login from "../screen/Login";
import SignUp from "../screen/SignUp";
import Dashboard from "../screen/Dashboard";
import Profile from "../components/Profile";
import People from "../components/People";

import ApplyAccountForm from "../components/ApplyAccountForm";
import CardDetail from "../components/CardDetail";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Editprofile from "../components/Editprofile";
import Messages from "../components/Messages";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",

          height: 60,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        initialParams={{ screen: "Dashboard" }}
        options={{
          headerShown: false,
          
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Ionicons
                name="home"
                size={24}
                color={focused ? "#3684bd" : "#221f1f"}
              />
              <Text
                style={{ color: focused ? "#3684bd" : "#221f1f", fontSize: 10 }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="People"
        component={People}
        initialParams={{ screen: "people" }}
        options={{
          headerShown: false,
          showLabel: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <MaterialCommunityIcons
                name="message-text-outline"
                size={24}
                color={focused ? "#3684bd" : "#221f1f"}
              />
              <Text
                style={{ color: focused ? "#3684bd" : "#221f1f", fontSize: 10, textAlign: "center", width: 50 }} 
              >
                Messagers
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="jobs"
        component={ApplyAccountForm}
        initialParams={{ screen: "Profile" }}
        options={{
          headerShown: false,
          showLabel: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <MaterialIcons
                name="people-outline"
                size={25}
                color={focused ? "#3684bd" : "#221f1f"}
              />
              <Text
                style={{ color: focused ? "#3684bd" : "#221f1f", fontSize: 10, textAlign: "center", width: 50 }}
              >
                Jobs
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{ screen: "Profile" }}
        options={{
          headerShown: false,
          showLabel: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Ionicons
                name="settings-outline"
                size={25}
                color={focused ? "#3684bd" : "#221f1f"}
              />
              <Text
                style={{ color: focused ? "#3684bd" : "#221f1f", fontSize: 10, textAlign: "center", width: 50 }}
              >
                Settings
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function StackNavigator() {

  return (
    <Stack.Navigator
      >
      <Stack.Screen
        name="Dashboard"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      
      
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="messages"
        component={Messages}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={Login} />
       <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen
        name="People"
        component={People}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Apply"
        component={ApplyAccountForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CardDetail"
        component={CardDetail}
        options={{
          headerShown: true,
          title: "",
          headerTransparent: true,
          headerTintColor: "#221f1f",
        }}
      />
      <Stack.Screen name='editPro' component={Editprofile}
        options={{
          headerShown: true,
          title: "",
          headerTransparent: true,
          headerTintColor: "#221f1f",
        }}
       />
    </Stack.Navigator>
  );
}



function  AuthStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Dashboard"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name='editPro' component={Editprofile}
        options={{
          headerShown: true,
          title: "",
          headerTransparent: true,
          headerTintColor: "#221f1f",
        }}
       />
    </Stack.Navigator>
  );
}
export default function RootStack() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigationRef = useRef();
  async function getData(){
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log(data, "at dash.js");
    
    setIsLoggedIn(data === 'true');
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <NavigationContainer
    ref={navigationRef}
      onReady={() => {
        // Perform any actions that need to be done once the navigator is ready
        console.log('Navigator is ready');
      }}
    >
      {isLoggedIn ? <StackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
