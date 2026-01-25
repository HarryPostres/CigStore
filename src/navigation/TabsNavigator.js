import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import ProductsStackNavigator from './ProductStackNavigator';
import theme from '../themes';
import Cart from "../screens/Cart";
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
        screenOptions ={({route}) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBar,
            tabBarIcon: ({focused, size, color}) => {
                let iconName;

                if (route.name === 'Home'){
                    iconName = focused ? 'home' : 'home-outline';
                }else if (route.name === 'Products'){
                    iconName = focused ? 'storefront' : 'storefront-outline';
                }else if (route.name === 'Cart'){
                    iconName = focused ? 'cart' : 'cart-outline';
                }
                return(
                    <Ionicons
                        name={iconName}
                        size = {size ?? 24}
                        color={color ?? (focused ? theme.colors.white : theme.colors.white)}
                    />
                );
            },
        })}
        >
            <Tab.Screen name="Cart" component={Cart}/>
            <Tab.Screen name='HomeStack' component={HomeStackNavigator}/>
            <Tab.Screen name='ProductsStack' component={ProductsStackNavigator}/>                          
       </Tab.Navigator>
    );
};
const styles = {
             tabBar:{
                backgroundColor: theme.colors.gray,
                borderRadius: 15,
                height: 60,
                position: 'absolute',
             }
             }



    export default TabNavigator;