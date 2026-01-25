import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../themes";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { Modal } from "react-native";
import AppLayout from "../components/appLayout";


const Products = () => {
const [Products, setProducts] = useState([]);
const navigation = useNavigation();
const [modalVisible, setModalVisible] = useState(false);
const [orderByField, setOrderByField] = useState("marca");
const [orderDirection, setOrderDirection] = useState("asc");
const [selectedType,setSelectedType] = useState(null);




useEffect(() => {
    const fetchProducts = async () => {
      try {
        let q = collection(db, "Products");

        if (selectedType) {
          q = query(q, where("tipo", "==", selectedType))
        }

        q = query(q, orderBy(orderByField, orderDirection));

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, [orderByField, orderDirection, selectedType]);    

return (
    
    <AppLayout>
    <View style={styles.container}>

      <Text style={styles.text}>Productos</Text>

        <Pressable
        style= {styles.filterButton}
        onPress ={() => setModalVisible(true)}>
        <Text style={styles.filterButtonText}>Ordenar por:</Text>
        </Pressable>

      <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable 
              style={styles.ModalOption}
              onPress = {() => {
                setSelectedType(null);
              setOrderByField("marca"); 
              setOrderDirection("asc");
               setModalVisible(false);}}>
              <Text style={styles.ModalText}>Marca</Text>
            </Pressable>

            <Pressable 
              style={styles.ModalOption}              
              onPress = {() => {
                setSelectedType(null);
              setOrderByField("price"); 
              setOrderDirection("asc");
               setModalVisible(false);
            }}>
              <Text style={styles.ModalText}>Precio: Menor a Mayor</Text>
            </Pressable>

            <Pressable 
              style={styles.ModalOption}              
              onPress = {() => {
                setSelectedType(null);
              setOrderByField("price"); 
              setOrderDirection("desc");
               setModalVisible(false);
            }}>
              <Text style={styles.ModalText}>Precio: Mayor a Menor</Text>
            </Pressable>

            {["Rubio", "Mentolado", "Saborizado", "Negro", "Suizo"].map(tipo => (
              <Pressable 
              style={styles.ModalOption}
              key={tipo}
              onPress={() => {
                setSelectedType(tipo)
                setModalVisible(false);
                }}>
              <Text style={styles.ModalText}>{tipo}</Text>
              </Pressable>
            ))}
            
            <Pressable 
              style={styles.ModalCloseButton}
              onPress={() => 
              setModalVisible(false)
              }>
              <Text style={styles.closeText}> Cerrar </Text>
            </Pressable>

          </View>
        </View>
      </Modal>


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
                id= {item.id}
                />
            )}
        />
    </View>
</AppLayout>
  );

}
const styles = StyleSheet.create({
    modalContainer:{
      backgroundColor: theme.colors.cardBackground,
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },

    ModalText:{
      fontSize: theme.typography.fontSize.xxl,
      fontFamily: theme.typography.fontFamily.regular,
      paddingVertical: theme.spacing.md,
      textAlign: 'center',
    },

    modalContent:{},

    ModalOption:{
      backgroundColor: theme.colors.red,
      marginVertical: theme.spacing.md,
      borderRadius: theme.sizes.radiusMd,
    },

    ModalCloseButton:{
      backgroundColor: theme.colors.black,
      borderRadius: theme.sizes.radiusMd,
      padding: theme.spacing.sm,
    },

    closeText:{
         color: theme.colors.white,
         textAlign: 'center',
          fontSize: theme.typography.fontSize.xxl,
          fontFamily: theme.typography.fontFamily.regular,
    },
    filterButtonText:{
      backgroundColor: theme.colors.red,
      width: '50%',
      fontSize: theme.typography.fontSize.xxl,
      fontFamily: theme.typography.fontFamily.regular,
      padding: theme.spacing.sm,
      borderRadius: theme.sizes.radiusSm,
      alignSelf: 'center',
      textAlign: 'center',
      marginVertical: theme.spacing.md,
    },

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