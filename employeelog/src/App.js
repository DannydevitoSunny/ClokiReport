import React from 'react';
import RouteSS from './components/Routes.js'
import Login from './components/login.js'
import { Component } from 'react';



class App extends Component{
  constructor(){
    super()
    this.state={
      logIn : false
    }

    this.changeState=(value)=>{
      this.setState({logIn:value});
    }
  }
  render(){
    return (
      
      <div>
        {(this.state.logIn===false)? <Login login={this.changeState}/> : <RouteSS/>}
      </div>
       
 
   );
  }
}

export default App;
