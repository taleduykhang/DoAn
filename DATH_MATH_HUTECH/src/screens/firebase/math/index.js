import React, { } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
    TextInput,
    Alert,
    FlatList,
    ActivityIndicator,
    SafeAreaView, 
  } from 'react-native';

import MathView, { MathText } from 'react-native-math-view';
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
        <View style={{flex:1,backgroundColor:'white'}}>
        <View style={{flexDirection: 'row',padding:15,justifyContent:'space-around'}}>
            <TouchableOpacity onPress={_onPressDerivativeFormula} style={{borderWidth:0.5,padding: 20, backgroundColor:'#54CCB6',borderColor:'#54CCB6',alignItems: 'center',width:'40%',borderRadius:10}}>
                <Image source={require('../../../resource/images/maths_daoham.png')}/>
                <Text style={{color:'white',fontWeight:'bold',paddingTop: 10}}>ĐẠO HÀM</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_onPressIntegralFormula} style={{borderWidth:0.5,padding: 20,backgroundColor:'#ff7733',borderColor:'#ff7733',alignItems: 'center',width:'40%',borderRadius:10}}>
                <Image source={require('../../../resource/images/maths_tichphan.png')}/>
                <Text style={{color:'white',fontWeight:'bold',paddingTop: 10}}>TÍCH PHÂN</Text>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row',padding:15,justifyContent:'space-around'}}>
            <TouchableOpacity onPress={_onPressTrigonometricFormula} style={{borderWidth:0.5,padding: 20, backgroundColor:'#9999ff',borderColor:'#9999ff',alignItems: 'center',width:'40%',borderRadius:10}}>
                <Image source={require('../../../resource/images/trigonometric.png')}/>
                <Text style={{color:'white',fontWeight:'bold',paddingTop: 10}}>LƯỢNG GIÁC</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_onPressInequalityFormula} style={{borderWidth:0.5,padding: 20,backgroundColor:'#ffcccc',borderColor:'#ffcccc',alignItems: 'center',width:'40%',borderRadius:10}}>
                <Image source={require('../../../resource/images/inequality.png')}/>
                <Text style={{color:'white',fontWeight:'bold',paddingTop: 10}}>HẰNG ĐẲNG THỨC</Text>
            </TouchableOpacity>
        </View>

        </View>
        
    )
}