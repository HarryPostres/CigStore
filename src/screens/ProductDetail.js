import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import { useContext } from 'react';
import {CartContext} from '../Context/CartContext';
import theme from '../themes';

const ProductDetail = ({ route }) => {
    const {product} = route.params;
    const {addToCart} = useContext(CartContext);

    return(
        <View style={styles.container}>
            <Image source={{ uri: product.imageUrl}} style={styles.image}/>
            <Text>{product.nombre}</Text>
            <Text>${product.price}</Text>

            <Pressable
                style={styles.cartButton}
                    onPress={() => addToCart(product)}
            >
                <Text style={styles.cardButtonText}>Agregar al carrito</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.lg,
    },
    image:{
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginBottom: theme.spacing.lg,
    },
    name:{
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.gray,
        textAlign: 'center',
        marginBottom: theme.spacing.lg,
    },
    price:{
        fontSize: theme.typography.fontSize.lg,
        color: theme.colors.gray,
        textAlign: 'center',
        marginBottom: theme.spacing.lg,
    },
    cartButton:{
        backgroundColor: theme.colors.red,
        padding: theme.spacing.md,
        borderRadius: 8,
        alignItems: 'center',
    },
    cartButtonText:{
        color: '#fff',
        fontFamily: theme.typography.fontFamily.regular,
    },
});
export default ProductDetail;