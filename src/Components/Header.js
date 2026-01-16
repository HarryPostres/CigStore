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
            paddingHorizontal: theme.spacing.lg,
            backgroundColor: theme.colors.primary,
            paddingBottom: theme.spacing.md,
            alignItems: 'center',
            justifyContent: 'center',

    },
    text: {
        color: theme.colors.white,
        fontSize: theme.typography.fontSize.lg,
        fontFamily: theme.typography.fontFamily.bold,
    },

});

 export default Header;       
