import React, { Component } from 'react';

export const MyContext = React.createContext();

export class MyProvider extends Component {
    constructor(props){
        super(props)
        this.state = {
            CIF:"",
            Company:"",
            ApiKey:"Key Required",
            lang: "IN",
            UserName: "",
            email:"",
            id:"",
            Warning:"",
            session:"",
            breakTime:"1"
        }

        
       
        this.updateConfig=(update)=>{
          /*Making a request after login or after change the configuration
          ----seting new states
          ----- update is true or false*/
        }

        this.request = (data) => {
          /* THIS FUNCTION MANAGE USER SESSIONS AND ALL CHANGES IN THE CONFIGURATION */
          var xhttp = new XMLHttpRequest();
          xhttp.open("POST", data[0], true);
          xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
          xhttp.send(data[2]);
          xhttp.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                /* let result =this.responseText;
                console.log(result) */
                  let result = JSON.parse(this.responseText);
                  console.log(result)
                  myCallback(result);
              }
          };

   

          var myCallback = (result) => {
            switch (data[1]) {
              case "reg": this.StartSession(result); break;
              case "log": this.StartSession(result);break;
              case "conf":this.updateGlobal(); break;
              case "update":this.SetNewValues(result); break; 
              case "facebook":this.StartSession(result); break;          
              default:break;
            }
             


          }
          this.StartSession=(r)=>{
            
            if (r["success"] === "true") {
              let id = r["id"];
              let obj = JSON.stringify({"id":id})
              localStorage.setItem("userNameSession", obj);
              this.updateGlobal();
            }
            else {
                this.setState({
                  Warning:r["warning"],
                })
            }
            
          }


      }

      this.CloseSession=()=>{
       localStorage.clear();
          this.setState({session:""})
       }


      this.updateGlobal=()=>{
        let id = JSON.parse(localStorage.getItem("userNameSession"));
        let postRequest = "&id=" + id.id;
        let data = ["http://localhost/PHP/GetGlobal.php", "update", postRequest]
        this.request(data);

      }
     
      this.SetNewValues=(r)=>{
        this.setState({Warning:r[""]});
        this.setState({session:r["success"]})
        this.setState({email:r["email"]});
        this.setState({UserName:r["name"]});
        this.setState({id:r["id"]});
        this.setState({ApiKey:r["apikey"]});
        this.setState({lang:r["lang"]});
        this.setState({breakTime:r["breakTime"]});
        this.setState({Company:r["company"]});
        this.setState({CIF:r["CIF"]})
     
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
          submit: this.request,
          closeSession: this.CloseSession,
        }}>
        {this.props.children}{/*-->This is required, you can't change this name, otherwise you get an error */}
      </MyContext.Provider>
    )
  }
}