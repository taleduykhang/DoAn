import {
    StyleSheet
} from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerLoading: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'white',
        alignItems: 'center'
    },
    screen: {
        alignItems: 'center',
        flex: 1,
    },
    titleResult: {
        fontSize: 23,
        borderBottomWidth: 1,
        width: '100%',
        textAlign: 'center',
        paddingBottom: 15,
        paddingTop: 15
    },
    title: {
        fontSize: 35,
        marginVertical: 40,
    },
    image: {
        height: 300,
        width: 300,
        marginTop: 30,
        borderRadius: 10,
    },
    buttonCamera: {
        width: 80,
        height: 80,
        backgroundColor: 'gray',
        color: '#fff',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 0.5,
        // marginRight: 10,
    },
    modalView: {
        height: HEIGHT - 50,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 20
    },
    buttonGallery: {
        width: 80,
        height: 80,
        backgroundColor: '#e6f2ff',
        borderColor: '#333333',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 0.5
    },
    input: {
        width: WIDTH - 100,
        height: 50,
        borderRadius: 5,
        fontSize: 14,
        backgroundColor: 'white',
        paddingLeft: 5,
        borderColor: '#333333',
        borderWidth: 0.5
    },
    buttonResult: {
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 50,
        height: 50,
        marginLeft: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: '#333333',
        borderWidth: 0.5
    },
    buttonResultImage: {
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 30,
        height: 30,
        marginLeft: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#333333',
        borderWidth: 0.5
    },
    textLoading: {
        fontSize: 13,
        color: '#54CCB6'
    },
    resultContainer: {
        alignItems: 'center',
        backgroundColor: '#54CCB6',
        height: '10%',
        justifyContent: 'center',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20
    },
    textResults: {
        fontSize: 26,
        color: 'white',
        fontWeight: 'bold'
    },
    mathContainer: {
        alignItems: 'center',
        borderBottomWidth: 0.5,
        flexDirection: 'row'
    },
    textMath: {
        marginLeft: 15,
        paddingTop: 3
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'white',
        alignItems: 'center'
    },
    
});

export default styles;