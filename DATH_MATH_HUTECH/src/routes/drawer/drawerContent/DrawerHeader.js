import React from 'react';
import {View,Image, Dimensions} from 'react-native';
const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');
export default class DrawerHeader extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          flex: 2,
          borderBottomWidth: 1,
          borderBottomColor: '#E5E5E5',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../../resource/images/LogoHutech.png')}
          style={{
            marginTop:0,
            width: WIDTH-200,
            height: HEIGHT-640,
          }}
        />
      </View>
    );
  }
}
