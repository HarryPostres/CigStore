import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import {useCart} from '../Context/CartContext';
import AppLayout from '../Components/appLayout';
import theme from '../themes';
import {useNavigation} from '@react-navigation/native';

const Cart = () => {
    const {cart, increaseQty, decreaseQty, removeFromCart, total  } = useCart();
    const navigation = useNavigation();

    return (
        <AppLayout>
            <View style={styles.container}>
                <Text style = {styles.title}>Carrito</Text>
                <FlatList
                data ={cart}
                keyExtractor ={(item) => item.id}
                ListEmptyComponent={
                    <Text style = {styles.empty}>El carrito está vacío</Text>
                }
                renderItem={({item}) => (
                    <View style= {styles.item}>
                        <Text style={styles.item}>{item.nombre}</Text>
                        <Text style={styles.price}>{item.price}</Text>
                    <View style = {styles.qty}>
                        <Pressable onPress ={() => decreaseQty(item.id)}>
                            <Text>-</Text>
                        </Pressable>

                    <Text>{item.quantity}</Text>

                    <Pressable onPress ={() => increaseQty(item.id)}>
                        <Text>+</Text>
                    </Pressable>
                    </View>

                    <Pressable onPress ={() => removeFromCart(item.id)}>
                        <Text style={styles.remove}>Eliminar</Text>
                    </Pressable>
                </View>
            )}
         />
            {cart.length > 0 && (
                <Text style={styles.total}>Total: ${total}</Text>
            )}

            {cart.length > 0 && (
                <Pressable
                    style={styles.checkout}
                    onPress={() => navigation.navigate('Checkout')}
                >   
                    <Text style={styles.checkoutText}>Finalizar compra</Text>
                </Pressable>
            )}



        </View>
        </AppLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: theme.spacing.md,
    },
    title:{
        fontSize: theme.typography.fontSize.xxl,
        textAlign: "center",
    },
    item: {
        marginBottom : theme.spacing.md,
        padding: theme.spacing.sm,
        backgroundColor: theme.colors.cardBackground,
    },
    qty: {
        flexDirection: "row",
        gap: theme.spacing.md,
        alignItems: "center",
    },
    remove: {
        color: theme.colors.red,
    },
    total: {
        fontSize: theme.typography.fontSize.xl,
        textAlign: "center",
        marginTop: theme.spacing.md,
    },
    empty: {
        textAlign: "center",
        marginTop: theme.spacing.lg,
    },
    checkout: {
        backgroundColor: theme.colors.red,
        padding: theme.spacing.md,
        borderRadius: 8,
        marginTop: theme.spacing.md,
        alignItems: 'center',
    },
    checkoutText:{
        color: '#fff',
        fontSize: theme.typography.fontSize.md,
    },

});

export default Cart;