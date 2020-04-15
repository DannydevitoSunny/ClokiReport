import React from "react";
import './Custom_styles/style_one.css'
import Register from './register.js'
import { Route, Switch, Link, BrowserRouter as Router, } from "react-router-dom";
import RouteSS from './Routes.js';
import {MyContext } from "./globalConfig.js";
import FacebookLog from './FacebookLog.js';



class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            warning: "",
            origin: "log",
            url: "http://localhost/PHP/login.php",
            name: "",
        }



    }

    render() {
        return (
            <MyContext.Consumer>
                {(value) => (
                    <div >

                        {/*  this state.login will depends of local storage */}
                        {(value.state.session!=="") ? (<RouteSS />) : (
                            <Router>
                                <Switch>
                                    <Route path="/reg" exact component={Register}></Route>
                                    <Route path="/Routes.js" exact component={RouteSS}></Route>
                                    <div className="limiter" >
                                        <div className="container-login100" style={{backgroundColor:" #3a67e3  ", fontFamily:"sans-serif"}}>
                                            <div className="wrap-login100 text-center" style={{maxWidth:"30%",minWidth: "380px",}}>

                                                <span className="h1 text-white" style={{fontFamily:"'Lobster'" }} >
                                                    Cloki-Report {this.state.login}
                                                </span>

                                                <div className="mt-4">
                                                <FacebookLog/>
                                                </div>
                                                <div className="login100-form validate-form" >
                                                    <div className="text-center p-t-10 p-b-30">
                                                        <span className="text-warning">
                                                            Login with email
                                                        </span>
                                                        <p className="text-white">{value.state.Warning}</p>
                                                    </div>

                                                    <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter email: ex@abc.xyz">
                                                        <input className="input100" type="text" ref={email => (this.email = email)} name="email" placeholder="Email"></input>
                                                        <span className="focus-input100"></span>
                                                    </div>

                                                    <div className="wrap-input100 validate-input m-b-20" data-validate="Please enter password">
                                                        <span className="btn-show-pass">
                                                            <i className="fa fa fa-eye"></i>
                                                        </span>
                                                        <input className="input100" type="password" ref={pass => (this.pass = pass)} name="pass" placeholder="Password"></input>
                                                        <span className="focus-input100"></span>
                                                    </div>

                                                    <div className="container-login100-form-btn">
                                                        <button className="login100-form-btn" style={{fontFamily:"sans-serif"}}
                                                            onClick={() => {

                                                                this.postRequest = "email=" + this.email.value + "&pass=" + this.pass.value;
                                                                this.data = [this.state.url, this.state.origin, this.postRequest]
                                                                value.submit(this.data)
                                                            }
                                                            }>
                                                            Login
                                                         </button>
                                                    </div>
                                                </div>
                                                <div className="m-2">
                                                    <span className="text-warning pr-4">
                                                        Don’t have an account?
                                        </span>

                                                    <Link to="/reg"><span href="" className="text-white pl-2 underline"> <u>Sign up now</u></span></Link>
                                                </div>



                                            </div>
                                        </div>
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
