import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ScreenStyles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: "#216227",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "50px",
    fontWeight: "bold",
    color: "#fff",
  },
  SplashText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
  },
  //Login
  login: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f1",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  
   
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  login_input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginLeft: -40,
  },
  login_logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderRadius: 100,
    marginVertical: 30,
  },
  check: {
    position: "absolute",
    width: 20,
    height: 20,
    top: 50,
    color: "#221f1f",
  },
  login_title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#221f1f",
  },
  login_subtitle: {
    fontSize: 15,
    fontWeight: "200",
    color: "#221f1f",
    textAlign: "center",
    alignSelf: "center",
    paddingHorizontal: 30,
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
  googleButton:{
    width: 350,
    paddingLeft: 45,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#221f1f',
    // borderColor: '#ddd',
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 40,
    margin: 10,
   
    shadowOffset: { width: 0, height: 2 },
   
   
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    alignSelf: "center",
  },
  googleText: {
    fontSize: 16,
    color: '#f5f5f1',
    fontWeight: '500',
    textAlign: "center",
  },
  login_input: {
    width: 350,
    fontSize: 15,
    fontWeight: "normal",
    color: "#221f1f",

    borderWidth: 1,
    borderColor: "#c5c5c5",
    borderRadius: 5,
    backgroundColor: "#f5f5f1",
    paddingLeft: 10,
    margin: 10,
  },
  login_account: {
    fontSize: 15,
    fontWeight: "normal",
    color: "#221f1f",
  },
  login_google: {
    width: 25,
    height: 25,
    padding: 0,
    margin: 5,
  },
  login_google_text: {
    fontSize: 15,
    fontWeight: "normal",
    color: "#f5f5f1",
    marginTop: 0,
  },
  login_forgot: {
    fontSize: 15,
    fontWeight: "normal",
    color: "#3684bd",
    textAlign: "right",
    alignSelf: "flex-end",
    marginEnd: 30,
  },
  login_signup: {
    fontSize: 15,
    fontWeight: "normal",
    color: "#3684bd",
    textAlign: "center",
    alignSelf: "center",
  },

  //Dashborad
  dashboard: {
    
   width: "100%",
   height: "100%",
    backgroundColor: "#f5f5f1",
  },
  dashboard_header: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f1",
    justifyContent: "flex-start",
    lineHeight: 0.2,
    paddingTop:30,
    marginBottom: 0,  
    fontSize: 30,
    fontWeight: "bold",
    color: "#221f1f",
    elevation: 0,
  },
  dashboard_title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#221f1f",
    textAlign: "left",
    alignSelf: "flex-start",
    marginStart: 0,
  },
  dashboard_icon_container: {
    width: "60%",
    
    flexDirection: "row",
    alignItems: "center",
    
    justifyContent: "flex-end",
    
    
    fontSize: 30,
    fontWeight: "bold",
    color: "#221f1f",
    
  },
  dashboard_icon: {
    
    paddingHorizontal: 10,
  },
  dashboard_category: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,

    
  },
  dashboard_category_text: {
    width: "auto",
    height: "100%",
    fontSize: 15,
    fontWeight: "normal",
    backgroundColor: "#f5f5f1",
    borderColor: "#ddd",
    borderWidth: 1,
    color: "#221f1f",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginEnd: 5,
  },
  dashboard_card_container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 3,
  },
  dashboard_card: {
    width: "49%",
    aspectRatio: 1,
    
    
    
    padding: 10,
   
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 5,
    elevation: 0,
    
  },
  dashboard_card_image: {
    width: "100%",
    height: "50%",
    resizeMode: "contain",
   
  },
  dashboard_card_title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#221f1f",
  },
  dashboard_card_experience: {
    width: 20,
    height: 20,
    color: "#ddd",
    fontWeight: "bold",
    fontFamily: "palatino",
    marginRight: 5,
  },
  dashboard_card_experience_logo: {
    width: 20,
    height: 20,
    color: "#3684DB",
    fontWeight: "bold",
    fontFamily: "palatino",
    marginRight: 5,
  },
  dashboard_card_experience_logo2: {
    width: 20,
    height: 20,
    color: "#221f1f",
    fontWeight: "bold",
    fontFamily: "poiret",
    marginRight: 5,
  },
  dashboard_card_text: {
    fontSize: 15,
    fontWeight: "normal",
    color: "#221f1f",
  },
  dashboard_card_experience: {
    fontSize: 15,
    fontWeight: "normal",
    color: "#c5c5c5",
  },
  bacImage: {
   
    width: "100%",
    height: "40%",
    backgroundColor: "#221f1f",
  },
  bacImage_content: {
    flex: 1,
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
   
    
  },
  bacImage_text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});

export default ScreenStyles;
