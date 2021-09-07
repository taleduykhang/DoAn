import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import styles from './styles'
export default function Math ({navigation}) {

    const _onPressDerivativeFormula = () => {
        navigation.navigate('derivativeFormula');
    }
    const _onPressIntegralFormula = () => {
        navigation.navigate('integralFormula');
    }
    const _onPressTrigonometricFormula = () => {
        navigation.navigate('trigonometricFormula');
    }
    const _onPressInequalityFormula = () => {
        navigation.navigate('inequalityFormula');
    }
    return(
        <View style={styles.container}>
        <View style={styles.containerButton}>
            <TouchableOpacity onPress={_onPressDerivativeFormula} style={styles.btnDerivative}>
                <Image source={require('../../../resource/images/maths_daoham.png')}/>
                <Text style={styles.text}>ĐẠO HÀM</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_onPressIntegralFormula} style={styles.btnIntegral}>
                <Image source={require('../../../resource/images/maths_tichphan.png')}/>
                <Text style={styles.text}>TÍCH PHÂN</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.containerButton}>
            <TouchableOpacity onPress={_onPressTrigonometricFormula} style={styles.btnTrigonometric}>
                <Image source={require('../../../resource/images/trigonometric.png')}/>
                <Text style={styles.text}>LƯỢNG GIÁC</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_onPressInequalityFormula} style={styles.btnInequality}>
                <Image source={require('../../../resource/images/inequality.png')}/>
                <Text style={styles.text}>HẰNG ĐẲNG THỨC</Text>
            </TouchableOpacity>
        </View>

        </View>
        
    )
}