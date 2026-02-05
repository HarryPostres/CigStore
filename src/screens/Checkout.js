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
import * as Linking from "expo-linking";

import { useCart } from '../Context/CartContext';
import theme from '../themes';

import { db, storage } from '../Firebase/firebaseConfig';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

WebBrowser.maybeCompleteAuthSession();

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
const payWithMercadoPago = async (orderId, orderForReceipt) => {
  try {
    console.log("Iniciando pago MP...");

    const apiUrl = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";
    const redirectBaseUrl = Linking.createURL("checkout-result");

    const response = await fetch(`${apiUrl}/create_preference`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart.map((item) => ({
          title: item.nombre,
          quantity: Number(item.quantity),
          unit_price: Number(item.price),
          currency_id: "ARS",
        })),
        orderId,
      }),
    });

    if (!response.ok) {
      const backendError = await response.text();
      throw new Error(`Backend error: ${backendError}`);
    }

    const data = await response.json();
    console.log("MP RESPONSE:", data);

    const checkoutUrl = data.init_point || data.sandbox_init_point;

    if (!checkoutUrl) {
      throw new Error("No se recibió init_point");
    }

    // 👉 WEB
    if (Platform.OS === "web") {
      window.location.href = checkoutUrl;
      return;
    }
    
   await WebBrowser.openBrowserAsync(checkoutUrl);

   Alert.alert(
    "Pago iniciado",
    "si completaste el pago, verifica el estado del pedidoe n admin"
   );
  } catch (error){
    console.log("MP PAY ERROR:", error);
    Alert.alert("Error", "no se pudo iniciar el pago");
  }
};

  /* ===========================
     PERMISOS
  =========================== */

useEffect(() => {
  (async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Se necesita acceso a la galería');
    }
  })();
}, []);

/* ===========================
   FUNCIONES
=========================== */

const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setDniImage(result.assets[0].uri);
  }
};

const handleConfirm = async () => {
  try {
    if (!name || !address || !phone || !dniImage) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    let dniURL = '';

    if (dniImage && !dniImage.startsWith('http')) {
      const response = await fetch(dniImage);
      const blob = await response.blob();
      const storageRef = ref(storage, `dni/${Date.now()}`);
      await uploadBytes(storageRef, blob);
      dniURL = await getDownloadURL(storageRef);
    } else {
      dniURL = dniImage;
    }

    const order = {
      name,
      address,
      phone,
      cart,
      total,
      dni: dniURL,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'orders'), order);

    console.log('Orden:', docRef.id);

    await payWithMercadoPago(docRef.id, order);
  } catch (error) {
    console.log('CHECKOUT ERROR:', error);
    Alert.alert('Error', error?.message || 'No se pudo completar el pedido');
  }
};



  /* ===========================
     UI
  =========================== */
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

