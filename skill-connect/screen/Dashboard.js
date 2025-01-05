import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@react-navigation/elements";

import React, { useRef, useState, useEffect } from "react";
import ScreenStyles from "./screenStyle";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Animated from "react-native-reanimated";
import axios from "axios";


export default function Dashboard() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  // const cardData = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     experience: "5 years",
  //     image: require("../assets/img/logo.jpg"),
  //     description: "Experienced electrician with 5 years of experience.",
  //     contact: "john.doe@example.com",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     experience: "3 years",
  //     image: require("../assets/img/logo.jpg"),
  //     description: "Professional painter with 3 years of experience.",
  //     contact: "jane.smith@example.com",
  //   },
  //   {
  //     id: 3,
  //     name: "Jane COoler",
  //     experience: "3 years",
  //     image: require("../assets/img/logo.jpg"),
  //     description: "Professional painter with 3 years of experience.",
  //     contact: "jane.smith@example.com",
  //   },
  //   // Add more card data as needed
  // ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://192.168.1.153:5000/getAllSkilledPersons');
        

        

        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  // useEffect(() => {
  //   console.log("Users state changed",users);
  // },[users]);
  const handleCardPress = (user) => {
    navigation.navigate("CardDetail", { user });
  };
  
  
  return (
    <SafeAreaView style={ScreenStyles.dashboard} edges={["right", "left"]}>
      <View style={ScreenStyles.dashboard_header}>
        <Text style={ScreenStyles.dashboard_title}>Dashboard</Text>
        <View style={ScreenStyles.dashboard_icon_container}>
          <TouchableOpacity style={ScreenStyles.dashboard_icon}>
            <AntDesign name="search1" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={ScreenStyles.dashboard_icon}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={ScreenStyles.dashboard_icon}>
            <FontAwesome name="user-circle-o" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={ScreenStyles.dashboard_category}>
        <ScrollView
          horizontal={true}
          disableScrollViewPanResponder={true}
          showsHorizontalScrollIndicator={false}
        >
          <Text style={ScreenStyles.dashboard_category_text}>All</Text>
          <Text style={ScreenStyles.dashboard_category_text}>Teachers</Text>
          <Text style={ScreenStyles.dashboard_category_text}>Painters</Text>

          <Text style={ScreenStyles.dashboard_category_text}>Electricians</Text>
          <Text style={ScreenStyles.dashboard_category_text}>Plumbers</Text>
          <Text style={ScreenStyles.dashboard_category_text}>Plumbers</Text>
          <Text style={ScreenStyles.dashboard_category_text}>Plumbers</Text>
          <Text style={ScreenStyles.dashboard_category_text}>Plumbers</Text>
          <Text style={ScreenStyles.dashboard_category_text}>Plumbers</Text>
          <AntDesign name="down" size={24} color="black" />
        </ScrollView>
      </View>

      <ScrollView disableScrollViewPanResponder={false} showsVerticalScrollIndicator={false}>
        <View style={ScreenStyles.dashboard_card_container}>
          {Array.isArray(users)  && users.length > 0 ?
            users.map((user) => (
            <TouchableOpacity
              key={user._id || user.id}
              style={ScreenStyles.dashboard_card}
              onPress={() => handleCardPress(user)}
            >
              <Animated.Image
                source={{ uri: user.image }}
                style={ScreenStyles.dashboard_card_image}
                resizeMode="cover"
                onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
              />
              <Text style={ScreenStyles.dashboard_card_title}>{user.name}</Text>

              <Text style={ScreenStyles.dashboard_card_experience}>
                <Text style={ScreenStyles.dashboard_card_experience_logo}>
                  E
                </Text>
                <Text style={ScreenStyles.dashboard_card_experience_logo2}>
                  xpr.
                </Text>
                {user.experience}
              </Text>
            </TouchableOpacity>
          )):(
            <Text>No users found</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
