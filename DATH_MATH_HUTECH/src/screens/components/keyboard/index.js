import React, { useLayoutEffect, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import MathView, { MathText } from 'react-native-math-view';
import Button from '../button'
const Keyboard= (props) => {
    const _onPressMu = () => {
        props.onPressMu();
    };
    const _onPressMu2 = () => {
        props.onPressMu2();
    };
    
    const _onPressCan = () => {
        props.onPressCan();
    };
    const _onPressCan2 = () => {
        props.onPressCan2();
    };
    const _onPressClear = () => {
        props.onPressClear();
    };
    const _onPressX = () => {
        props.onPressX();
    };
    const _onPressY = () => {
        props.onPressY();
    };

    const _onPressPhan = () => {
        props.onPressPhan();
    };
    const _onPressPhanSo = () => {
        props.onPressPhanSo();
    };
    const _onPressLog = () => {
        props.onPressLog();
    };
    const _onPressLogE = () => {
        props.onPressLogE();
    };
    const _onPressChia = () => {
        props.onPressChia();
    };

    const _onPressCong = () => {
        props.onPressCong();
    };

    const _onPressTru = () => {
        props.onPressTru();
    };

    const _onPressNhan = () => {
        props.onPressNhan();
    };

    const _onPressSin = () => {
        props.onPressSin();
    };
    const _onPressCos = () => {
        props.onPressCos();
    };
    const _onPressTan = () => {
        props.onPressTan();
    };
    const _onPressCot = () => {
        props.onPressCot();
    };
    const _onPressBang = () => {
        props.onPressBang();
    };
    const _onPressSpace = () => {
        props.onPressSpace();
    };
    return (
        <View style={{backgroundColor: 'white',marginTop:10,white:'100%'}}>
            <View style={{flexDirection:'row'}}>
            <Button math={'$$x$$'} onPress={_onPressX} style={styles.btnWhite}/>
                <Button math={'$$x^{a}$$'} onPress={_onPressMu} style={styles.btn}/>
                <Button math={'$$x^{2}$$'} onPress={_onPressMu2} style={styles.btn}/>
                <Button math={'$$\\sqrt{a}$$'} onPress={_onPressCan2} style={styles.btn}/>
                <Button math={'$$\\frac{ a }{  b }$$'} onPress={_onPressPhan} style={styles.btn}/>
                <Button math={'AC'} onPress={_onPressClear} style={styles.btnClear}/>
            </View>
            <View style={{flexDirection:'row'}}>
                <Button math={'$$y$$'} onPress={_onPressY} style={styles.btnWhite}/>
                <Button math={'$$\\log_{ e }( { a } )$$'} onPress={_onPressLogE} style={styles.btn}/>
                <Button math={'$$\\log ( a )$$'} onPress={_onPressLog} style={styles.btn}/>
                <Button math={'$$\\sqrt[b]{a}$$'} onPress={_onPressCan} style={styles.btn}/>
                <Button math={'$$ {a}  \\frac { b } { c }$$'} onPress={_onPressPhanSo} style={styles.btn}/>
                <Button math={'$$\\div$$'} onPress={_onPressChia} style={styles.btnWhite}/>
            </View>
            <View style={{flexDirection:'row'}}>
                <Button math={'$$\\sin(a)$$'} onPress={_onPressSin} style={styles.btn}/>
                <Button math={'$$\\cos(a)$$'} onPress={_onPressCos} style={styles.btn}/>
                <Button math={'$$\\tan (a)$$'} onPress={_onPressTan} style={styles.btn}/>
                <Button math={'$$\\cot (a)$$'} onPress={_onPressCot} style={styles.btn}/>
                <Button math={'$$-$$'} onPress={_onPressTru} style={styles.btnWhite}/>
                <Button math={'X'} onPress={_onPressNhan} style={styles.btnWhite}/>
            </View>
            <View style={{flexDirection:'row'}}>
                {/* <Button math={'$$\\tan (a)$$'} onPress={_onPressTan} style={styles.btn}/>
                <Button math={'$$\\cot (a)$$'} onPress={_onPressCot} style={styles.btn}/>
                <Button math={'$$x^{2}$$'} onPress={_onPressMu} style={styles.btn}/> */}
                <Button math={''} onPress={_onPressSpace} style={styles.btnSpace}/>
                <Button math={'$$+$$'} onPress={_onPressCong} style={styles.btnWhite}/>
                <Button math={'$$=$$'} onPress={_onPressBang} style={styles.btnWhite}/>
            </View>
        </View>
        
    )
}
export default Keyboard;

const styles = StyleSheet.create({
    btn: {
        // borderWidth:1,
        width:60,
        alignItems: 'center',
        margin:5,
        borderRadius: 5,
        backgroundColor:'#E5E5E5'
    },
    btnClear: {
        justifyContent:'space-around',
        width:60,
        alignItems: 'center',
        margin:5,
        borderRadius: 5,
        backgroundColor:'rgba(142, 142, 142, 1)'
    },
    btnWhite:{
        justifyContent:'space-around',
        width:60,
        alignItems: 'center',
        margin:5,
        borderRadius: 5,
        backgroundColor:'white',
        borderWidth:1,
        borderColor: '#E5E5E5',
    },
    btnSpace:{
        justifyContent:'space-around',
        width:270,
        alignItems: 'center',
        margin:5,
        borderRadius: 5,
        backgroundColor:'white',
        borderWidth:1,
        borderColor: '#E5E5E5',
    }
  });