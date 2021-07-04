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
      case 'derivativeFormula':
        return (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginHorizontal: 15,marginTop:5}}
              onPress={this.onGoBack}>
              <IconArrowLeft size={18} color={'white'}/>
            </TouchableOpacity>
            <Text style={{color:'white',fontSize:22}}>Các công thức đạo hàm</Text>
          </View>
        );
        case 'integralFormula':
        return (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginHorizontal: 15,marginTop:5}}
              onPress={this.onGoBack}>
              <IconArrowLeft size={18} color={'white'}/>
            </TouchableOpacity>
            <Text style={{color:'white',fontSize:22}}>Các công thức tích phân</Text>
          </View>
        );
        case 'trigonometricFormula':
        return (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginHorizontal: 15,marginTop:5}}
              onPress={this.onGoBack}>
              <IconArrowLeft size={18} color={'white'}/>
            </TouchableOpacity>
            <Text style={{color:'white',fontSize:22}}>Các công thức lượng giác</Text>
          </View>
        );
        case 'SettingScreen':
        return (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginHorizontal: 15,marginTop:5}}
              onPress={this.onGoBack}>
              <IconArrowLeft size={18} color={'white'}/>
            </TouchableOpacity>
            <Text style={{color:'white',fontSize:22}}>Thông tin phần mềm</Text>
          </View>
        );
        case 'DashboardScreen':
        return (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginHorizontal: 15,marginTop:5}}
              onPress={this.onOpenDrawer}>
              <IconBar size={18} color={'white'}/>
            </TouchableOpacity>
            <Text style={{color:'white',fontSize:22}}>Tích phân</Text>
          </View>
          
        );
        case 'AnalyticsScreen':
        return (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginHorizontal: 15,marginTop:5}}
              onPress={this.onOpenDrawer}>
              <IconBar size={18} color={'white'}/>
            </TouchableOpacity>
            <Text style={{color:'white',fontSize:22}}>Đạo hàm</Text>
          </View>
          
        );
        case 'LinearAlgebraScreen':
        return (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginHorizontal: 15,marginTop:5}}
              onPress={this.onOpenDrawer}>
              <IconBar size={18} color={'white'}/>
            </TouchableOpacity>
            <Text style={{color:'white',fontSize:22}}>Hệ phương trình</Text>
          </View>
        );
        case 'DiscreteMathScreen':
        return (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginHorizontal: 15,marginTop:5}}
              onPress={this.onOpenDrawer}>
              <IconBar size={18} color={'white'}/>
            </TouchableOpacity>
            <Text style={{color:'white',fontSize:22}}>Tổng hợp các bài toán</Text>
          </View>
        );
        case 'Math':
        return (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginHorizontal: 15,marginTop:5}}
              onPress={this.onOpenDrawer}>
              <IconBar size={18} color={'white'}/>
            </TouchableOpacity>
            <Text style={{color:'white',fontSize:22}}>Tổng hợp công thức</Text>
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
      <SafeAreaView style={{backgroundColor: '#54CCB6'}}>
        <View
          style={{
            height: 45,
            backgroundColor: '#54CCB6',
            borderBottomWidth: 1,
            borderBottomColor: '#54CCB6',
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
