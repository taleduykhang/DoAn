import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {withGlobalContext} from '../../../GlobalContextProvider';
import {IconCog, IconSignOut} from '../../../resource/icons';

class DrawerFooter extends React.PureComponent {
  onSettings = () => {
    this.props.navigation.navigate('SettingScreen', {
      title: 'Thông tin phần mềm',
    });
  };

  onLogout = () => {
    const {setSignin} = this.props.global;
    setSignin();
  };

  render() {
    return (
      <View style={styles.conatiner}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this.onSettings}>
          <Text style={styles.itemText}>
            <IconCog size={16} color={'#FFA400'}/> Thông tin
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer} onPress={this.onLogout}>
          <Text style={styles.itemText}>
            <IconSignOut size={16} color={'red'}/> Trở về
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(withGlobalContext(DrawerFooter));

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
