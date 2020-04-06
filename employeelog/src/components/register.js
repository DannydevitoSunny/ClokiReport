import React from 'react';
import { Component } from 'react';
import './Custom_styles/reg_style.css';


class Register extends Component {
    constructor() {
        super()

    }
    render() {
        return (

            <div className="form-style-5" style={{fontFamily:"sans-serif"}}>
            <form action="http://localhost/PHP/register.php" method="POST">
            <h2 className="text-primary">Welcome to ClokiReport</h2><br></br>
                <fieldset>
                    
                    <legend><span className="number">1</span> Candidate Info</legend>
                    <input type="text" name="name" placeholder="Your Name *"></input>
                    <input type="text" name="lastname" placeholder="Your Lastname *"></input>
                    <input type="email" name="email" placeholder="Your Email *"></input>
                    <input type="password" name="pass" placeholder="Password *"></input>
                    <input type="password" name="confpass" placeholder="Confirm Password *"></input>
                    <input type="text" name="company" placeholder="Your company name *"></input>
                    
                </fieldset>
                <fieldset>
                    <legend><span className="number">2</span> Additional Info</legend>
                    <textarea name="extra" placeholder="About Your Business"></textarea>
                </fieldset>
                <a href="register.php">HHH</a>
                <input type="submit" value="Apply" name="submit" ></input>
            </form>
        </div >
        );
    }
}

export default Register;
