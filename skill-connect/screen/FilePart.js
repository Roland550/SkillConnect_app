import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const FilePreviewer = () => {
  const [fileName, setFileName] = useState(null);
  const [fileUri, setFileUri] = useState(null);

  const handleFileSelection = async () => {
    try {
      // Open document picker allowing only PDF files
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // MIME type for PDF
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        setFileName(result.name);
        setFileUri(result.uri);
        Alert.alert('File Selected', `Name: ${result.name}`);
      } else if (result.type === 'cancel') {
        // User cancelled the file selection
        Alert.alert('Cancelled', 'No file was selected.');
      }
    } catch (error) {
      console.error('Error picking file:', error);
      Alert.alert('Error', 'An error occurred while picking the file.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Select PDF File" onPress={handleFileSelection} />
      {fileName && <Text style={styles.fileInfo}>Selected File: {fileName}</Text>}

      {!fileName && (
        <Text style={styles.fileInfo}>No file selected. Please choose a PDF file.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  fileInfo: {
    marginVertical: 10,
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});

export default FilePreviewer;
