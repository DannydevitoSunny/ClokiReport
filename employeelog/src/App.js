import React from 'react';
import RouteSS from './components/Routes.js'
import Login from './components/login.js'
import { Component } from 'react';
import { MyContext, MyProvider } from './components/globalConfig.js'



class App extends Component {
  constructor() {
    super()
    this.state = {
      logIn: false
    }

    this.changeState = (value) => {
      this.setState({ logIn: value });
    }
  }
  render() {
    return (
      <MyProvider>{/* Inside My provider all components can access tha global Data */}
        <div>
          {(this.state.logIn === false) ? <Login login={this.changeState} /> : <RouteSS />}
        </div>
      </MyProvider>



    );
  }
}

export default App;
