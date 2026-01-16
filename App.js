import { StatusBar } from 'expo-status-bar';
import {useFonts} from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';



export default function App() {
  const [fontsLoaded] = useFonts({
    'Marlboro': require ('./assets/fonts/Marlboro.ttf'),
  });
  if (!fontsLoaded){
    return null;
  }
  
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
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
