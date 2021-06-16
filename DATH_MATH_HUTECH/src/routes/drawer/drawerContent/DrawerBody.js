import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet,Image} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {IconMath3, IconMath4,IconMath1,IconMath2} from '../../../resource/icons';
import MathView, { MathText } from 'react-native-math-view';
class DrawerBody extends React.PureComponent {
  onGoToDashboard = () => {
    this.props.navigation.navigate('DashboardScreen', {
      title: 'Tích phân',
    });
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
      title: 'Ma trận',
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
            value={'$\\frac{d}{dx} $ Đạo hàm'}
            direction="ltr"
          />
        </TouchableOpacity>
        
        <View style={{height:1,backgroundColor:'gray'}}></View>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this.onGoToLinearAlgebra}>
          <Image source={require('../../../resource/images/lim.png')}/>
          <Text style={{marginLeft: 10,paddingVertical:15}}>Hệ phương trình</Text>
        </TouchableOpacity>
        <View style={{height:1,backgroundColor:'gray'}}></View>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this.onGoToDiscreteMath}>
          <Text style={styles.itemText}>
          <Image source={require('../../../resource/images/lim.png')}/>
          <Text style={{marginLeft: 10,paddingVertical:15}}>Ma trận</Text>
          </Text>
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
