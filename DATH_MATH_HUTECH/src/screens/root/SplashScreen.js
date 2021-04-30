import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import {withGlobalContext} from '../../GlobalContextProvider';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
class SplashScreen extends React.Component {
  componentDidMount() {
    const {setSplash} = this.props.global;
    setTimeout(() => {
      setSplash();
      this.props.navigation.navigate('Authentication', {screen: 'LoginScreen'});
    }, 2000);
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'white'}}>
        <Image
          source={require('../../resource/images/LogoHutech.png')}
        />
      </View>
    );
  }
}

export default withGlobalContext(SplashScreen);
