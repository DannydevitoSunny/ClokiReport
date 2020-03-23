import React from 'react';
import { Component } from 'react';
import './Custom_styles/reg_style.css';


class Register extends Component {
    constructor() {
        super()

    }
    render() {
        return (

            <div className="form-style-5">
                <form>
                    <fieldset>
                        <legend><span className="number">1</span> Candidate Info</legend>
                        <input type="text" name="field1" placeholder="Your Name *"></input>
                        <input type="email" name="field2" placeholder="Your Email *"></input>
                        <input type="password" name="field3" placeholder="Password *"></input>
                        <input type="password" name="field4" placeholder="Confirm Password *"></input>
                        <label for="job">Interests:</label>
                        <select id="job" name="field4">
                            <optgroup label="Indoors">
                                <option value="fishkeeping">Fishkeeping</option>
                                <option value="reading">Reading</option>
                                <option value="boxing">Boxing</option>
                                <option value="debate">Debate</option>
                                <option value="gaming">Gaming</option>
                                <option value="snooker">Snooker</option>
                                <option value="other_indoor">Other</option>
                            </optgroup>
                            <optgroup label="Outdoors">
                                <option value="football">Football</option>
                                <option value="swimming">Swimming</option>
                                <option value="fishing">Fishing</option>
                                <option value="climbing">Climbing</option>
                                <option value="cycling">Cycling</option>
                                <option value="other_outdoor">Other</option>
                            </optgroup>
                        </select>
                    </fieldset>
                    <fieldset>
                        <legend><span className="number">2</span> Additional Info</legend>
                        <textarea name="field3" placeholder="About Your School"></textarea>
                    </fieldset>
                    <input cl type="submit" value="Apply" ></input>
                </form>
            </div >
        );
    }
}

export default Register;
