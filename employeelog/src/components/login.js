import React from "react";
import './Custom_styles/style_one.css'
import Register from './register.js'
import { Route, Switch, Link, BrowserRouter as Router, } from "react-router-dom";
import RouteSS from './Routes.js';
import { MyProvider, MyContext } from "./globalConfig.js";



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
                    <div>

                        {/*  this state.login will depends of local storage */}
                        {(value.state.session!=="") ? (<RouteSS />) : (
                            <Router>
                                <Switch>
                                    <Route path="/reg" exact component={Register}></Route>
                                    <Route path="/Routes.js" exact component={RouteSS}></Route>
                                    <div className="limiter">
                                        <div className="container-login100">
                                            <div className="wrap-login100 p-t-90 p-b-30">

                                                <span className="login100-form-title p-b-40">
                                                    Cloki-Report {this.state.login}
                                                </span>

                                                <div>
                                                    <a href="" className="btn-login-with bg1 m-b-10">
                                                        <i className="fa fa-facebook-official"></i>
                                            Login with Facebook
                                        </a>

                                                    <a href="" className="btn-login-with bg2">
                                                        <i className="fa fa-twitter"></i>
                                            Login with Twitter
                                        </a>
                                                </div>
                                                <div className="login100-form validate-form" >
                                                    <div className="text-center p-t-55 p-b-30">
                                                        <span className="txt1">
                                                            Login with email
                                                        </span>
                                                        <p className="text-danger">{value.state.Warning}</p>
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
                                                        <button className="login100-form-btn"
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
                                                    <span className="txt2 p-b-10">
                                                        Don’t have an account?
                                        </span>

                                                    <Link to="/reg"><a href="" className="txt3 bo1 hov1"> Sign up now</a></Link>
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
