
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "../screens/Home";
import ProductDetail from '../screens/ProductDetail';
import theme from '../themes';


const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
    return (
            <Stack.Navigator
            screenOptions= {{
                headerShown:false,
                contentStyle: {backgroundColor: theme.colors.background,},
            }}
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name= "ProductDetail" component = {ProductDetail}/>
            </Stack.Navigator>
    );
};
export default HomeStackNavigator;

