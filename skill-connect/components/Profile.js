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
} from "react-native";
import React, { useRef, useState, useEffect } from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ScreenStyles from "../screen/screenStyle";
import { ComponentStyles } from "./Styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import Octicons from "@expo/vector-icons/Octicons";
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState("");
  const [profileImage, setProfileImage] = useState(null);


  useEffect(() => {
    const getData = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
      axios
        .post("http://192.168.1.153:5000/getuser", { token: token })
        .then((response) => {
          console.log("Response:", response.data);
          setUserData(response.data.data);
          setProfileImage(response.data.data.image || null);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getData();
  }, []);

  const handleImageUpdate = (newImage) => {
    setProfileImage(newImage);
  };
 

  function signOut() {
    AsyncStorage.setItem("isLoggedIn", "");
    AsyncStorage.setItem("token", "");
    navigation.navigate("Login");
  }

  const handleBackPress = () => {
    Alert.alert("Exit App", "Are you sure you want to exit?", [
      {
        text: "No",
        onPress: () => null,
        style: "cancel",
      },
      { text: "Yes", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
   
  }

  //SelectPhoto
  // const pickImage = async () => {
  //   // Request permission to access the image library
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status !== 'granted') {
  //     Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
  //     return;
  //   }

  //   // Launch the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.canceled) {
  //     setProfileImage(result.assets[0].uri);
  //   }
  // };




  useFocusEffect(
    React.useCallback(() => {
      
      BackHandler.addEventListener("hardwareBackPress",handleBackPress )

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      };
  })
  );

  

  return (
    <SafeAreaView style={ComponentStyles.profile}>
      <View style={ScreenStyles.profile_content}>
        <View style={ComponentStyles.profile_content_image}>
          <FontAwesome5
            name="user-edit"
            size={24}
            color="#d1dded"
            style={ComponentStyles.profile_icon}
            onPress={() => navigation.navigate("editPro", { data: userData, onImageUpdate: handleImageUpdate })}
          />
         <TouchableOpacity >
         
          <Image
            source={profileImage ? { uri: profileImage } : require("../assets/img/logo.jpg")}
            style={ComponentStyles.profile_image}
            resizeMode="cover"
          />
        
         </TouchableOpacity>
        </View>
        <ScrollView>
          <Text style={ComponentStyles.profile_title}>{userData ? userData.name : "Guest"}</Text>
          <Text style={ComponentStyles.profile_text}>
            {" "}
            <Fontisto name="email" size={24} color="black" /> {userData ? userData.email : "guest@example.com"}
          </Text>
          <Text style={ComponentStyles.profile_text}>
            <AntDesign name="profile" size={24} color="black" /> 123-456-7890
          </Text>
          <Text style={ComponentStyles.profile_text}>
            <Feather name="phone" size={24} color="black" /> 123 Main Street,
            Anytown, USA
          </Text>
          <Text style={ComponentStyles.profile_text}>
            <Entypo name="location-pin" size={24} color="black" />
            Skills: Web Development, Mobile App Development
          </Text>
          <Button
            title="Apply for Skilled Profile"
            onPress={() => navigation.navigate("Apply")}
          />

          <TouchableOpacity
            style={ComponentStyles.profile_text}
            onPress={signOut}
          >
            <Octicons name="sign-out" size={24} color="black" />
            <Text>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
