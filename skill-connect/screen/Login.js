import {
  View,
  Text,
  
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import ScreenStyles from "./screenStyle";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    axios
      .post("http://192.168.1.153:5000/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
       if (response.data.status === "ok") {
          Alert.alert("Success", "You have successfully logged in");
          AsyncStorage.setItem("token", response.data.data);
          AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
          navigation.navigate("Dashboard");
        } else {
          Alert.alert("Error", "Invalid email or password");
        }
          
      
      })  
      .catch((error) => {
        console.log(error);
      });
      
      
    
  };
  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <View style={ScreenStyles.login}>
      <Text style={ScreenStyles.login_title}>Login</Text>
      <Image
        style={ScreenStyles.login_logo}
        source={require("../assets/img/logo.jpg")}
      />
     
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        style={ScreenStyles.login_input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        style={ScreenStyles.login_input}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
   <Text  style={ScreenStyles.login_forgot}>Forgot Password?</Text>
   
   <TouchableOpacity onPress={handleLogin}>
   <Text style={ScreenStyles.login_button}>Login </Text>
   </TouchableOpacity>

      <TouchableOpacity style={ScreenStyles.googleButton}>
        <Image
          style={ScreenStyles.googleIcon}
          source={require("../assets/img/google.png")}
        />
       <Text style={ScreenStyles.googleText}>Continue with Google</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={ScreenStyles.login_account}>Don't have an account <Text style={ScreenStyles.login_signup}>Register</Text></Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

export default Login;
