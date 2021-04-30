import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';

export default class ChangePasswordScreen extends React.Component {
  onGoBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Text>This is Change Password Screen</Text>
          <TouchableOpacity onPress={this.onGoBack}>
            <Text>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
