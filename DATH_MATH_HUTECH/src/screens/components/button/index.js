import React, { useLayoutEffect, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import MathView, { MathText } from 'react-native-math-view';

const Button= (props) => {
    const _onPress = () => {
        props.onPress();
    };
    return (
        <TouchableOpacity onPress={_onPress} style={props.style}>
        <MathText
            value={props.math}
            direction="ltr"
        />
    </TouchableOpacity>

    )
}
export default Button;