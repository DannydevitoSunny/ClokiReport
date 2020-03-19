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
            <div >
                <div className="">
                    <ApiKey update={this.getkey} />
                </div>
                <div className="">
                    <Info param1={this.state.key} />
                </div>
            </div>

        )

    }

}
export default Visualize;