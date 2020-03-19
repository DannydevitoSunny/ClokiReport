import React from "react";
import { Route, Switch, Link, BrowserRouter as Router, } from "react-router-dom";
import Visualize from './mainBody.js'
import Info from './dataRequest.js'


const RouteSS = () => {


    return (
        <div >
            <Router>
                <nav class="main-header navbar navbar-expand navbar-white navbar-light">
                    <ul class="navbar-nav">
                        <li class="nav-item d-none d-sm-inline-block">
                            <Link to="/"><a className="nav-link" href="#food"  >Home</a></Link>
                        </li>
                        <li class="nav-item d-none d-sm-inline-block">
                            <Link to="requestData"><a className="nav-link" href="#about" >Info</a></Link>
                        </li>
                    </ul>
                </nav>


                <Switch>

                    <Route path="/requestData" exact component={Visualize}></Route>
                    <Route path="/prueba" exact component={Info}></Route>
                </Switch>
            </Router>
        </div>
    )
}




export default RouteSS;


