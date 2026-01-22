import { View,StyleSheet } from "react-native";
import Header from "./Header";
import theme from "../themes";


const AppLayout = ({children}) => {
    return (
        <View style = {styles.container}>
            <Header/>
            <View style= {styles.content}>
                {children}
            </View>
        </View> 
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        flex: 1,
    },
});

export default AppLayout;