import {
  View,
  Text,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ComponentStyles } from "./Styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const ApplyAccountForm = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const [document, setDocument] = useState(null);
  const [documentCV, setDocumentCV] = useState(null);
  const [documentCertificate, setDocumentCertificate] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const onDocumentPress = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      console.log("Document picker response:", res);
      if (!res.canceled && res.assets && res.assets.length > 0) {
        const selectedDocument = res.assets[0];
        setDocument(selectedDocument);
        console.log(
          "Document selected:",
          selectedDocument.uri,
          selectedDocument.type,
          selectedDocument.name,
          selectedDocument.size
        );
      } else {
        console.log("Document selection was cancelled");
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled the picker");
      } else {
        console.error("Unknown error:", err);
      }
    }
  };
  const onDocumentCVPress = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      console.log("Document picker response:", res);
      if (!res.canceled && res.assets && res.assets.length > 0) {
        const selectedDocument = res.assets[0];
        setDocumentCV(selectedDocument);
        console.log(
          "Document selected:",
          selectedDocument.uri,
          selectedDocument.type,
          selectedDocument.name,
          selectedDocument.size
        );
      } else {
        console.log("Document selection was cancelled");
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled the picker");
      } else {
        console.error("Unknown error:", err);
      }
    }
  };
  const onDocumentCertificatePress = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      console.log("Document picker response:", res);
      if (!res.canceled && res.assets && res.assets.length > 0) {
        const selectedDocument = res.assets[0];
        setDocumentCertificate(selectedDocument);
        console.log(
          "Document selected:",
          selectedDocument.uri,
          selectedDocument.type,
          selectedDocument.name,
          selectedDocument.size
        );
      } else {
        console.log("Document selection was cancelled");
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled the picker");
      } else {
        console.error("Unknown error:", err);
      }
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("contact", phone);
    formData.append("location", location);
    formData.append("occupation", occupation);
    formData.append("experience", experience);
    formData.append("about", bio);
    formData.append("image", profileImage);

    if (document) {
      formData.append("cv", {
        uri: document.uri,
        type: documentCV.mimeType || "application/octet-stream",
        name: document.name,
      });
    }

    if (documentCV) {
      formData.append("certificate", {
        uri: documentCV.uri,
        type: documentCV.mimeType || "application/octet-stream",
        name: documentCV.name,
      });
    }

    if (documentCertificate) {
      formData.append("birthdate", {
        uri: documentCertificate.uri,
        type: documentCV.mimeType || "application/octet-stream",
        name: documentCertificate.name,
      });
    }

    try {
      const response = await axios({
        method: "post",
        url: "http://192.168.1.153:5000/fileupload",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data.success) {
        Alert.alert("Error", response.data.message);
        return;
      }
      console.table("Application response:", response.data);
      if (response.data.success) {
        Alert.alert(
          "Application Submitted",
          "Your application has been submitted successfully. We will get back to you soon."
        );
        navigation.goBack();
        // Reset the form fields and file buttons
        setName("");
        setEmail("");
        setPhone("");
        setLocation("");
        setOccupation("");
        setExperience("");
        setBio("");
        setDocument(null);
        setDocumentCV(null);
        setDocumentCertificate(null);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Response error:", error.response.data);
        Alert.alert(
          "Error",
          `Server Error: ${error.response.status} - ${
            error.response.data.message || "Unknown error"
          }`
        );
      } else if (error.request) {
        // Request made but no response received
        console.error("No response:", error.request);
        Alert.alert(
          "Error",
          "No response received from the server. Check the server or network connectivity."
        );
      } else {
        // Error setting up the request
        console.error("Error setting up request:", error.message);
        Alert.alert("Error", `Network Error: ${error.message}`);
      }
      console.error("Detailed error config:", error.config);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={ComponentStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        
        style={ComponentStyles.container}
      >
        <ScrollView
          contentContainerStyle={ComponentStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={ComponentStyles.title}>Apply for an Account</Text>

          <TouchableOpacity onPress={pickImage}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("../assets/img/logo.jpg")
              }
              style={ComponentStyles.apply_account_form_image}
              resizeMode="cover"
            />
          </TouchableOpacity>

          <TextInput
            placeholder="Full Name"
            style={ComponentStyles.input}
            keyboardType="default"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            style={ComponentStyles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Occupation"
            keyboardType="default"
            style={ComponentStyles.input}
            value={occupation}
            onChangeText={(text) => setOccupation(text)}
          />
          <TextInput
            placeholder="Experience(s)"
            keyboardType="default"
            style={ComponentStyles.input}
            value={experience}
            onChangeText={(text) => setExperience(text)}
          />

          <TextInput
            placeholder="Location"
            keyboardType="default"
            style={ComponentStyles.input}
            value={location}
            onChangeText={(text) => setLocation(text)}
          />
          <TextInput
            placeholder="Phone Number"
            keyboardType="phone-pad"
            style={ComponentStyles.input}
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
          <TextInput
            placeholder="Bio"
            keyboardType="default"
            style={ComponentStyles.input}
            value={bio}
            onChangeText={(text) => setBio(text)}
          />

          <View style={ComponentStyles.apply_account_form_cv}>
            <TouchableOpacity
              style={ComponentStyles.apply_account_form_cv_button}
              onPress={onDocumentPress}
            >
              <Text style={ComponentStyles.apply_account_form_cv_text}>CV</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={ComponentStyles.apply_account_form_cv_button}
              onPress={onDocumentCertificatePress}
            >
              <Text style={ComponentStyles.apply_account_form_cv_text}>
                {" "}
                Certificate
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={ComponentStyles.apply_account_form_cv_button}
              onPress={onDocumentCVPress}
            >
              <Text style={ComponentStyles.apply_account_form_cv_text}>
                Birth Certificate
              </Text>
            </TouchableOpacity>
          </View>

          {document && (
            <View style={ComponentStyles.documentInfo}>
              <Text>
                <MaterialCommunityIcons
                  name="attachment"
                  size={24}
                  color="red"
                />{" "}
                {document.name}
              </Text>
            </View>
          )}

          {documentCV && (
            <View style={ComponentStyles.documentInfo}>
              <Text>
                <MaterialCommunityIcons
                  name="attachment"
                  size={24}
                  color="orange"
                />{" "}
                {documentCV.name}
              </Text>
            </View>
          )}

          {documentCertificate && (
            <View style={ComponentStyles.documentInfo}>
              <Text>
                <MaterialCommunityIcons
                  name="attachment"
                  size={24}
                  color="green"
                />{" "}
                {documentCertificate.name}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={ComponentStyles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={ComponentStyles.submitButtonText}>
              Submit Application
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ApplyAccountForm;
