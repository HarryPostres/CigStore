
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "../screens/Home";
import Products from "../screens/Products";
import theme from '../themes';
import ProductDetail from "../screens/ProductDetail";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
            <Stack.Navigator
            initialRouteName="Home"
            screenOptions= {{
                headerShown:false,
                contentStyle: {backgroundColor: theme.colors.background,},
            }}
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="ProductDetail" component= {ProductDetail}/>
                <Stack.Screen name="Products" component={Products} />
            </Stack.Navigator>
    )
}
export default AppNavigator;

