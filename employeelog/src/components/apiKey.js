import React from "react";
import './Custom_styles/style_one.css'
import { MyProvider, MyContext } from "./globalConfig.js";



class ApiKey extends React.Component {
  constructor(props) {
    super(props);
    this.myKey = "";
   
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
                  <h3 className="card-title">Introduce your Api-Key below here: </h3>

                  <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                      <i className="fas fa-minus"></i></button>

                  </div>
                </div>
                <div className="card-body">
                  <input type="text" ref={myKey => (this.myKey = myKey)} placeholder="API_KEY"></input>
                </div>
                <div className="card-footer">
                  <input type="button" className="btn bg-primary" onClick={()=>{value.setKey(this.myKey.value)}} value="Submit"></input>
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

