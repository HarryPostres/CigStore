import {View, Text,Pressable} from 'react-native';
import {StyleSheet} from 'react-native';
import theme from '../themes';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import {  useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = ({title = "CigsStore"}) => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const canGoBack = navigation.canGoBack();

    return (
        <View style ={styles.wraper}>
        <View style = {[styles.safeArea, {height: insets.top}]} />
        
        <View style={ styles.container}>
            {canGoBack && (
                <Pressable onPress={() => navigation.goBack()}
                style={styles.backButton}>
                    <Text style={styles.backText}>←</Text>
                </Pressable>
            )}
             

            <Text style={styles.text}>CigsStore</Text>
        </View>
    
        </View>
        );
    };

    const styles = StyleSheet.create({ 

        wraper: {
            width: '100%',
            backgroundColor: theme.colors.red,
        },
        safeArea: {
            width: '100%',
        },
        container: {
           height: 60,
           flexDirection: 'row',
           alignItems: 'center',
           justifyContent: 'center',
           paddingHorizontal: theme.spacing.md,     
        },
        backButton: {
            position: 'absolute',
            left: theme.spacing.md,
        },
        text: {
            color: theme.colors.black,
            fontSize: theme.typography.fontSize.xxl,
            fontFamily: theme.typography.fontFamily.regular,
            textAlign: 'center',    
        },
        backText: {
            color: theme.colors.black,
            fontFamily: theme.typography.fontFamily.regular,
            fontSize: theme.typography.fontSize.xxl,
        }
      
});

 export default Header;       
