import React from "react";
import './Custom_styles/style_one.css'
import Register from './register.js'
import { Route,Redirect, Switch, BrowserRouter as Router, } from "react-router-dom";
import RouteSS from './Routes.js';
import { MyContext} from "./globalConfig.js";
import Login2 from './login2.js'



class Login extends React.Component {

    render() {
        return (
            <MyContext.Consumer>
                {(value) => (
                    <div style={{ backgroundColor: " #3a67e3  " }} >

                        {/*  this state.login depends on local storage */}
                        {(value.state.session !== "") ? (<RouteSS />) : (
                            <Router>
                                <Switch>

                                    <div>
                                        <div><Route path="/" exact component={Login2}></Route></div>
                                        <div><Route path="/log" exact component={Login2}></Route></div>
                                        <div><Route path="/reg" exact component={Register}></Route></div>
                                        <Redirect from="/*" to="/" />
                                    </div>

                                </Switch>
                            </Router>
                        )}


                    </div>
                )}
            </MyContext.Consumer>
        )

    }

}
export default Login;