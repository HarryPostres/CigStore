import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Products from '../screens/Products';
import theme from '../themes';
import { Ionicons } from '@expo/vector-icons';
/* import { Ionicons } from '@expo/vector-icons'; */

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
                    iconName = focused ? 'storeFront' : 'storeFront-outline';
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
            <Tab.Screen name='Home' component={Home}/>
            <Tab.Screen name='Products' component={Products}/>                          
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