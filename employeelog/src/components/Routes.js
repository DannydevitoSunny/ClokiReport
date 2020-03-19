import React from "react";
import { Route, Switch, Link, BrowserRouter as Router, } from "react-router-dom";
import Visualize from './mainBody.js'
import Info from './dataRequest.js'


class RouteSS extends React.Component {
    constructor(){
        super();
        
        this.state = {
            display : "none"
            
        }
        this.w3_open=() =>{
            this.setState({display: "block"})
          }
        this.w3_close = ()=> {
            console.clear()
            console.log(this.state.display)
            this.setState({display: "none"})
        }
          
    }
    render(){
        return (
            <div >
                <Router>
                    <nav class="w3-sidebar w3-bar-block w3-card w3-top w3-xlarge w3-animate-left bg-dark " style={{ display: this.state.display, zIndex: "2", width: "20%", minWidth: "300px" }} id="mySidebar">
                        <a className="menuLink text-white"  onClick={this.w3_close}>Close Menu</a>
                        <Link to="/"><a className="menuLink" href="#food" onClick={this.w3_close} >Home</a></Link>
                        <Link to="requestData"><a className="menuLink" href="#about" onClick={this.w3_close}>Info</a></Link>
                    </nav>
    
    
                    <div class="w3-top">
                        <div class="w3-white w3-xlarge" style={{ maxWidth: "1200px", margin: "auto" }}>
                            <div class="w3-button w3-padding-16 w3-left" onClick={this.w3_open}>☰</div>
    
                        </div>
                    </div>
                    <Switch>
    
                        <Route path="/requestData" exact component={Visualize}></Route>
                        <Route path="/prueba" exact component={Info}></Route>
                    </Switch>
                </Router>
            </div>
        )
    }
    
}

export default RouteSS;
