import React from 'react';
import { Component } from 'react';
import './Custom_styles/reg_style.css';
import axios from 'axios';


class Register extends Component {
    constructor() {
        super()

        this.submit=(e)=>{
  
            console.log(e.target.value)
            axios({
                method: 'post', 
                url: './register.php',
                headers: { "content-type": "application/x-www-form-urlencoded" },
              })
              .then((data)=>{
                  let obj = JSON.stringify(data);
                  console.log(data);
              })
        }

    }
    render() {
        return (

            <div className="form-style-5" style={{fontFamily:"sans-serif"}}>
            <form onSubmit={this.submit} method="POST">
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
                    <textarea name="field3" placeholder="About Your Business"></textarea>
                </fieldset>
                <a href="register.php">HHH</a>
                <input type="button" onClick={(e)=>this.submit(e)} value="Apply" name="submit" ></input>
            </form>
        </div >
        );
    }
}

export default Register;
