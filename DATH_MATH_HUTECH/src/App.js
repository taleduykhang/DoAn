import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import GlobalContextProvider from './GlobalContextProvider';
import RootNavigation from './routes/root/RootNavigation';

export default class App extends React.Component {
  render() {
    return (
      <GlobalContextProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </GlobalContextProvider>
    );
  }
}
