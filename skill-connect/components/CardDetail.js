import React from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Linking, Alert, ScrollView,  } from 'react-native';
import  FileViewer from "react-native-file-viewer";
import { ComponentStyles } from './Styles';


const CardDetail = ({ route }) => {


  const { user } = route.params;

  const card = user;

  const handlePDFPress = async (pdfUrl) =>{
    
  
   
  }
  return (
    <ScrollView style={ComponentStyles.container00}>
    <View style={ComponentStyles.profileHeader}>
      <Image source={{ uri: card.image }} style={ComponentStyles.profileImage} />
      
    </View>
    <View style={ComponentStyles.profileInfo}>
        <Text style={ComponentStyles.profileName}>{card.name}</Text>
        
       
      </View>
    <View style={ComponentStyles.profileDetails}>
    <Text style={ComponentStyles.profileSectionTitle}>About me</Text>
      <Text style={ComponentStyles.profileDescription}>{card.about}</Text>
      <Text style={ComponentStyles.profileOccupation}>Occcupation: {card.occupation}</Text>
        <Text style={ComponentStyles.profileOccupation}>Email: {card.email}</Text>
      <Text style={ComponentStyles.profileDescription}>Location:{card.location}</Text>
      
      <Text style={ComponentStyles.profileContact}>Contact: {card.contact}</Text>
      <Text style={ComponentStyles.profileExperience}>{card.experience} years of experience</Text>
      <Text style={ComponentStyles.profileDescription}>{card.description}</Text>
      <Button title="View Resume" onPress={() => Linking.openURL(card.cv)} />
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  experience: {
    fontSize: 18,
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default CardDetail;