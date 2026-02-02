import { NavigationContainer} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import { StyleSheet} from 'react-native';
import { CartProvider } from './src/Context/CartContext';
import TabNavigator from './src/navigation/TabsNavigator';
import * as Linking from "expo-linking"
import { useEffect } from 'react';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Marlboro': require ('./assets/fonts/Marlboro.ttf'),
  });

  useEffect(() => {
    const sub = Linking.addEventListener("url", (event) => {
      console.log("MP RETURN:", event.url);
    });
    return () => sub.remove();
  }, []);
  

  if (!fontsLoaded){
    return null;
  }


  return (
<CartProvider>
    <NavigationContainer>
      <TabNavigator/>
    </NavigationContainer>
</CartProvider>  
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
});
