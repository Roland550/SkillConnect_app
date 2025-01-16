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
import io from "socket.io-client";
import { Picker } from "@react-native-picker/picker";

export default function Dashboard() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [filteredData, setFilteredData] = useState([]);
 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.153:5000/getAllSkilledPersons"
        );
         const acceptedUsers = response.data.data.filter(user => user.isAccepted)
        setUsers(acceptedUsers);
        setFilteredData(acceptedUsers);
        const uniqueCategories = [
          "All",
          ...new Set(acceptedUsers.map((user) => user.occupation)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    fetchUsers();
    const socket = io("http://192.168.1.153:5000");
    socket.on("userUpdated", (updatedUser) => {
      if (updatedUser.isAccepted) {
        setUsers((prevUsers) => {
          const newUsers = prevUsers.map(user => user._id === updatedUser.userId ? { ...user, isAccepted: updatedUser.isAccepted } : user);
          return newUsers;
        });
        if (selectedCategory === "All" || updatedUser.occupation === selectedCategory) {
          setFilteredData((prevData) => {
            const newData = prevData.map(user => user._id === updatedUser.userId ? { ...user, isAccepted: updatedUser.isAccepted } : user);
            return newData;
          });
        }
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [selectedCategory]);

  useEffect(() => {
    // Filter users based on selected category
    if (selectedCategory === "All") {
      setFilteredData(users);
    } else {
      const filtered = users.filter(
        (user) => user.occupation === selectedCategory
      );
      setFilteredData(filtered);
      console.log(filtered);
    }
  }, [selectedCategory, users]);
  const handleCardPress = (user) => {
    navigation.navigate("CardDetail", { user });
  };

  return (
    <SafeAreaView style={ScreenStyles.dashboard} edges={["right", "left"]}>
      <View style={ScreenStyles.dashboard_header}>
        <Text style={ScreenStyles.dashboard_title}>SK</Text>
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

      {/* <Picker
        selectedValue={selectedCategory}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
      >
        {Array.isArray(categories) &&
          categories.map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
      </Picker> */}
      <ScrollView
              horizontal={true}
              disableScrollViewPanResponder={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
              }}
              style={ScreenStyles.dashboard_category}
            >  
        {Array.isArray(categories) &&
          categories.map((category) => (
            
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  ScreenStyles.dashboard_category_text,
                  selectedCategory === category && ScreenStyles.selectedCategoryText,
                ]}
              >
                <Text
                  style={
                    selectedCategory === category
                      ? ScreenStyles.selectedCategory
                      : ScreenStyles.category
                  }
                >
                  {category}
                </Text>
              </TouchableOpacity>
            
          ))}
          </ScrollView>
      
      <ScrollView
        disableScrollViewPanResponder={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={ScreenStyles.dashboard_card_container}>
          {Array.isArray(filteredData) && filteredData.length > 0 ? (
            filteredData.map((user) => (
              <TouchableOpacity
                key={user._id || user.id}
                style={ScreenStyles.dashboard_card}
                onPress={() => handleCardPress(user)}
              >
                <Animated.Image
                  source={{ uri: user.image }}
                  style={ScreenStyles.dashboard_card_image}
                  resizeMode="cover"
                  onError={(e) =>
                    console.log("Image load error:", e.nativeEvent.error)
                  }
                />
                <Text style={ScreenStyles.dashboard_card_title}>
                  {user.name}
                </Text>
                 
                 <Text style={ScreenStyles.dashboard_card_occupation}>
                  {user.occupation}
                </Text>
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
            ))
          ) : (
            <Text>No users found</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
