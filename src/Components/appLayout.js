import { View,styleSheet } from "react-native-web";
import Header from "./Header";

const AppLayout = ({chidren}) => {
    return (
        <View style = {styles.container}>
            <Header/>
            <View style= {styles.content}>

            </View>
        </View> 
    );
};

const styles = styleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
});

export default AppLayout;