import React from "react";
import './Custom_styles/style_one.css'
import { Link } from "react-router-dom";
import { MyContext, Domain } from "./globalConfig.js";
import FacebookLog from './FacebookLog.js';
import { Translate } from './LocateTrans.js'



class Login2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            warning: "",
            origin: "log",
            url: Domain + "/PHP/login.php",
            name: "",
            reg: false
        }
    }


    render() {
        return (
            <MyContext.Consumer>
                {(value) => (
                    <div>
                        <div className="container-login100" style={{ backgroundColor: " #3a67e3  ", fontFamily: "sans-serif" }}>
                            <div className="wrap-login100 text-center" style={{ maxWidth: "30%", minWidth: "380px", }}>

                                <span className="h1 text-white" style={{ fontFamily: "'Lobster'" }} >
                                    Cloki-Report {this.state.login}
                                </span>

                                <div className="mt-4">
                                    <FacebookLog />
                                </div>
                                <div className="login100-form validate-form" >
                                    <div className="text-center p-t-10 p-b-30">
                                        <span className="text-warning">
                                            <Translate word="Log in with email" />
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
                                        <button className="login100-form-btn" style={{ fontFamily: "sans-serif" }}
                                            onClick={() => {

                                                this.postRequest = "email=" + this.email.value + "&pass=" + this.pass.value;
                                                this.data = [this.state.url, this.state.origin, this.postRequest]
                                                value.submit(this.data)
                                            }
                                            }>

                                            <Translate word="LOG IN" />
                                        </button>
                                    </div>
                                </div>
                                <div className="m-2">
                                    <span className="text-warning pr-4">
                                        <Translate word="Don’t have an account?" />
                                    </span>

                                    <Link to="/reg"><span href="" className="text-white pl-2 underline"> <u><Translate word="Sign up now" /></u></span></Link>
                                </div>



                            </div>
                        </div>

                    </div>
                )}
            </MyContext.Consumer>
        )

    }

}
export default Login2;