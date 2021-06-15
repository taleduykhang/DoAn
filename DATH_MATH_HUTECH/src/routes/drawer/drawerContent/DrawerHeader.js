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
          borderBottomColor: '#E5E5E5',
          alignItems: 'center',
          height: 150
        }}>
        <Image
          source={require('../../../resource/images/LogoHutech.png')}
          style={{
            marginTop:15,
            width: 200,
            height:200,
          }}
        />
      </View>
    );
  }
}
