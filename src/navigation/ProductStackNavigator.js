import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from '../screens/Products';
import ProductDetail from "../screens/ProductDetail";
import theme from "../themes";

const stack = createNativeStackNavigator();

const ProductsStackNavigator = () => {
    return (
        <stack.Navigator    
            screenOptions={{
                headerShown: false,
                contentStyle:{backgroundColor: theme.colors.background},
                }}
        >
            <stack.Screen name="Products" content={Products}/>
            <stack.Screens name="ProductDetail" component={ProductDetail}/>
        </stack.Navigator>
    );
};

export default ProductsStackNavigator