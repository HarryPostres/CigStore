import {View, Text, StyleSheet, TextInput, Pressable, Alert} from 'react-native';
import {useCart} from '../Context/CartContext';
import theme from '../themes';

const Checkout = ({navigation}) => {
    const {cart, total, clearCart} = useCart();

    const handleConfirm= () => {
        Alert.alert(
            'Compra confirmada',
            'Gracias por su compra',
            [{
                text: 'OK',
                onPress: () => {
                    clearCart();
                    navigation.popToTop();
                },
            },
        ]
        );
    };
return(
    <View>
        <Text>Resumen</Text>

        {cart.map((item) => (
            <View>
                <Text>{item.nombre}</Text>
                <Text>{item.quantity}</Text>
            </View>
        ))}
    
    <Text>Total: ${total}</Text>
    <Text>Datos</Text>

        <TextInput
        placeholder='Nombre'
        />
        <TextInput
        placeholder='Direccion'
        />
        <TextInput
        placeholder='Teléfono'
        keyboardType='phone-pad'/>

        <Pressable onPress={handleConfirm}>
            <Text>Confirmar compra</Text>
        </Pressable>
    </View>
);
};

const styles = StyleSheet.create({
    /* SEGUIR DESDE ACA, AGREGA LOS STYLES A CADA ELEMENTO */
})