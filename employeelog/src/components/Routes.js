import React from "react";
import { Route, Switch, Link, BrowserRouter as Router, } from "react-router-dom";
import Info from './dataRequest.js'
import Tweaks from './apiKey';
import FacebookLog from './FacebookLog.js';
import { MyContext } from "./globalConfig.js";



class RouteSS extends React.Component {
    constructor(props) {
        super(props)

        this.fun = () => {
            document.getElementById("mainBody").className = "hold-transition sidebar-collapse"
        }
        this.state = {
            key: ""
        }
        this.getkey = (value) => {
            this.setState({ key: value })
        }
    }

    render() {
        return (
            <MyContext.Consumer>
                {(value => ( 
                    <div>


                        <div >
                            <Router>

                                <nav className="main-header navbar navbar-expand navbar-dark text-white navbar-light" >
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars"></i></a>
                                        </li>


                                    </ul>
                                </nav>
                                <aside className="main-sidebar sidebar-dark-primary elevation-4">

                                    <div className="sidebar">

                                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                                            <div className="image">

                                            </div>
                                            <div className="info">
                                                 <a href="#" className="d-block">Welcome {value.state.UserName}</a>
                                            </div>
                                        </div>
                                        <nav className="mt-2">

                                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                                                <li className="nav-item">
                                                    <p href="" style={{ cursor: "pointer" }} className="nav-link ml-2 btn-outline-secondary text-white font-weight-light  h3 " onClick={this.fun}>
                                                        Close Menu
                                            </p>
                                                </li>
                                               
                                                <li className="nav-item">
                                                    <Link to="/report">
                                                        <span className="nav-link ">
                                                            <i className="fas fa-home fa-lg"></i>
                                                            <p className="ml-1 text-white">Home</p>
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/tweaks">
                                                        <span className="nav-link">
                                                            <i className="fas fa-cog fa-lg"></i>
                                                            <p className="ml-2 text-white">Configuration</p>
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <span  className="nav-link">
                                                        <i className="fas fa-user fa-lg"></i>
                                                        <p className="ml-2" onClick={()=>value.closeSession()}>Log out</p>
                                                    </span>
                                                </li>


                                            </ul>
                                        </nav>
                                    </div>
                                </aside>
                                <div className="content-wrapper" style={{ overflowY: "scroll", height: window.innerHeight - 120 }}>

                                    <section className="content">
                                        <div className="container-fluid">

                                            <div className="card-body">

                                                <Switch>
                                                    <Route path="/report" exact render={(props) => <Info {...props} param1={this.state.key} />} ></Route>
                                                    <Route path="/tweaks" exact render={(props) => <Tweaks {...props} update={this.getkey} />}></Route>

                                                </Switch>


                                            </div>

                                        </div>
                                    </section>
                                </div>


                            </Router>
                        </div>



                        <footer className="main-footer" style={{ textAlign: "center" }}>
                            <div className="float-right d-none d-sm-block">
                                <b>Version</b> 3.0.2
                        </div>
                            <strong>Copyright &copy; 2014-2019 <a href="http://adminlte.io">AdminLTE.io</a>All rightsreserved. </strong>
                        </footer>


                    </div>
                ))}
            </MyContext.Consumer>
        )
    }
}



export default RouteSS;


