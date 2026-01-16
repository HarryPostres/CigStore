
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "../screens/Home";
import Header from '../Components/Header';



const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
            <Stack.Navigator
            initialRouteName="Home"
            screenOptions= {{
                header:()=> <Header />,
                contentStyle: {backgroundColor: 'backgroundColor: #ff0000ff',
                 },
            }}
            >
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
    )
}
export default AppNavigator;

