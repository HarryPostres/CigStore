import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';
import Receipt from '../screens/Receipt'

const stack = createNativeStackNavigator();

const CartStackNavigator = () => {
    return (
        <stack.Navigator
                    screenOptions= {{
                headerShown:false,
         }}>
            <stack.Screen
            name = "Cart"
            component = {Cart}
            />
            <stack.Screen
            name ="Checkout"
            component={Checkout}
            />
            <stack.Screen
            name="Receipt"
            component ={Receipt}
            />
        </stack.Navigator>
    );
};

export default CartStackNavigator;