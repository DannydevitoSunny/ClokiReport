import React from 'react';
import { Component } from 'react';
import './Custom_styles/reg_style.css';
import { MyContext, Domain } from "./globalConfig.js";


class Register extends Component {
    constructor() {
        super()
        this.state = {
            url: Domain + "/PHP/register.php",
            origin: "reg",

        }
        this.language = [];
        this.lang = navigator.language.substring(0, 2).toUpperCase();
        if (this.lang === "ES") {
            this.language = ['Nombre *', 'Apellido *', 'Correo *', 'Contraseña *', 'Confirmar Contraseña *', 'Nombre de su Empresa *', 'Informacion Usuario', 'Informacion Adicional', 'Aplicar', 'Bienvenido a', 'Sobre su negocio'];
        }
        else {
            this.language = ['Your Name *', 'Your Lastname *', 'Your Email *', 'Password *', 'Confirm Password *', 'Your company name *', 'User Info', 'Additional Info', "Apply", "Welcome to", 'About Your Business'];
        }
    }
    render() {
        return (
            <MyContext.Consumer>
                {(value) => (
                    <div className="pt-4" style={{ height: window.innerHeight - 10, backgroundImage: 'linear-gradient(#3a67e3, lightblue)' }}>

                        <div className="form-style-5 mt-2" style={{ backgroundColor: " white  " }}>
                            <h2 className="text-primary" style={{ fontFamily: "'Lobster'" }}>{this.language[9]} ClokiReport</h2><br></br>
                            {value.state.Warning}
                            <fieldset>

                                <legend><span className="number bg-warning">1</span> {this.language[6]}</legend>
                                <input type="text" ref={name => (this.name = name)} placeholder={this.language[0]}></input>
                                <input type="text" ref={lastname => (this.lastname = lastname)} placeholder={this.language[1]}></input>
                                <input type="email" ref={email => (this.email = email)} placeholder={this.language[2]}></input>
                                <input type="password" ref={pass => (this.pass = pass)} placeholder={this.language[3]}></input>
                                <input type="password" ref={confpass => (this.confpass = confpass)} placeholder={this.language[4]}></input>
                                <input type="text" ref={company => (this.company = company)} placeholder={this.language[5]}></input>

                            </fieldset>
                            <fieldset>
                                <legend><span className="number bg-warning">2</span> {this.language[7]}</legend>
                                <textarea ref={extra => (this.extra = extra)} placeholder={this.language[10]}></textarea>
                            </fieldset>

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn bg-dark" style={{ fontFamily: "sans-serif" }}
                                    onClick={() => {

                                        this.postRequest = "email=" + this.email.value + "&pass=" + this.pass.value + "&confpass=" + this.confpass.value + "&lastname=" + this.lastname.value + "&name=" + this.name.value + "&company=" + this.company.value + "&extra=" + this.extra.value;
                                        this.data = [this.state.url, this.state.origin, this.postRequest]
                                        value.submit(this.data)

                                    }

                                    } >{this.language[8]}</button>
                            </div>




                        </div >
                    </div>

                )}
            </MyContext.Consumer>
        );
    }
}

export default Register;
