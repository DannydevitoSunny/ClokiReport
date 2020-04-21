import React from "react";
import { Redirect, Route, Switch, Link, BrowserRouter as Router, } from "react-router-dom";
import Info from './dataRequest.js'
import Tweaks from './configurationInsideApp';
import FacebookLog from './FacebookLog.js';
import { MyContext, Translate } from "./globalConfig.js";
/* import Translate from './Translate.js'; */



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
                                            <div className="image"></div>{/* Space for Perfil Icon/photo */}
                                            <div className="info">

                                                <span href="" style={{ cursor: "pointer", }} className="  btn-outline-secondary text-white font-weight-light" onClick={this.fun}>
                                                    <Translate word="Welcome" />  {value.state.UserName}
                                                </span>


                                            </div>
                                        </div>
                                        <nav className="mt-2">

                                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">



                                                <li className="nav-item">
                                                    <Link to="/report">
                                                        <span className="nav-link ">
                                                            <i className="fas fa-home fa-lg"></i>
                                                            <p className="ml-1 text-white"><Translate word="Home" /></p>
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/tweaks">
                                                        <span className="nav-link">
                                                            <i className="fas fa-cog fa-lg"></i>
                                                            <p className="ml-2 text-white"><Translate word="Configuration" /></p>
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li className="nav-item" style={{ cursor: "pointer", }}>
                                                    <span className="nav-link">
                                                        <i className="fas fa-user fa-lg"></i>
                                                        <p className="ml-2" onClick={() => value.closeSession()}><Translate word="Log Out" /></p>
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
                                                    <Redirect from="/*" to="/report" />

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


