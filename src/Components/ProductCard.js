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
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 10,
        width: '40%',
        maxWidth: 350,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.lg,
        marginHorizontal: theme.spacing.md,
    },
    
    productImage:{
            width: '100%',
            height: 150,
            resizeMode: 'contain',
            marginBottom: theme.spacing.md,
        },
        productName:{
            textAlign: 'center',
            fontFamily: theme.typography.fontFamily.bold,
            fontSize: theme.typography.fontSize.lg,
        },
        productPrice:{
            textAlign: 'center',
            fontSize: theme.typography.fontSize.md,
            color: theme.colors.gray,
        },
        buyButton:{
            alignSelf: 'center',
            marginTop: theme.spacing.md,
            backgroundColor: theme.colors.red,
            padding: theme.spacing.sm,  
            borderRadius: 5,
        },
});

export default ProductCard;