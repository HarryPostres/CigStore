import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { useEffect, useState, useMemo } from "react";
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
        data={Products}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.List}
        renderItem={({ item }) => (
          <ProductCard
            nombre={item.nombre}
            price={item.price}
            imageUrl={item.imageUrl}
          />
        )}
      />
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
    List: {
        width: '100%',
        alignItems: 'center',
    },
});

export default Home;

