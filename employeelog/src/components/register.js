import React from 'react';
import { Component } from 'react';
import './Custom_styles/reg_style.css';
import { MyProvider, MyContext } from "./globalConfig.js";


class Register extends Component {
    constructor() {
        super()
        this.state={
            url:"http://localhost/PHP/register.php",
            origin:"reg",
        }

    }
    render() {
        return (
            <MyContext.Consumer>
                 {(value) => (
                    <div className="form-style-5" style={{fontFamily:"sans-serif"}}>
                        <h2 className="text-primary">Welcome to ClokiReport</h2><br></br>
                            <fieldset>
                                
                                <legend><span className="number">1</span> Candidate Info</legend>
                                <input type="text" ref={name=>(this.name=name)}  placeholder="Your Name *"></input>
                                <input type="text" ref={lastname=>(this.lastname=lastname)} placeholder="Your Lastname *"></input>
                                <input type="email" ref={email=>(this.email=email)}  placeholder="Your Email *"></input>
                                <input type="password" ref={pass=>(this.pass=pass)} placeholder="Password *"></input>
                                <input type="password" ref={confpass=>(this.confpass=confpass)} placeholder="Confirm Password *"></input>
                                <input type="text" ref={company=>(this.company=company)} placeholder="Your company name *"></input>
                                
                            </fieldset>
                            <fieldset>
                                <legend><span className="number">2</span> Additional Info</legend>
                                <textarea ref={extra=>(this.extra=extra)} placeholder="About Your Business"></textarea>
                            </fieldset>
                            <a href="register.php">HHH</a>
                            <input type="button" value="Apply" ref={submit=>(this.submit=submit)}
                            onClick={()=>{
                                                                                
                                this.postRequest ="email="+this.email.value+"&pass="+this.pass.value+"&submit="+this.submit+"&confpass=\
                                "+this.confpass+"&lastname="+this.lastname+"&name="+this.name+"&company="+this.company+"&extra="+this.extra;
                                this.data = [this.state.url, this.state.origin, this.postRequest]
                                value.submit(this.data)}
                             } ></input>
                    </div >
                 )}
            </MyContext.Consumer>
        );
    }
}

export default Register;
