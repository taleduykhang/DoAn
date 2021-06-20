import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';

import {IconBar, IconArrowLeft} from '../../resource/icons';

export default class Header extends React.PureComponent {
  onOpenDrawer = () => {
    this.props.navigation.openDrawer();
  };

  onGoBack = () => {
    this.props.navigation.goBack();
  };

  renderHeaderButton = (name, params) => {
    switch (name) {
      case 'DashboardDetail':
        return (
          <TouchableOpacity
            style={{paddingHorizontal: 10}}
            onPress={this.onGoBack}>
            <IconArrowLeft size={18} />
          </TouchableOpacity>
        );
        case 'DashboardScreen':
        return (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{paddingHorizontal: 10}}
              onPress={this.onOpenDrawer}>
              <IconBar size={18} />
            </TouchableOpacity>
            <Text>Tích phân</Text>
          </View>
          
        );
      default:
        return (
          <TouchableOpacity
            style={{paddingHorizontal: 10}}
            onPress={this.onOpenDrawer}>
            <IconBar size={18} />
          </TouchableOpacity>
        );
    }
  };

  render() {
    const {route} = this.props.scene;
    const {name, params} = route;
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
          {this.renderHeaderButton(name, params)}
          <Text style={{fontSize: 18}}>
            {params == undefined ? '' : params.title}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}
