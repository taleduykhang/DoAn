import {
    StyleSheet
} from 'react-native';
const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        flex: 1,
    },
    container: {
        width: '100%',
        backgroundColor: 'white',
        marginBottom: 10,
        paddingHorizontal: 20
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
    btnImage: {
        marginTop: 10,
        marginLeft: -40,
        marginRight: 15
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
    containerTop: {
        flexDirection: 'row',
        marginTop: 30,
        width: '100%'
    },
    containerCenter: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'white',
        marginTop: 10
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
    containerModalImage: {
        flexDirection: 'row',
        backgroundColor: "rgba(221, 247, 232, 1)",
        borderRadius: 20,
        height: 150,
        margin: 40,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 0.5
    },
    exampleContainer: {
        justifyContent: "center",
        paddingVertical: 10
    },
    example: {
        backgroundColor: 'white',
        padding: 10,
        height: 100
    },
    modalResults: {
        alignItems: 'center',
        backgroundColor: '#54CCB6',
        height: '10%',
        justifyContent: 'center',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20
    }
});

export default styles;