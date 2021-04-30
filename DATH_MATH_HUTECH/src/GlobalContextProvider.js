import React from 'react';
const GlobalContext = React.createContext({});

export class GlobalContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSplash: true,
      isSignin: false,
    };
  }

  setSplash = () => {
    this.setState({
      isSplash: !this.state.isSplash,
    });
  };

  setSignin = () => {
    this.setState({
      isSignin: !this.state.isSignin,
    });
  };

  render() {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          setSplash: this.setSplash,
          setSignin: this.setSignin,
        }}>
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

export default GlobalContextProvider;

export const withGlobalContext = (ChildComponent) => (props) => (
  <GlobalContext.Consumer>
    {(context) => <ChildComponent {...props} global={context} />}
  </GlobalContext.Consumer>
);
