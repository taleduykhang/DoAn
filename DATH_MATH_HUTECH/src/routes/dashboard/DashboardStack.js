import React from 'react';
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from '@react-navigation/stack';

//Components
import Header from './Header';
import DashboardScreen from '../../screens/dashboard';
import DashboardDetail from '../../screens/dashboard/details';
import AnalyticsScreen from '../../screens/modules/analytics';
import LinearAlgebraScreen from '../../screens/modules/linearAlgebra';
import DiscreteMathScreen from '../../screens/modules/discreteMath';
import SettingScreen from '../../screens/dashboard/settings';

const Stack = createStackNavigator();

export default DashboardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => {
          return <Header {...props} />;
        },
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      
      <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
      <Stack.Screen name="AnalyticsScreen" component={AnalyticsScreen} />
      <Stack.Screen name="DashboardDetail" component={DashboardDetail} />     
      <Stack.Screen name="LinearAlgebraScreen" component={LinearAlgebraScreen} />
      <Stack.Screen name="DiscreteMathScreen" component={DiscreteMathScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
    </Stack.Navigator>
  );
};
