
import { View, Text, Image, StyleSheet } from "react-native";
import Header from "../Components/Header";
import { useMemo } from "react";
import theme from "../themes";

const images = [
    require('../../assets/images/imagen-1.jpg'),
    require('../../assets/images/imagen-2.jpg'),
    require('../../assets/images/imagen-3.jpg'),
    require('../../assets/images/imagen-4.jpg') ,   
];

const Home = () => {
    const randomImage = useMemo(() => {
        const index = Math.floor(Math.random() * images.length);
        return images [index];
    }, []);
    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.welcomeText}> ¡Bienvenido a CigsStore!</Text>
            <Image
                source={randomImage}
                style = {styles.image}
                resizeMode="contain"
            />

            <Text style={styles.welcomeText}>Te presentamos nuestro stock de cigarrillos:</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container:{ 
        flex:1,
             alignItems:'center',
        padding: theme.spacing.md,
    },
    welcomeText: {
        fontSize: theme.typography.fontSize.xl,
       fontFamily: theme.typography.fontFamily.regular,
       textAlign: 'center'
    },
    image:{
   
        width: 250,
        height:250,
    },
    });

export default Home;
