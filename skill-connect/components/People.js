import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import axios from 'axios';
import { ComponentStyles } from "./Styles";

const People = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        console.log(`Fetching notifications for userId: ${userId}`);
        const response = await axios.get(`http://192.168.1.153:5000/user/notifications/${userId}`);
        console.log('Response0:', response.data.notifications);
        if (response.data.data.success===true) {
          setNotifications(response.data.notifications);
        } else {
          Alert.alert('Error', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        Alert.alert('Error', 'Failed to fetch notifications');
      }
    };

    if(userId){
      fetchNotifications();
    }
  }, [userId]);
  const renderItem = ({ item }) => (
    <View style={ComponentStyles.notificationItem}>
      <Text style={ComponentStyles.notificationMessage}>{item.message}</Text>
      <Text style={ComponentStyles.notificationDate}>{new Date(item.date).toLocaleString()}</Text>
    </View>
  );
  return (
    // <View style={ComponentStyles.messages}>
    //   <View style={ComponentStyles.messages_content}>
    //     <View style={ComponentStyles.messages_content_image}>
    //       <Text>People</Text>
    //     </View>
    //     <View>
    //       <Text style={ComponentStyles.messages_content_title}>Title</Text>
    //       <Text style={ComponentStyles.messages_content_text}>
    //         4 c’était la journée mondiale des enseignants nous avons organisé
    //         ici au Musée National une cérémonie de réjouissance à l’occasion de
    //         la fête des enseignants sous le thème : valorisons la voix des
    //         enseignants vers un nouveau contrat social par l’éducation
    //       </Text>
    //     </View>
    //   </View>

    //   <View style={ComponentStyles.messages_content}>
    //     <View style={ComponentStyles.messages_content_image}>
    //       <Text>People</Text>
    //     </View>
    //     <View>
    //       <Text style={ComponentStyles.messages_content_title}>Title</Text>
    //       <Text style={ComponentStyles.messages_content_text}>
    //         4 c’était la journée mondiale des enseignants nous avons organisé
    //         ici au Musée National une cérémonie de réjouissance à l’occasion de
    //         la fête des enseignants sous le thème : valorisons la voix des
    //         enseignants vers un nouveau contrat social par l’éducation
    //       </Text>
    //     </View>
    //   </View>
    // </View>
    <View style={ComponentStyles.container}>
    {notifications.length > 0 ? (
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    ) : (
      <Text>No notifications available right now</Text>
    )}
  </View>
  );
};

export default People;
