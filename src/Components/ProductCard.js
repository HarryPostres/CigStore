import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import theme from '../themes';


const ProductCard = ({nombre, price, imageUrl}) => {
    return (
        <View style={styles.cardContainer}>
            <Image source={{uri: imageUrl}} style={styles.productImage} />
            <Text style={styles.productName}>{nombre}</Text>
            <Text style={styles.productPrice}>${price}</Text>
            <Pressable style={styles.buyButton}>
                <Text style={styles.buyButtonText}>Buy Now</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: theme.colors.background,
        borderRadius: 10,
        width: '50%',
        maxWidth: 350,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.lg,
    },
    
    productImage:{
            width: '100%',
            height: 150,
            resizeMode: 'contain',
            marginBottom: theme.spacing.md,
        },
        productName:{
            fontSize: theme.typography.fontSize.lg,
        },
        productPrice:{
            fontSize: theme.typography.fontSize.md,
            color: theme.colors.gray,
        },
});

export default ProductCard;