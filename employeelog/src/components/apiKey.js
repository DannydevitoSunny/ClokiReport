import React from "react";
import './Custom_styles/style_one.css'



class ApiKey extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      api_key: "NADA"
    }
    this.handleClick = (event) => {
      this.setState({api_key:event.target.value});

      
    }
  }
  render() {
    return (
      <div className="Api-key" >
        <div>
          <h2 className="Title-start">
            Introduce your AipKey here 
          </h2>
          <table className="Api-key-table"  >
            <tr className="rowApi">
              <td className="p-3">Change Api-KEY</td>
              <td ><input type="text" onKeyUp={this.handleClick} placeholder="API_KEY"></input></td>
              <td className="p-3" ><input type="button" className="butKey" onClick={() => this.props.update(this.state.api_key)} value="Submit"></input></td>
            </tr>
          </table>
        </div>
      </div>

    )

  }

}
export default ApiKey;