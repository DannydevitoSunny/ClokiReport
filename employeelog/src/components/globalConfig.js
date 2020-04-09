import React, { Component } from 'react';

export const MyContext = React.createContext();

export class MyProvider extends Component {
    constructor(props){
        super(props)
        this.state = {
            ApiKey:"XWor3IxeV2M9g/mQ",
            Lenguage: "Eng",
            LocalTime: "Spain",
            UserName: "Ruslan",
            Warning:"",
            session:""
        }

        
       
        this.updateConfig=(update)=>{
          /*Making a request after login or after change the configuration
          ----seting new states
          ----- update is true or false*/
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

        this.request = (data) => {
          /* THIS FUNCTION MANAGE USER SESSIONS AND ALL CHANGES IN THE CONFIGURATION */
          let lastIndex = data.length-1;
          var xhttp = new XMLHttpRequest();
          xhttp.open("POST", data[0], true);
          xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
          xhttp.send(data[lastIndex]);
          xhttp.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                  let result = JSON.parse(this.responseText);
                  console.clear();
                  console.log(result);
                  myCallback(result);
              }
          };

          var myCallback = (result) => {
            switch (data[1]) {
              case "reg": this.reg(result); break;
              case "log": this.log(result);break;
              case "config":this.conf(result); break;            
              default:break;
            }
             


          }
          this.reg=(r)=>{
            console.log(r["success"])
            if (r["success"] === "true") {
              localStorage.setItem("userNameSession", [r["nameUser"],r["email"],[r["success"]]]);
              this.setState({session:r["success"],})
              this.setState({Warning:r[""],})
              this.updateGlobal();
            }
            else {
                this.setState({
                  Warning:r["warning"],
                })
            }
          }

          this.log=(r)=>{
            if (r["success"] === "true") {
              let obj = JSON.stringify({"name":r["nameUser"],"email":r["email"],"success":r["success"]})
              localStorage.setItem("userNameSession", obj);
              this.setState({session:r["success"],})
              this.setState({Warning:r[""],})
              this.updateGlobal();
            }
            else {
                this.setState({
                  Warning:r["warning"],
                })
            }
          }

          this.conf=(r)=>{
              //Config returns all data config from DB
              this.update();

              
          }

          

      }

      this.CloseSession=()=>{
        localStorage.clear();
        this.setState({session:""})
      }


      this.updateGlobal=()=>{
       /*  MAKING A REQUEST TO conf.php AND GET THE LATES VALUES,
        THEN IT SETS NEW STATES FOR ALL GLOBALS */

      }
    }

  componentWillMount() {
      if (localStorage.getItem("userNameSession")!==null) {
        this.updateGlobal();
      }
  }
    
  render() {
    return (
      <MyContext.Provider value={{
          state: this.state, 
          setKey: this.setKeyFun,
          submit: this.request,
          closeSession: this.CloseSession,
        }}>
        {this.props.children}{/*-->This is required, you can't change this name, otherwise you get an error */}
      </MyContext.Provider>
    )
  }
}