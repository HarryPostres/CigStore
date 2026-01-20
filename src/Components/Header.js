import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import theme from '../themes';
import {  useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = ({title = "CigsStore"}) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={[ styles.container,
              {paddingTop: insets.top}
         ]}>
            <Text style={styles.text}>CigsStore</Text>
        </View>
        )
    }

    const styles = StyleSheet.create({ 

        container: {
            
            backgroundColor: theme.colors.red,
            height: 45,
            width: 310,
            justifyContent: 'center',
            paddingHorizontal: theme.spacing.md,      
        alignSelf: 'center',
        },
        text: {
            color: theme.colors.black,
            fontSize: theme.typography.fontSize.xxl,
            fontFamily: theme.typography.fontFamily.regular,
            textAlign: 'center',    
        },
      
});

 export default Header;       
