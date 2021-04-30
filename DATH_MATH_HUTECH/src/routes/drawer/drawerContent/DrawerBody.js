import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {IconMath3, IconMath4,IconMath1,IconMath2} from '../../../resource/icons';

class DrawerBody extends React.PureComponent {
  onGoToDashboard = () => {
    this.props.navigation.navigate('DashboardScreen', {
      title: 'Giải toán',
    });
  };

  onGoToAnalytics = () => {
    this.props.navigation.navigate('AnalyticsScreen', {
      title: 'Giải tích 1',
    });
  };
  onGoToLinearAlgebra = () => {
    this.props.navigation.navigate('LinearAlgebraScreen', {
      title: 'Đại số tuyến tính',
    });
  };
  onGoToDiscreteMath = () => {
    this.props.navigation.navigate('DiscreteMathScreen', {
      title: 'Toán rời rạc',
    });
  };
  render() {
    return (
      <View style={{flex: 7}}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this.onGoToDashboard}>
          <Text style={styles.itemText}>
            <IconMath1 size={16} color={'red'}/> Giải toán
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this.onGoToAnalytics}>
          <Text style={styles.itemText}>
            <IconMath2 size={16} color={'blue'} />  Giải tích 1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this.onGoToLinearAlgebra}>
          <Text style={styles.itemText}>
            <IconMath4 size={16} /> Đại số tuyến tính
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this.onGoToDiscreteMath}>
          <Text style={styles.itemText}>
            <IconMath3 size={16} />  Toán rời rạc
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
  },
  itemText: {
    fontSize: 16,
  },
});
