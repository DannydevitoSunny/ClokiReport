import React from "react";
import './Custom_styles/style_one.css'
import Register from './register.js'
import { Route, Switch, Link, BrowserRouter as Router, } from "react-router-dom";



class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        login : true
        //CREATE AN AJAX REQUEST WHICH RETURNS TRUE OR FALSE FOR LOGIN
    }

  }
  render() {
    return (

        <div> 
            <Router> 
                <Switch>
                <Route path="/reg" exact component={Register}></Route>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-t-90 p-b-30">
                        <form className="login100-form validate-form">
                            <span className="login100-form-title p-b-40">
                            Cloki-Report
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
        
                            <div className="text-center p-t-55 p-b-30">
                                <span className="txt1">
                                    Login with email
                                </span>
                            </div>
        
                            <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter email: ex@abc.xyz">
                                <input className="input100" type="text" name="email" placeholder="Email"></input>
                                <span className="focus-input100"></span>
                            </div>
        
                            <div className="wrap-input100 validate-input m-b-20" data-validate = "Please enter password">
                                <span className="btn-show-pass">
                                    <i className="fa fa fa-eye"></i>
                                </span>
                                <input className="input100" type="password" name="pass" placeholder="Password"></input>
                                <span className="focus-input100"></span>
                            </div>
        
                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" onClick={()=>this.props.login(this.state.login)}>
                                    Login
                                </button>
                            </div>
                            
                            <div className="m-2">
                                <span className="txt2 p-b-10">
                                    Don’t have an account?
                                </span>
        
                                <Link to="/reg"><a href="" className="txt3 bo1 hov1">Sign up now</a></Link>
                            </div>
    
                            
                        </form>
                    </div>
                </div>
            </div>
            </Switch>
            </Router>
            
            

        
        </div>
    )

  }

}
export default Login;
