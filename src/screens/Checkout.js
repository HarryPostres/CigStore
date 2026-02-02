import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Platform,
} from 'react-native';

import { useState, useEffect } from 'react';

import * as ImagePicker from 'expo-image-picker';
import * as WebBrowser from "expo-web-browser";

import { useCart } from '../Context/CartContext';
import theme from '../themes';

import { db, storage } from '../Firebase/firebaseConfig';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

webBrowser.maybeCompleteAuthSession();

/* ===========================
   COMPONENTE
=========================== */

const Checkout = ({ navigation }) => {

  const { cart, total, clearCart } = useCart();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const [dniImage, setDniImage] = useState(null);

/* FUNCION DE PAGO */
const payWithMercadoPago = async (orderId) => {
  try {

    console.log("Iniciando pago MP...");

    const response = await fetch("http://192.168.1.36:3000/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart.map(item => ({
          title: item.nombre,
          quantity: item.quantity,
          unit_price: item.price,
          currency_id: "ARS",
        })),
        orderId,
      }),
    });

    const data = await response.json();

    console.log("MP RESPONSE:", data);

    if (!data.init_point) {
      throw new Error("No se recibió init_point");
    }

    // 👉 WEB
    if (Platform.OS === "web") {
      window.location.href = data.init_point;
    }

    // 👉 ANDROID / IOS
    else {
      await WebBrowser.openBrowserAsync(data.init_point);
    }

  } catch (error) {

    console.log("MP PAY ERROR:", error);

    Alert.alert("Error", "No se pudo iniciar el pago");

  }
};



  /* ===========================
     PERMISOS
  =========================== */

  useEffect(() => {

    (async () => {

      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {

        Alert.alert(
          'Permiso requerido',
          'Se necesita acceso a la galería'
        );
      }

    })();

  }, []);



  /* ===========================
     PICK IMAGE
  =========================== */

  const pickImage = async () => {

    try {

      const result =
        await ImagePicker.launchImageLibraryAsync({

          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 0.8,
        });


      if (!result.canceled) {

        setDniImage(result.assets[0].uri);
      }

    } catch (error) {

      console.log('PICK ERROR:', error);

      Alert.alert(
        'Error',
        'No se pudo abrir la galería'
      );
    }
  };



  /* ===========================
     VALIDAR
  =========================== */

  const validate = () => {

    if (!name || !address || !phone) {

      Alert.alert(
        'Error',
        'Completá todos los datos'
      );

      return false;
    }


    if (!dniImage) {

      Alert.alert(
        'Error',
        'Subí una foto del DNI'
      );

      return false;
    }


    return true;
  };



  /* ===========================
     CONFIRMAR
  =========================== */

  const handleConfirm = async () => {

    if (!validate()) return;


    try {

      console.log('Iniciando checkout...');


     const response = await fetch (dniImage);

     const blob = await response.blob();

      console.log('Imagen lista');


      /* Nombre único */
      const fileName = `dni/${Date.now()}_${Math.random()
        .toString(36)
        .slice(2)}.jpg`;


      const fileRef = ref(storage, fileName);


      /* Subir */
      await uploadBytes(fileRef, blob);

      console.log('Imagen subida');


      /* URL */
      const dniURL = await getDownloadURL(fileRef);

      console.log('URL:', dniURL);



      /* Pedido */
      const order = {

        name,
        address,
        phone,

        cart,
        total,

        dni: dniURL,

        status: 'pending',

        createdAt: serverTimestamp(),
      };


      /* Guardar */
      const docRef = await addDoc(
        collection(db, 'orders'),
        order
      );


      console.log('Orden:', docRef.id);


      clearCart();


      navigation.replace('Receipt', {
        order: { ...order, id: docRef.id }
      });


    } catch (error) {

      console.log('CHECKOUT ERROR:', error);

      Alert.alert(
        'Error',
        error?.message || 'No se pudo completar el pedido'
      );
    }
  };



  /* ===========================
     UI
  =========================== */

  return (

    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >

      <Text style={styles.title}>
        Resumen
      </Text>



      {cart.map((item) => (

        <View key={item.id} style={styles.row}>

          <Text>{item.nombre}</Text>

          <Text>{item.quantity}</Text>

        </View>

      ))}



      <Text style={styles.total}>
        Total: ${total}
      </Text>



      <Text style={styles.subtitle}>
        Datos personales
      </Text>



      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />


      <TextInput
        placeholder="Dirección"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />


      <TextInput
        placeholder="Teléfono"
        keyboardType="phone-pad"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />



      <Text style={styles.subtitle}>
        Identidad
      </Text>



      <Pressable
        style={styles.upload}
        onPress={pickImage}
      >

        <Text style={styles.uploadText}>
          {dniImage ? 'Cambiar DNI' : 'Subir DNI'}
        </Text>

      </Pressable>



      {dniImage && (

        <Image
          source={{ uri: dniImage }}
          style={styles.dniImage}
          pointerEvents="none"
        />

      )}



      <TouchableOpacity
        style={styles.button}
        onPress={handleConfirm}
        activeOpacity={0.7}
      >

        <Text style={styles.buttonText}>
          Confirmar pedido
        </Text>

      </TouchableOpacity>



    </ScrollView>
  );
};



/* ===========================
   STYLES
=========================== */

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

  subtitle: {
    marginTop: theme.spacing.lg,
    fontSize: theme.typography.fontSize.lg,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },

  total: {
    fontSize: theme.typography.fontSize.lg,
    marginVertical: theme.spacing.md,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: 6,
    padding: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },

  upload: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.gray,
    padding: theme.spacing.sm,
    borderRadius: 6,
    alignItems: 'center',
  },

  uploadText: {
    color: '#fff',
  },

  dniImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: theme.spacing.sm,
    borderRadius: 8,
  },

  button: {
    marginTop: theme.spacing.xl,
    backgroundColor: theme.colors.red,
    padding: theme.spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

});

export default Checkout;

