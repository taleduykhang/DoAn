import React, { useState } from 'react'
import { View, Text } from 'react-native'

const Button = (props) => {
    //const [isIcon, setIsIcon] = useState('');
    return (
        <View>
            <TouchableOpacity style={[styles.button,{backgroundColor:props.bgColor,color:props.txtColor}]}>
                <IconCamera size={90} color={'black'}/>
              </TouchableOpacity>
        </View>
    )
}

export default Button
const styles = StyleSheet.create({
    screen: {
      alignItems: 'center',
      backgroundColor: '#66b3ff',
      flex:1
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
    button: {
      width: 120,
      height: 120,
      backgroundColor: 'gray',
      color: '#fff',
      justifyContent: 'space-around',
      alignItems: 'center',
      // paddingVertical: 25,
      // paddingHorizontal: 30,
      // padding:20,
      borderRadius: 20,
      // marginTop: 20,
    },
  });