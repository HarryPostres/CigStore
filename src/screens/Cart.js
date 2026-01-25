import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import {useCart} from '../Context/CartContext';
import AppLayout from '../components/appLayout';
import theme from '../themes';

const Cart = () => {
    const {cart, increaseQty, decreaseQty, removeFromCart, total  } = useCart();

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
});

export default Cart;