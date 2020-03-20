import React from "react";
import { Route, Switch, Link, BrowserRouter as Router, } from "react-router-dom";
import Visualize from './mainBody.js'
import Info from './dataRequest.js'
import { render } from "@testing-library/react";


class RouteSS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuState: "none"
        }
        this.View = () => {
            if (this.state.menuState === "none") {
                this.setState({ menuState: "block" })
            }
            else {
                this.setState({ menuState: "none" })
            }
        }


    }
    render() {
        return (
            <div >
                <Router>

                    <nav className="main-header navbar navbar-expand navbar-white navbar-light" >
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a onClick={this.View} className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars"></i></a>
                            </li>
                            <li className="nav-item d-none d-sm-inline-block">
                                <Link to="/"><a href="./AdminLTE-3.0.2/index3.html" className="nav-link">Home</a> </Link>
                            </li>
                            <li className="nav-item d-none d-sm-inline-block">
                                <Link to="requestData"><a href="#" className="nav-link">Info</a></Link>
                            </li>

                        </ul>
                    </nav>
                    <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ display: this.state.menuState }}>

                        <a href="./AdminLTE-3.0.2/index3.html" className="brand-link">

                            <span className="brand-text font-weight-light">AdminLTE 3</span>
                        </a>
                        <div className="sidebar">
                            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                                <div className="info">
                                    <a href="#" className="d-block">Alexander Pierce</a>
                                </div>
                            </div>
                            <nav className="mt-2">
                                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">


                                    <li className="nav-item">
                                        <a href="" className="nav-link disabled">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Page 1</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                    <a href="" className="nav-link disabled">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Page 2</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                    <a href="" className="nav-link disabled">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Page 3</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href=""  className="nav-link active">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Log out</p>
                                        </a>
                                    </li>
                                </ul>
                            </nav>

                        </div>
                    </aside>

                    <Switch>

                        <Route path="/requestData" exact component={Visualize}></Route>
                        <Route path="/prueba" exact component={Info}></Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}




export default RouteSS;






