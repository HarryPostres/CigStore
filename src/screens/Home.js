import { View, Text, Image, StyleSheet, FlatList, Pressable } from "react-native";
import { useEffect, useState, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import ProductCard from "../Components/ProductCard";
import Header from "../Components/Header";
import theme from "../themes";



const images = [
  require("../../assets/images/imagen-1.jpg"),
  require("../../assets/images/imagen-2.jpg"),
  require("../../assets/images/imagen-3.jpg"),
  require("../../assets/images/imagen-4.jpg"),
];

const Home = () => {
  const navigation = useNavigation();
  const [Products, setProducts] = useState([]);

  const randomImage = useMemo(() => {
    const index = Math.floor(Math.random() * images.length);
    return images[index];
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Products"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Productos desde Firestore:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const randomProducts = useMemo(() => {
    if (Products.length <=4) return Products;

    const shuffled = [... Products].sort(()=> 0.5 - Math.random());
    return shuffled.slice(0,4);
  }, [Products]);

  console.log("Productos en state:", Products);

  return (
    <View style={styles.container}>
      <Header />

      <Text style={styles.welcomeText}>¡Bienvenido a CigsStore!</Text>

      <Image
        source={randomImage}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.welcomeText}>
        Te presentamos nuestro stock de cigarrillos:
      </Text>

      <FlatList
        data={randomProducts}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (
          <ProductCard
            nombre={item.nombre}
            price={item.price}
            imageUrl={item.imageUrl}
          />
        )}
      />

      <Pressable 
      onPress={() => navigation.navigate('Products')}
      style = {styles.button}
      > 
    <Text style ={styles.buttonText}>
      Ver más
    </Text>  
       </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  welcomeText: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.regular,
    textAlign: "center",
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: "center",
  },
    button: {
      alignSelf: 'center',
      marginTop: theme.spacing.md,
      padding: theme.spacing.sm,
      backgroundColor: theme.colors.red,
      width: '50%',
  },

  buttonText: {
      fontSize: theme.typography.fontSize.xl,
      fontFamily: theme.typography.fontFamily.regular,
      textAlign: "center",
  }
});

export default Home;

