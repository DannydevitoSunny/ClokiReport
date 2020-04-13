import React from "react";
import './Custom_styles/style_one.css'
import { MyProvider, MyContext } from "./globalConfig.js";



class ApiKey extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      url:"http://localhost/PHP/SetGlobal.php",
      origin:"conf",
    }

    this.LocalZone= "Spain";
   
  }
  render() {
    return (
      <MyContext.Consumer>
        {(value) => (
          <div  >
            <section className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1>Configuration</h1>
                  </div>
                </div>
              </div>
            </section>

            <section className="content">


              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Current ApKey: <b>{value.state.ApiKey}</b></h3>

                  <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                      <i className="fas fa-minus"></i></button>

                  </div>
                </div>
                <div className="card-body">
                  <input type="text" ref={mykey => (this.mykey = mykey)} ></input><br></br>
                </div>

              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Language: </h3>

                  <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                      <i className="fas fa-minus"></i></button>

                  </div>
                </div>
                <div className="card-body">
                <select ref={lang => (this.lang = lang)} >
                    <option disabled selected>Select</option>
                    <option value="IN">IN</option>
                    <option value="ES">ES</option>
                  </select>
                </div>

              </div>

              {/* @@@@@@@@@@@@@@@@@@ S A V E  C H A N GE  @@@@@@@@@@@@@@@@@@@@@@ */}
              <div className="card" style={{textAlign:"center"}}>
                <div className="card-body" style={{textAlign:"center"}}>
                  <button className="btn btn-dark text-warning"
                      onClick={() => {
                          this.postRequest = "&apikey="+this.mykey.value+"&lang="+this.lang.value+"&localZone="+this.LocalZone+"&id="+value.state.id;
                          this.data = [this.state.url, this.state.origin, this.postRequest];
                          value.submit(this.data);
                      }
                      }>
                      Save
                  </button>
                </div>

              </div>
              
            </section>
          </div>
           
       )}
      </MyContext.Consumer>

    )

  }

}
export default ApiKey;

