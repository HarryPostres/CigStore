import { NavigationContainer} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import { StyleSheet} from 'react-native';
import { CartProvider } from './src/Context/CartContext';
import TabNavigator from './src/navigation/TabsNavigator';


export default function App() {
  const [fontsLoaded] = useFonts({
    'Marlboro': require ('./assets/fonts/Marlboro.ttf'),
  });
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
