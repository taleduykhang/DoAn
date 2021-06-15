import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//Routes
import DashboardStack from '../dashboard/DashboardStack';
import NotificationStack from '../notification/NotificationStack';

const Tab = createBottomTabNavigator();

export default DrawerNavigator = () => {
  
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';
    if (routeName === 'SettingScreen') {
      return false;
    }
    if (routeName === 'AnalyticsScreen') {
      return false;
    }
    if (routeName === 'LinearAlgebraScreen') {
      return false;
    }
    if (routeName === 'DiscreteMathScreens') {
      return false;
    }
    if (routeName === 'DashboardScreen') {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="DashboardStack"
        component={DashboardStack}
        options={({route}) => ({
          title: 'Tích phân',
          tabBarVisible: getTabBarVisibility(route),
          
        })}
      />
      {/* <Tab.Screen
        name="NotificationStack"
        component={NotificationStack}
        options={{title: 'Tích phân'}}
      /> */}
    </Tab.Navigator>
  );
};
