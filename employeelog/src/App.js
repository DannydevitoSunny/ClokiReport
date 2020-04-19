import React from 'react';
import Login from './components/login.js'
import {MyProvider } from './components/globalConfig.js'



class App extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <MyProvider>{/* Inside My provider all components can access the global Data */}
        <div>
          <Login/>
        </div>
      </MyProvider>



    );
  }
}

export default App;
