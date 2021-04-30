import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Components
import Header from './Header';
import NotificationScreen from '../../screens/notification';

const Stack = createStackNavigator();

export default NotificationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => {
          return <Header {...props} />;
        },
      }}>
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
    </Stack.Navigator>
  );
};
