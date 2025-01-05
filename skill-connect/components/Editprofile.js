import {
  View,
  Text,
  TouchableOpacity,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
  BackHandler,
  Alert,
  TextInput,
  ActivityIndicator
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ScreenStyles from "../screen/screenStyle";
import { ComponentStyles } from "./Styles";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import Octicons from "@expo/vector-icons/Octicons";



export default function Editprofile() {
  const navigation = useNavigation();
  const route = useRoute();
  const { data, onImageUpdate } = route.params;
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);
  
  

 

  useEffect(() => {
    const userData = route.params.data || {};
    setName(userData.name || '');
    setEmail(userData.email || '');
    setProfileImage(userData.image || null);
  }, [route.params?.userData]);

  const EditpickImage = async () => {
    try {
        console.log("Image picker triggered");
        setLoading(true);
        // Request permission to access the image library
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
          setLoading(false);
          return;
        }
  
        // Launch the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
  
        console.log(result);
  
        if (!result.canceled) {
          console.log("result",result.assets[0].uri);
          setProfileImage(result.assets[0].uri);
          onImageUpdate(result.assets[0].uri);
        }else{
            console.log("Image picker canceled");
            
        }
      } catch (error) {
        console.error('Error opening image picker:', error);
        Alert.alert('Error', 'Failed to open image picker');
      } finally {
        setLoading(false);
      }
  };

  const updateProfile = async () => {
    const formData = {
      name: name,
      email: email,
      image: profileImage,
    };
    axios
      .post("http://192.168.1.153:5000/updateuser", formData)
      .then((response) => {
        console.log(response.data);
        Alert.alert('Success', 'Profile updated successfully');
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Error', 'Failed to update profile');
      });
  };

  

  return (
    <SafeAreaView style={ComponentStyles.editprofil}>
      <View >
        <View style={ComponentStyles.editprofile_contnt_image}>
        <FontAwesome5
            name="user-edit"
            size={24}
            color="#d1dded"
            style={ComponentStyles.profile_icon}
            onPress={() => navigation.navigate("editPro")}
          />
          <TouchableOpacity onPress={EditpickImage}>
          {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Image
                source={profileImage ? { uri: profileImage } : require("../assets/img/logo.jpg")}
                style={ComponentStyles.profile_image}
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
        </View>
        <ScrollView>
         <View style={ComponentStyles.editprofile_content}>
         <TextInput
            style={ComponentStyles.editprofile_title}
            placeholder="Name"
            onChange={(e) => setName(e.nativeEvent.text)}
            defaultValue={name}

          />
          <TextInput style={ComponentStyles.editprofile_input} placeholder="Email"
          editable={false}
          onChange={(e) => setEmail(e.nativeEvent.text)}
            defaultValue={email}
           />

          <TextInput
            style={ComponentStyles.editprofile_input}
            placeholder="Phone"
            onChange={(e) => setPhone(e.nativeEvent.text)}
          />

          <TextInput
            style={ComponentStyles.editprofile_input}
            placeholder="Address"
            onChange={(e) => setAddress(e.nativeEvent.text)}
          />

          <TextInput
            style={ComponentStyles.editprofile_input}
            placeholder="Location"
            onChange={(e) => setSkills(e.nativeEvent.text)}
          />
         </View>
        </ScrollView>
        <TouchableOpacity style={ComponentStyles.button} onPress={updateProfile}>
        <Text style={ComponentStyles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
        <TouchableOpacity style={ComponentStyles.button} onPress={EditpickImage}>
        <Text style={ComponentStyles.buttonText}>Update Image</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
