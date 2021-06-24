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
        <View>
            <TouchableOpacity onPress={_onPressDerivativeFormula}>
                <Text>Công thức tính đạo hàm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_onPressIntegralFormula}>
                <Text>Công thức tính tích phân</Text>
            </TouchableOpacity>
        </View>
    )
}