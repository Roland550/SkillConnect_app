import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Pressable, Alert } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import ScreenStyles from './screenStyle';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';









const SignUp = () => {
  
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
 
const navigation = useNavigation();
 
  const validateName = (text) => {
    setName(text);
    if (text.length < 2) {
      setNameError('Name must be at least 2 characters long');
    } else {
      setNameError('');
    }
  };

  const validateEmail = (text) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (text) => {
    setPassword(text);
    if (text.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = (text) => {
    setConfirmPassword(text);
    if (text !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  function handleSignUp() {

     axios.post('http://192.168.1.153:5000/register', {
      name: name,
      email: email, 
      password: password,
      
    })
    .then(response => {
      console.log(response.data);
      Alert.alert('Success', 'You have successfully signed up');
      navigation.navigate('Login');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setNameError('');
      setEmailError('');
      setPasswordError('');
      setConfirmPasswordError('');

    })
    .catch(error => {
      console.error(error);
    });

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    
  }

  
  return (
    <View style={ScreenStyles.login}>
    <Text style={ScreenStyles.login_title}>Welcome to Skill Connect</Text>
    <Text style={ScreenStyles.login_subtitle}>
      Don't miss this opportunity to easily find your dream Skill Expert people here
    </Text>
    
    <View style={ScreenStyles.inputContainer}>
      <TextInput
        placeholder="Name"
        autoCapitalize="none"
        autoCorrect={false}
        style={ScreenStyles.login_input}
        value={name}
        onChangeText={validateName}
      />
      { name . length >0 && (
      nameError ? (
        <Ionicons name="close-circle" size={15} color="red" style={ScreenStyles.inputIcon} />
      ) : (
        <Ionicons name="checkmark-circle" size={15} color="green" style={ScreenStyles.inputIcon} />
      )
    )}
    </View>
    {name .length >0 && nameError ? <Text style={ScreenStyles.errorText}>{nameError}</Text> : null}
    
    <View style={ScreenStyles.inputContainer}>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        style={ScreenStyles.login_input}
        value={email}
        onChangeText={validateEmail}
      />
      { email . length >0 && (
      emailError ? (
        <Ionicons name="close-circle" size={15} color="red" style={ScreenStyles.inputIcon} />
      ) : (
        <Ionicons name="checkmark-circle" size={15} color="green" style={ScreenStyles.inputIcon} />
      )
    )}
    </View>
    { email . length >0 && emailError ? <Text style={ScreenStyles.errorText}>{emailError}</Text> : null}
    
    <View style={ScreenStyles.inputContainer}>
      <TextInput
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        style={ScreenStyles.login_input}
        value={password}
        onChangeText={validatePassword}
      />
      { password . length >0 && (
        
      
       passwordError ? (
        <Ionicons name="close-circle" size={15} color="red" style={ScreenStyles.inputIcon} />
      ) : (
        <Ionicons name="checkmark-circle" size={15} color="green" style={ScreenStyles.inputIcon} />
      )
    )}
    </View>
    { password . length >0 && passwordError ? <Text style={ScreenStyles.errorText}>{passwordError}</Text> : null}
    
    <View style={ScreenStyles.inputContainer}>
      <TextInput
        placeholder="Confirm Password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        style={ScreenStyles.login_input}
        value={confirmPassword}
        onChangeText={validateConfirmPassword}
      />
      { confirmPassword . length >0 && (
      confirmPasswordError ? (
        <Ionicons name="close-circle" size={15} color="red" style={ScreenStyles.inputIcon} />
      ) : (
        <Ionicons name="checkmark-circle" size={15} color="green" style={ScreenStyles.inputIcon} />
      )
    )}
    </View>
    { confirmPassword . length >0 && confirmPasswordError ? <Text style={ScreenStyles.errorText}>{confirmPasswordError}</Text> : null}
    
    
    
    <TouchableOpacity style={ScreenStyles.googleButton}>
      <Image
        style={ScreenStyles.googleIcon}
        source={require("../assets/img/google.png")}
      />
      <Text style={ScreenStyles.googleText}>Continue with Google</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={handleSignUp}>
    <Text style={ScreenStyles.login_button}>Sign up</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
      <Text style={ScreenStyles.login_account}>Login</Text>
    </TouchableOpacity>
  </View>
  );
};

export default SignUp;
