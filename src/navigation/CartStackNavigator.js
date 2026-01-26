import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';

const stack = createNativeStackNavigator();

const CartStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
            name = "CartMain"
            Component = {Cart}
            />
            <Stack.Screen
            name ="Checkout"
            component={Checkout}
            />
        </Stack.Navigator>
    );
};

export default CartStackNavigator;