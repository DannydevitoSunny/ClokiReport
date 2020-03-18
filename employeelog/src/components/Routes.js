import React from "react";
import {Route, Switch, Link, BrowserRouter as Router,} from "react-router-dom";
import Home from './home.js'
import Info from './dataRequest.js'


const RouteSS =()=>{
    return(
        <div>
         <Router>
                <nav className="nav bg-dark">
                    <Link to="/"><a href className="nav-link text-white disabled">Home</a></Link>
                    <Link to="requestData"><a href className="nav-link text-white  disabled">Info</a></Link>
                </nav>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/requestData" exact component={Info}></Route>
            </Switch>
         </Router>
        </div>
    )
}

export default RouteSS;