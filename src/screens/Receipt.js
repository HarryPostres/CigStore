import {View, Text, StyleSheet, Pressable} from 'react-native';
import theme from '../themes';

const Receipt = ({route, navigation}) => {

    const {order} = route.params;

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Recibo</Text>

            <Text style={styles.label}>Orden ID:</Text>
            <Text>{order.id}</Text>

            <Text style={styles.label}>Fecha:</Text>
            <Text>{order.date}</Text>

            <Text style= {styles.label}>Productos</Text>

            {order.cart.map(item => (
                <View key={item.id} style={styles.row}>
                    <Text>{item.nombre}</Text>
                    <Text>x{item.quantity}</Text>
                </View>
            ))}                  

            <Text style={styles.total}>Total: ${order.total}</Text>

            <Pressable
            style={styles.button}
            onPress={() => navigation.popToTop()}
            >
            <Text style={styles.buttonText}>Volver al inicio</Text>
            </Pressable> 
        </View>
    );
};

export default Receipt;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.background,
    },

    title: {
        fontSize: theme.typography.fontSize.xl,
        textAlign: 'center',
        marginBottom: theme.spacing.lg,
    },

    label:{
        marginTop: theme.spacing.md,
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
    },

    total: {
        fontSize: theme.typography.fontSize.lg,
        marginVertical: theme.spacing.lg,
        textAlign: 'center',
    },
    button:{
        backgroundColor: theme.colors.red,
        padding: theme.spacing.md,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText:{
        color: '#fff',
    }

});