import React from "react";
import { Route, Switch, Link, BrowserRouter as Router, } from "react-router-dom";
import Visualize from './mainBody.js'
import Info from './dataRequest.js'



class RouteSS extends React.Component {
    constructor(props){
        super(props)
        this.fun=()=>{
                this.body.className="hold-transition sidebar-collapse"
        }
    }

    render() {
        return (
            <body ref={mybody => {this.body =mybody}}  className="hold-transition sidebar-mini">
    <noscript>You need to enable JavaScript to run this app.</noscript>


    <div >
        <Router>

            <nav className="main-header navbar navbar-expand navbar-white navbar-light" >
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars"></i></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <Link to="/"><a href="./AdminLTE-3.0.2/index3.html" className="nav-link">Home</a> </Link>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <Link to="requestData"><a href="#" className="nav-link">Info</a></Link>
                    </li>

                </ul>
            </nav>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">              
                    
                <div className="sidebar">
                
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">

                        </div>
                        <div className="info">
                            <a href="#" className="d-block">Alexander Pierce</a>
                        </div>
                    </div>
                    <nav className="mt-2">
                    
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            
                        <li className="nav-item">
                                <p href="" className="nav-link ml-2 btn-outline-secondary text-white font-weight-light  h3 "  onClick={this.fun}>
                                      Close Menu
                                </p>
                            </li>
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
                                <a href="" className="nav-link active">
                                    <i className="far fa-circle nav-icon"></i>
                                    <p>Log out</p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
            <div className="content-wrapper">

                <section className="content">
                    <div className="container-fluid">

                        <div className="card-body">

                            <Switch>

                                <Route path="/requestData" exact component={Visualize}></Route>
                                <Route path="/prueba" exact component={Info}></Route>
                            </Switch>


                        </div>

                    </div>
                </section>
            </div>


        </Router>
    </div>



    <footer className="main-footer" style={{textAlign: "center"}}>
        <div className="float-right d-none d-sm-block">
            <b>Version</b> 3.0.2
    </div>
        <strong>Copyright &copy; 2014-2019 <a href="http://adminlte.io">AdminLTE.io</a>All rights
reserved.</strong>
    </footer>

    
</body>
        )
    }
}



export default RouteSS;


