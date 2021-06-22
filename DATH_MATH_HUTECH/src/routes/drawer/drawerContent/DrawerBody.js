import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet,Image} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {IconMath3, IconMath4,IconMath1,IconMath2} from '../../../resource/icons';
import MathView, { MathText } from 'react-native-math-view';
class DrawerBody extends React.PureComponent {
  onGoToDashboard = () => {
    this.props.navigation.navigate('DashboardScreen');
  };

  onGoToAnalytics = () => {
    this.props.navigation.navigate('AnalyticsScreen', {
      title: 'Đạo hàm',
    });
  };
  onGoToLinearAlgebra = () => {
    this.props.navigation.navigate('LinearAlgebraScreen', {
      title: 'Hệ phương trình',
    });
  };
  onGoToDiscreteMath = () => {
    this.props.navigation.navigate('DiscreteMathScreen', {
      title: 'Tổng hợp các bài toán',
    });
  };
  render() {
    return (
      <View style={{flex: 7}}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this.onGoToDashboard}>
          <Image source={require('../../../resource/images/integral2.png')}/>
          <Text style={{marginLeft: 10,paddingVertical:15}}>Tích phân</Text>
        </TouchableOpacity>
        <View style={{height:1,backgroundColor:'gray'}}></View>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this.onGoToAnalytics}>
          <MathText
            value={'$\\frac{d}{dx}$'}
            direction="ltr"
          />
          <Text style={{marginLeft: 8,paddingVertical:15}}>Đạo hàm</Text>
        </TouchableOpacity>
        
        <View style={{height:1,backgroundColor:'gray'}}></View>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this.onGoToLinearAlgebra}>
          <Image source={require('../../../resource/images/equations.png')}/>
          <Text style={{marginLeft: 12,paddingVertical:15}}>Hệ phương trình</Text>
        </TouchableOpacity>
        <View style={{height:1,backgroundColor:'gray'}}></View>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this.onGoToDiscreteMath}>
          <Image source={require('../../../resource/images/factor.png')}/>
          <Text style={{marginLeft: 12,paddingVertical:15}}>Tổng hợp các bài toán</Text>
          
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(DrawerBody);

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: 'space-evenly',
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5E5',
    paddingVertical: 5,
  },
  itemContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
  },
});
