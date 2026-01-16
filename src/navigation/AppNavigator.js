
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "../screens/Home";
import theme from '../themes';


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
            </Stack.Navigator>
    )
}
export default AppNavigator;

