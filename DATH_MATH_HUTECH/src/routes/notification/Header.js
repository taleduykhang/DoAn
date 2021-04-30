import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';

import {IconBar} from '../../resource/icons';

export default class Header extends React.PureComponent {
  onOpenDrawer = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    return (
      <SafeAreaView style={{backgroundColor: '#FFFFFF'}}>
        <View
          style={{
            height: 45,
            backgroundColor: '#FFFFFF',
            borderBottomWidth: 1,
            borderBottomColor: '#E5E5E5',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{paddingHorizontal: 10}}
            onPress={this.onOpenDrawer}>
            <IconBar size={18} />
          </TouchableOpacity>
          <Text style={{fontSize: 18}}>Notification</Text>
        </View>
      </SafeAreaView>
    );
  }
}
