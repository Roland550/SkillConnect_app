import React from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Linking, Alert,  } from 'react-native';
import  FileViewer from "react-native-file-viewer";

const CardDetail = ({ route }) => {


  const { user } = route.params;

  const card = user;

  const handlePDFPress = async (pdfUrl) =>{
    
  
   
  }
  return (
    <View style={styles.container}>
      <Image source={{ uri: card.image }} style={styles.image} />
      <Text style={styles.title}>{card.name}</Text>
      <Text style={styles.experience}>{card.experience}</Text>
      <Text style={styles.experience}>{card.location}</Text>
      <Text style={styles.description}>{card.about}</Text>
     
      <Text style={styles.description}>{card.contact}</Text>
      <TouchableOpacity onPress={() => handlePDFPress(user.cv)}>
        <Text >CV</Text>
      </TouchableOpacity>

      <Button title="Mail_me" onPress={() => Linking.openURL(`mailto:${card.email}`)} />
       <Button title="Call" onPress={() => Linking.openURL(`tel:${card.contact}`)} /> 
       
        <Button title="Location" onPress={() => Linking.openURL(`geo:${card.location}`)} />
      
    </View>
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