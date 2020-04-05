import React, { Component } from 'react';

export const MyContext = React.createContext();

export class MyProvider extends Component {
    constructor(props){
        super(props)
        this.state = {
            ApiKey:"XWor3IxeV2M9g/mQ",
            Lenguage: "Eng",
            LocalTime: "Spain",
            UserName: "Ruslan"
        }

        this.setKeyFun = (key)=>{
            if (key != "") {
                this.setState({
                    ApiKey:key,
                })
                }
            else{
                this.setState({
                    ApiKey:"You need set a Key",
                })
            }
        }
    }
    
  render() {
    return (
      <MyContext.Provider value={{
          state: this.state, 
          setKey: this.setKeyFun,
        }}>
        {this.props.children}{/*-->This is required, you can't change this name, otherwise you get an error */}
      </MyContext.Provider>
    )
  }
}