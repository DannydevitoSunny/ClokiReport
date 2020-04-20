import React from "react";
import './Custom_styles/style_one.css'
import { Translate, MyContext,Domain} from "./globalConfig.js";



class ApiKey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: Domain+"/PHP/SetGlobal.php",
      origin: "conf",
    }
  }
  render() {
    return (
      <MyContext.Consumer>
        {(value) => (
          <div>
            <section className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1><Translate word="Configuration" /></h1>
                  </div>
                </div>
              </div>
            </section>

            <section className="content">


              <div className="card">
                <div className="card-header">
                  <h3 className="card-title text-primary"><Translate word="Current ApiKey" />: <b>{value.state.ApiKey}</b></h3>

                  <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                      <i className="fas fa-minus"></i></button>

                  </div>
                </div>
                <div className="card-body">
                  <input placeholder="New key" type="text" ref={mykey => (this.mykey = mykey)} ></input><br></br>
                </div>

              </div>



              <div className="card">
                <div className="card-header">
                  <h3 className="card-title text-primary"><Translate word="Lenguage" />: </h3>

                  <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                      <i className="fas fa-minus"></i></button>

                  </div>
                </div>
                <div className="card-body">
                  <select ref={lang => (this.lang = lang)} >
                    <option disabled selected>{value.state.lang}</option>
                    <option value="EN">EN</option>
                    <option value="ES">ES</option>
                  </select>
                </div>

              </div>



              <div className="card">
                <div className="card-header">
                  <h3 className="card-title text-primary"><Translate word="Break time" /> ({value.state.breakTime}): </h3>
                  <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                      <i className="fas fa-minus"></i></button>

                  </div>
                </div>
                <div className="card-body">
                  <input placeholder="Hour:min" ref={breakTime => (this.breakTime = breakTime)}></input>
                </div>

              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title text-primary"><Translate word="Company name" />: {value.state.Company} </h3>
                  <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                      <i className="fas fa-minus"></i></button>

                  </div>
                </div>
                <div className="card-body">
                  <input placeholder="New Name" ref={company => (this.company = company)}></input>
                </div>

              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title text-primary">CIF: {value.state.CIF} </h3>
                  <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                      <i className="fas fa-minus"></i></button>

                  </div>
                </div>
                <div className="card-body">
                  <input placeholder="New CIF" ref={CIF => (this.CIF = CIF)}></input>
                </div>

              </div>



              {/* @@@@@@@@@@@@@@@@@@ S A V E  C H A N GE  @@@@@@@@@@@@@@@@@@@@@@ */}
              <div className="card" style={{ textAlign: "center" }}>
                <div className="card-body" style={{ textAlign: "center" }}>
                  <button className="btn btn-primary text-white"
                    onClick={() => {
                      if (this.breakTime.value === "") {
                        this.breakTime.value = value.state.breakTime
                      }
                      else {
                        if (this.breakTime.value.toString().length > 5) {
                          this.breakTime.value = this.breakTime.value.toString().substring(0, 5);
                        }
                        this.breakTime.value = this.breakTime.value.replace(":", ".");

                        if (this.breakTime.value > 22.59) {
                          this.breakTime.value = 1;
                        }


                      }
                      if (this.mykey.value === "") {
                        this.mykey.value = value.state.ApiKey
                      }
                      if (this.company.value === "") {
                        this.company.value = value.state.Company
                      }
                      if (this.CIF.value === "") {
                        this.CIF.value = value.state.CIF
                      }
                      this.postRequest = "&apikey=" + this.mykey.value + "&lang=" + this.lang.value + "&id=" + value.state.id + "&breakTime=" + this.breakTime.value + "&company=" + this.company.value + "&CIF=" + this.CIF.value;
                      this.data = [this.state.url, this.state.origin, this.postRequest];
                      value.submit(this.data);
                      this.mykey.value = "";
                      this.breakTime.value = "";
                      this.company.value = "";
                      this.CIF.value = "";
                    }
                    }>
                    <Translate word="Save" />
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

