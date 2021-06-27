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
        navigation.navigate('derivativeFormula', {
            title: 'Các công thức đạo hàm',
        });
    }
    const _onPressIntegralFormula = () => {
        navigation.navigate('integralFormula', {
            title: 'Các công thức tích phân',
        });
    }
    return(
        <View style={{flexDirection: 'row',padding:15,justifyContent:'space-around'}}>
            <TouchableOpacity onPress={_onPressDerivativeFormula} style={{borderWidth:0.5,padding: 20, backgroundColor:'#54CCB6',borderColor:'#54CCB6',alignItems: 'center',width:'40%',borderRadius:10}}>
                <Image source={require('../../../resource/images/maths_daoham.png')}/>
                <Text style={{color:'white',fontWeight:'bold'}}>ĐẠO HÀM</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_onPressIntegralFormula} style={{borderWidth:0.5,padding: 20,backgroundColor:'#ff7733',borderColor:'#ff7733',alignItems: 'center',width:'40%',borderRadius:10}}>
                <Image source={require('../../../resource/images/maths_tichphan.png')}/>
                <Text style={{color:'white',fontWeight:'bold'}}>TÍCH PHÂN</Text>
            </TouchableOpacity>
        </View>
    )
}