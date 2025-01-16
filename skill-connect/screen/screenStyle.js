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
    flexDirection: "row",
    alignItems: "center",

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
  googleButton: {
    width: 350,
    paddingLeft: 45,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#221f1f",
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
    color: "#f5f5f1",
    fontWeight: "500",
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
  dashboard: {},
  dashboard_header: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingTop: 40,
    padding: 10,
    marginBottom: 10,
  },
  dashboard_title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dashboard_icon_container: {
    flexDirection: "row",
  },
  dashboard_icon: {
    marginLeft: 10,
  },
  dashboard_category: {
    flexDirection: "row",

  },
  dashboard_category_text: {
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#f5f5f1",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    minWidth: 100,
    maxWidth: 200, 
  },
  selectedCategory: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
    textAlign: "center",
    backgroundColor: "#d1e7fd",
    padding: 3,
  },
  selectedCategoryText: {
    backgroundColor: "#d1e7fd",
    padding: 1
  },
  category: {
    fontSize: 16,
    color: "black",
    
    textAlign: "center",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  dashboard_card_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  dashboard_card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: "45%",
  },
  dashboard_card_image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  dashboard_card_title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  dashboard_card_experience: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  dashboard_card_pdf_link: {
    fontSize: 14,
    color: "#007bff",
    marginTop: 5,
  },

  //Profile
  messages: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    marginTop: 40,
  },
});

export default ScreenStyles;
