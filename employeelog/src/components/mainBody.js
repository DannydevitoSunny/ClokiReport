import React from "react";
import './Custom_styles/style_one.css'
import Info from './dataRequest.js'
import ApiKey from './apiKey.js'


class Visualize extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: ""
        }
        this.getkey = (value) => {
            this.setState({ key: value })
        }


    }
    render() {

        return (
            <div  >


                <div className="w3-content StartBox" style={{ maxwidth: "1500px" }}>
                    <header className="w3-panel w3-center " style={{ padding: "128px 14px" }}>
                        <h1 className="w3-xlarge" >ClokiReporter</h1>
                        <h1>Welcome to ClokiFy Report</h1>

                        <div className="w3-padding-32">
                            <div className="w3-bar w3-border">
                                <ApiKey update={this.getkey} />
                            </div>
                        </div>

                        <div className="myInfo w3-center" style={{ marginbottom: "128px" }}>
                            <Info param1={this.state.key}  />
                        </div>
                    </header>

                </div>

                <footer className="w3-container w3-padding-64 w3-light-grey w3-center w3-large">
                    <i className="fa fa-facebook-official w3-hover-opacity"></i>
                    <i className="fa fa-instagram w3-hover-opacity"></i>
                    <i className="fa fa-snapchat w3-hover-opacity"></i>
                    <i className="fa fa-pinterest-p w3-hover-opacity"></i>
                    <i className="fa fa-twitter w3-hover-opacity"></i>
                    <i className="fa fa-linkedin w3-hover-opacity"></i>
                    <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" className="w3-hover-text-green">w3.css</a></p>
                </footer>
            </div>

        )

    }

}
export default Visualize;