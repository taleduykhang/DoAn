import React from 'react';
import {View,Image, Dimensions} from 'react-native';
const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');
export default class DrawerHeader extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          flexGrow: 1,
          borderBottomWidth: 1,
          borderBottomColor: '#54CCB6',
          alignItems: 'center',
          height: 150,
          backgroundColor:'#54CCB6'
        }}>
        <Image
          source={require('../../../resource/images/logoHutech4.png')}
          style={{
            //marginTop:15,
            width: 250,
            height:250,
          }}
        />
      </View>
    );
  }
}
