import React from 'react';
import {View, Text} from 'react-native';

export default class Notification extends React.PureComponent {
  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Notification Screen</Text>
      </View>
    );
  }
}
