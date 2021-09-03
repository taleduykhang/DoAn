import React from 'react';
import {View, Text, TouchableOpacity,Image} from 'react-native';
import {withGlobalContext} from '../../../GlobalContextProvider';
import styles from './styles'
class LoginScreen extends React.Component {
  // componentDidUpdate(prevProps) {
  //   // if (
  //   //   this.props.global.isSignin !== prevProps.global.isSignin &&
  //   //   this.props.global.isSignin
  //   // ) {
  //   //   this.props.navigation.navigate('DrawerNavigation', {
  //   //     screen: 'BottomTab',
  //   //     params: {
  //   //       screen: 'DashboardStack',
  //   //       params: {
  //   //         screen: 'DashboardScreen',
  //   //         params: {
  //   //           title: 'Dashboard',
  //   //           userName: '123',
  //   //           url: 'https://abc',
  //   //         },
  //   //       },
  //   //     },
  //   //   });
  //   // }
  // }

  onPressLogin = () => {
    const {setSignin} = this.props.global;
    setSignin();
  };

  onPressResetPassword = () => {
    this.props.navigation.navigate('ChangePasswordScreen');
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../../resource/images/LogoHutech.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Chào mừng bạn đến với phần mềm giải toán</Text>
        <TouchableOpacity style={styles.btn} onPress={this.onPressLogin}>
          <Text style={styles.text}>Bắt đầu</Text>
        </TouchableOpacity>
        <Text style={styles.versionName}>HKL-TEAM - Version 1.0.0</Text>
      </View>
    );
  }
}

export default withGlobalContext(LoginScreen);
