import React from 'react';
import {View,Image} from 'react-native';

export default class DrawerHeader extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          flex: 2,
          borderBottomWidth: 1,
          borderBottomColor: '#E5E5E5',
          alignItems: 'center'
        }}>
        <Image
          source={require('../../../resource/images/LogoHutech.png')}
          style={{
            width: 160,
            height: 120,
          }}
        />
      </View>
    );
  }
}
