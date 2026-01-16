
import { View, Text, StyleSheet } from "react-native";
import Header from "../Components/Header";
import theme from "../themes";

const Home = () => {
    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.welcomeText}>Welcome to CigsStore!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    welcomeText: {
        fontSize: theme.typography.fontSize.lg,}
    });

export default Home;
