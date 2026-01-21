import { View, Text, Image, StyleSheet, FlatList, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../themes";
import Header from "../Components/Header";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import ProductCard from "../Components/ProductCard";
import { useEffect, useState } from "react";


const Products = () => {
const [Products, setProducts] = useState([]);
const navigation = useNavigation();

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

return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.text}>Productos</Text>

        <FlatList
            data = {Products}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.list}
            keyExtractor={(item) => item.id}
            renderItem ={({item}) => (
                <ProductCard 
                nombre={item.nombre}
                price={item.price}
                imageUrl={item.imageUrl}
                />
            )}
        />
    </View>
  );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontSize: theme.typography.fontSize.xxl,
        fontFamily: theme.typography.fontFamily.bold,
        textAlign: 'center',
        paddingTop: theme.spacing.md,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: theme.spacing.lg,
    },
    list: {
        paddingBottom: theme.spacing.md,
    },

});
export default Products;