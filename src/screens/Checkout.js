import {View, Text, StyleSheet, TextInput, Pressable, Alert, Image,ScrollView} from 'react-native';
import {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {useCart} from '../Context/CartContext';
import theme from '../themes';
import {db, storage} from '../Firebase/firebaseConfig';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import * as FileSystem from 'expo-file-system';

const formatExpiry = (text) => {
    let cleaned = text.replace(/\D/g, '');

    if (cleaned.length >= 3){
        return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }

    return cleaned;
};

const formatCardNumber = (text) => {
    const cleaned = text.replace(/\D/g, '');

    const groups = cleaned.match(/.{1,4}/g);

    if (groups){
        return groups.join(' ');
    }
    return cleaned;
};

const isValidExpiry = (expiry) => {
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;

    const [mm, yy] = expiry.split('/').map(Number);

    if (mm< 1 || mm > 12) return false;

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear() % 100;

    if (yy < currentYear) return false;

    if (yy === currentYear && mm < currentMonth) return false;

    return true;
};

const isValidCard= (number) => {
            let sum = 0;
            let shouldDouble = false;
            
            for (let i = number.length - 1; i >= 0; i--){
                let digit = parseInt(number[i]);

                if (shouldDouble){
                    digit *= 2;
                    if (digit > 9) digit -= 9;
                }
                sum+= digit;
                shouldDouble = !shouldDouble
            }
        return sum % 10 === 0;
       };

const Checkout = ({navigation}) => {
    const {cart, total, clearCart} = useCart();
    const [name, setName] = useState('');
    const [address, setAdress] = useState('');    
    const [phone, setPhone] = useState('');

    const [cardNumber, setCardNumber] = useState('');    
    const [expiry, setExpiry] = useState('');
    
    const [cvv, setCvv] = useState('');

    const [dniImage, setDniImage] = useState(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });
        if (!result.canceled) {
            setDniImage(result.assets[0].uri);
        }
    };

    const validate = () => {
        if (!name || !address || !phone){
            Alert.alert('Error', 'Completá tus datos personales');
            return false;
        }
        const cleanCard = cardNumber.replace(/\s/g, '');

        if (!isValidCard(cleanCard)){
            Alert.alert('Error', 'Numero de tarjeta inválido');
            return false;
        }

        if (!isValidExpiry(expiry)){
            Alert.alert('Error', 'Tarjeta encida o fecha inválida')
            return false;
        }

        if (cvv.length !== 3){
            Alert.alert('Error', 'cvv inválido');
            return false;
        }

        if (!dniImage){
            Alert.alert('Error','Debes subir una foto del dni');
            return false;
        }
    
     return true;
    };

    const handleConfirm= async () => {
        if (!validate()) return;

        try {
            console.log('DNI:', dniImage);
            console.log('click confirmado');

            const fileInfo = await FileSystem.getInfoAsync(dniImage);
            if (!fileInfo.exists){
                throw new Error('Archivo no encontrado');
            }

            const blob = await (await fetch (fileInfo.uri)).blob();

            const fileRef = ref(
                storage,
                `dni/${Date.now()}.jpg`
            );
            await uploadBytes(fileRef, blob);
            const dniURL = await getDownloadURL(fileRef);

            const order = {
                name,
                address,
                phone,
                cart,
                total,

                dni: dniURL,

                date: new Date().toLocaleString(),
                createdAt: serverTimestamp(),
            };

            console.log('subiendo orden...')

            const docRef = await addDoc(
                collection(db, 'orders'),
                order
            );
            order.id = docRef.id;
            clearCart();

            navigation.replace('Receipt', {
                order
            });  
        } catch (error){
            console.log(error);

            Alert.alert(
                'Error',
                'No se pudo procesar la compra'
            );
            
        }
    };

return(
    <ScrollView style={styles.container}>
        <Text style={styles.title}>Resumen</Text>

        {cart.map((item) => (
            <View key={item.id} style={styles.row}>
                <Text>{item.nombre}</Text>
                <Text>{item.quantity}</Text>
            </View>
        ))}
    
    <Text style={styles.total}>Total: ${total}</Text>
    <Text style={styles.subtitle}>Datos personales:</Text>

        <TextInput
        placeholder='Nombre'
        style={styles.input}
        value={name}
        onChangeText={setName}
        />
        <TextInput
        placeholder='Direccion'
        style={styles.input}
        value={address}
        onChangeText={setAdress}
        />
        <TextInput
        placeholder='Teléfono'
        keyboardType='phone-pad'
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        />

      
        <Text>Datos de pago:</Text>
        <TextInput
            placeholder = "XXXX XXXX XXXX XXXX"
            style={styles.input}
            keyboardType="number-pad"
            maxLength={19}
            value= {cardNumber}
            onChangeText= {(text) => {
                const formatted = formatCardNumber(text);
                setCardNumber(formatted);
            }}
        />
            <View style={styles.cardRow}>
                <TextInput
                    placeholder= "MM/YY"
                    style={[styles.input, styles.half]}
                    maxLength={5}
                    value={expiry}
                    keyboardType='number-pad'
                    onChangeText={(text) => setExpiry(formatExpiry(text))}
                />
                
                <TextInput
                    placeholder="CVV"
                    style= {[styles.input, styles.half]}
                    keyboardType='number-pad'
                    maxLength={3}
                    value={cvv}
                    onChangeText={setCvv}
                />

            </View>

            <Text style={styles.subtitle}>Identidad</Text>

            <Pressable style= {styles.upload} onPress= {pickImage}>
                <Text style={styles.uploadText}>
                    {dniImage ? 'Cambiar foto DNI' : 'subir foto DNI'}
                </Text>
            </Pressable>

            {dniImage && (
                <Image source={{uri: dniImage}}
                style= {styles.dniImage}
                />
            )}

    <Pressable 
        style={styles.button}
        onPress={handleConfirm}
    >
        <Text style= {styles.buttonText}>Confirmar</Text>
    </Pressable>
    </ScrollView>
);
};

/* SEGUIR DESDE LOS ESTILOS */

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.background,
    },
    title:{
        fontSize: theme.typography.fontSize.xl,
        textAlign: 'center',
        marginBottom: theme.spacing.lg,
    },
    subtitle:{
        marginTop: theme.spacing.lg,
        fontSize: theme.typography.fontSize.lg,
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.sm,
    },
    total:{
        fontSize: theme.typography.fontSize.lg,
        marginVertical: theme.spacing.md,
        textAlign: "center",
    },
    input:{
        borderWidth: 1,
        borderColor: theme.colors.gray,
        borderRadius:6,
        padding: theme.spacing.sm,
        marginTop: theme.spacing.sm,
    },
    cardRow: {
        flexDirection:'row',
        justifyContent:'space-between',
        gap: theme.spacing.md,
    },
    half:{
        flex:1,
    },
    upload:{
        marginTop: theme.spacing.md,
        backgroundColor: theme.colors.gray,
        padding:theme.spacing.sm,
        borderRadius: 6,
        alignItems: 'center',
    },
    uploadText:{
        color: '#fff',
    },

    dniImage:{
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginTop: theme.spacing.sm,
        borderRadius: 8,
    },
    

    button:{
        marginTop: theme.spacing.xl,
        backgroundColor: theme.colors.red,
        padding: theme.spacing.md,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText:{
        color: "#fff"
    },
});

export default Checkout;

