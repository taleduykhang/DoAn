import React from 'react';
import {View, Text, TouchableOpacity,Image} from 'react-native';
import {withGlobalContext} from '../../../GlobalContextProvider';

class LoginScreen extends React.Component {
  componentDidUpdate(prevProps) {
    // if (
    //   this.props.global.isSignin !== prevProps.global.isSignin &&
    //   this.props.global.isSignin
    // ) {
    //   this.props.navigation.navigate('DrawerNavigation', {
    //     screen: 'BottomTab',
    //     params: {
    //       screen: 'DashboardStack',
    //       params: {
    //         screen: 'DashboardScreen',
    //         params: {
    //           title: 'Dashboard',
    //           userName: '123',
    //           url: 'https://abc',
    //         },
    //       },
    //     },
    //   });
    // }
  }

  onPressLogin = () => {
    const {setSignin} = this.props.global;
    setSignin();
  };

  onPressResetPassword = () => {
    this.props.navigation.navigate('ChangePasswordScreen');
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'white'}}>
        <Image
          source={require('../../../resource/images/LogoHutech.png')}
          style={{
            
          }}
        />
        <TouchableOpacity style={{padding: 10}} onPress={this.onPressLogin}>
          <Text>Bắt đầu</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{padding: 10}}
          onPress={this.onPressResetPassword}>
          <Text>Reset password</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

export default withGlobalContext(LoginScreen);
