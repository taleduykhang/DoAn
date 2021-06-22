import React from 'react';
import {View, Text, TouchableOpacity,Image} from 'react-native';
import {withGlobalContext} from '../../../GlobalContextProvider';

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
      <View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'white'}}>
        <Image
          source={require('../../../resource/images/LogoHutech.png')}
          style={{marginBottom:-50,}}
        />
        <Text style={{marginBottom:150,color:'#0074BD',fontSize:20}}>Chào mừng bạn đến với phần mềm giải toán</Text>
        <TouchableOpacity style={{padding: 15,marginBottom:150,backgroundColor:'#54CCB6',borderRadius:30}} onPress={this.onPressLogin}>
          <Text style={{fontSize:24,color:'white',fontWeight:'bold'}}>Bắt đầu</Text>
        </TouchableOpacity>
        <Text style={{color:'rgba(142, 142, 142, 1)',fontSize:13}}>HKL-TEAM - Version 1.0.0</Text>
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
