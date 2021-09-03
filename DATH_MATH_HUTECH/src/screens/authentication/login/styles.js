import {
    StyleSheet
} from 'react-native';
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    logo:{
        marginBottom: -50,
    },
    title: {
        marginBottom: 150,
        color: '#0074BD',
        fontSize: 20
    },
    btn: {
        padding: 15, 
        marginBottom: 150, 
        backgroundColor: '#54CCB6', 
        borderRadius: 30
    },
    text: {
        fontSize: 24, 
        color: 'white', 
        fontWeight: 'bold'
    },
    versionName: {
        color: 'rgba(142, 142, 142, 1)', 
        fontSize: 13
    }
});

export default styles;