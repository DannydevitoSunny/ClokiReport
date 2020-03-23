import React from "react";
import './Custom_styles/style_one.css'



class ApiKey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      api_key: ""
    }
    this.handleClick = (event) => {
      this.setState({ api_key: event.target.value });


    }
  }
  render() {
    return (
      <div  >
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Welcome to Cloki-Report</h1>
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
              <input type="text" onKeyUp={this.handleClick} placeholder="API_KEY"></input>
            </div>
            <div className="card-footer">
              <input type="button" className="btn bg-primary" onClick={() => this.props.update(this.state.api_key)} value="Submit"></input>
            </div>

          </div>


        </section>
      </div>

    )

  }

}
export default ApiKey;

