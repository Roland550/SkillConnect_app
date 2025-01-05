
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './screen/SplashScreen';
import Login from './screen/Login';
import SignUp from './screen/SignUp';
import ImagePickerExample from './screen/ImagePick';
import FilePreviewer from './screen/FilePart';
import Dashboard from './screen/Dashboard';
import RootStack from './navigation/RootStack';

export default function App() {
  return (

    <RootStack/>
    // <View style={styles.container}>
    //   <Text>Skill Connect</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
