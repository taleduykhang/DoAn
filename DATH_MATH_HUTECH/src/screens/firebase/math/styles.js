import {
    StyleSheet
} from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    containerButton: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    btnDerivative: {
        borderWidth: 0.5,
        padding: 20,
        backgroundColor: '#54CCB6',
        borderColor: '#54CCB6',
        alignItems: 'center',
        width: '40%',
        borderRadius: 10
    },
    btnIntegral: {
        borderWidth: 0.5,
        padding: 20,
        backgroundColor: '#ff7733',
        borderColor: '#ff7733',
        alignItems: 'center',
        width: '40%',
        borderRadius: 10
    },
    btnTrigonometric: {
        borderWidth: 0.5,
        padding: 20,
        backgroundColor: '#9999ff',
        borderColor: '#9999ff',
        alignItems: 'center',
        width: '40%',
        borderRadius: 10
    },
    btnInequality: {
        borderWidth: 0.5,
        padding: 20,
        backgroundColor: '#ffcccc',
        borderColor: '#ffcccc',
        alignItems: 'center',
        width: '40%',
        borderRadius: 10
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        paddingTop: 10
    }
});

export default styles;