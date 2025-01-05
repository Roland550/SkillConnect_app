import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const ComponentStyles = StyleSheet.create({
    
    //Profile
    profile: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f1",
      marginTop: 40,
    },
    profile_content : {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f1",
    },
    profile_content_image: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",  
      backgroundColor: "#758ba5",
     
    },
    profile_icon: {
     
      
     
      alignItems: "flex-end",
      textAlign: "right",
      alignSelf: "flex-end",
      marginRight: 15,
      marginBottom: 20,
    },
    profile_image: {
        width: 200,
        height: 200,
        resizeMode: "contain",
        borderWidth: 10,
        borderColor: "#ddd",
        borderRadius: 100,
        alignSelf: "center",
       
        marginBottom: -80,
      },
    profile_title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#221f1f",
      marginVertical: 10,
      textAlign: "center",
      marginTop: 80,
    },
    profile_text: {
      fontSize: 15,
      fontWeight: "normal",
      color: "#221f1f",
      
      textAlign: "left",
      marginVertical: 10,
      marginHorizontal: 20,
      borderBottomColor: "#ddd",
      borderBottomWidth: 1,
    },
    //Editprofile
    editprofile: {
      
      
      
    
    },
    editprofile_content : {
     
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    
      marginTop: 50,
    },
    editprofile_content_image: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center", 
      backgroundColor: "#758ba5",
      marginTop: 50, 
      
     
    },
    editprofile_title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#221f1f",
      marginVertical: 10,
      textAlign: "center",
      marginTop: 60,

    },
    editprofile_input: {
      width: "100%",
      fontSize: 15,
      fontWeight: "normal",
      color: "#221f1f",
      
      textAlign: "left",
      marginVertical: 10,
      
      borderBottomColor: "#ddd",
      borderBottomWidth: 1,
    },

    //ApplyAccountForm
    apply_account_form: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f1",
      marginTop: 70,
    },
    apply_account_form_title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#221f1f",
      marginVertical: 10,
      textAlign: "center",
    },
    apply_account_form_content_image: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",  
      margin: 20,
      
     
    },
    apply_account_form_image: {
      width: 200,
      height: 200,
      resizeMode: "contain",
      borderWidth: 10,
      borderColor: "#ddd",
      borderRadius: 100,
      alignSelf: "center",
      marginBottom: 20,
     
      
    },
    apply_account_form_input: {
      width: 350,
      fontSize: 15,
      fontWeight: "normal",
      color: "#221f1f",
      marginVertical: 10,  
      borderWidth: 1,
      borderColor: "#c5c5c5",
      borderRadius: 5,
      backgroundColor: "#f5f5f1",
      paddingLeft: 10,
    },
    login_button: {
      width: 350,
      fontSize: 15,
      flexDirection: "row",
      fontWeight: "bold",
      color: "#f5f5f1",
      alignSelf: "center",
      textAlign: "center",
      borderRadius: 5,
      backgroundColor: "#221f1f",
      padding: 10,
      margin: 10,
    },
    apply_account_form_button: {
      width: 350,
      fontSize: 15,
      flexDirection: "row",
      fontWeight: "bold",
      color: "#f5f5f1",
      
      
      borderRadius: 5,
      backgroundColor: "#221f1f",
      padding: 10,
      margin: 10,
    },
    apply_account_form_button_text: {
      fontSize: 15,
      fontWeight: "normal",
      color: "#f5f5f1",
      textAlign: "center",
    },
    apply_account_form_cv: {
      width: "100%",
      height: 100,
      
      flexDirection: "row",
      fontWeight: "bold",
      color: "#221f1f",
      borderWidth:2,
      borderStyle: "dashed",
      justifyContent: "space-between",
      alignItems: "center",

      borderColor: "#c5c5c5",
      
      borderRadius: 5,
      backgroundColor: "#fff",
      
      marginVertical: 10, 
      paddingHorizontal: 10,
    },
    apply_account_form_cv_button: {
      
      fontWeight: "bold",
      color: "#221f1f",
      borderWidth:2,    
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#c5c5c5",
      borderRadius: 5,
      backgroundColor: "#fff",
      marginVertical: 10, 
    },
    apply_account_form_cv_text: {
      width: "100%",
      fontSize: 15,
      fontWeight: "normal",
      color: "#221f1f",
      textAlign: "center",
      alignSelf: "center",
      
      paddingHorizontal: 10,
      marginHorizontal: 10,
    },
    apply_account_form_cv_icon: {
      
      fontSize: 15,
      fontWeight: "normal",
      color: "#221f1f",
      alignSelf: "center",
     
      
    },
    documentInfo: {
      width: "100%",
      height: 30,
      fontSize: 15,
      flexDirection: "row",
      fontWeight: "normal",
      color: "#221f1f",
      marginVertical: 10,
      marginHorizontal: 20,
      borderBottomColor: "#ddd",
      borderBottomWidth: 1,
    },

    //poop
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
     
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      marginTop: 50,
      textAlign: 'center',
    },
    input: {
      width: '100%',
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 16,
    },
    button: {
      width: '100%',
      height: 40,
      backgroundColor: '#007bff',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginBottom: 16,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    documentInfo: {
      width: '100%',
      fontSize: 15,
      fontWeight: 'normal',
      color: '#221f1f',
      marginVertical: 10,
      marginHorizontal: 20,
      borderBottomColor: '#ddd',
      borderBottomWidth: 1,
    },
    submitButton: {
      width: '100%',
      height: 40,
      backgroundColor: '#28a745',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 16,
    },
})