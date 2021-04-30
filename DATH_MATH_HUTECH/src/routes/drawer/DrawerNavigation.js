import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

//Routes
import BottomTab from '../tabbar/BottomTab';

//Components
import DrawerContent from './drawerContent';

const Drawer = createDrawerNavigator();

export default DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="BottomTab" component={BottomTab} />
    </Drawer.Navigator>
  );
};
