import React from 'react';
import './Custom_styles/style_one.css'

class Info extends React.Component {
    constructor(props) {
        super(props);

        this.logResponse = [];
        this.users = [];
        this.LOGS = [];
        this.keysDate = [];
        this.state = {
            usersData: "",
            log: "",
            selectedUser: "",
            newKey: "XWor3IxeV2M9g/mQ",
            goodKey: ""


        }


        //--------------- M E T H O D S ---------------------------

        this.getLogs = (usersworkspace, usersid) => {
            var xhttp = new XMLHttpRequest();
            let url = 'https://api.clockify.me/api/v1/workspaces/' + usersworkspace + '/user/' + usersid + '/time-entries';
            xhttp.open('GET', url, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.setRequestHeader("X-Api-Key", this.state.newKey);
            xhttp.send();
            xhttp.onload = function () {
                if (this.readyState === 4 && this.status === 200) {
                    let answer = this.responseText;
                    answer = JSON.parse(answer);

                    add(answer);
                }
            }
            let add = (answer) => {
                this.logResponse.push(answer);

            }

        }

        this.getUsers = (newKey) => {
            //New request clear the old data (refresh)
            this.logResponse = [];
            this.users = [];
            this.LOGS = [];
            this.keysDate = [];
            let url = 'https://api.clockify.me/api/v1/workspaces/5c334808b079874ebdd7c345/users';
            var xhttp = new XMLHttpRequest();

            xhttp.open('GET', url, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("X-Api-Key", newKey);
            xhttp.send();

            xhttp.onload = function () {
                if (xhttp.readyState === 4 && xhttp.status === 200) {

                    let answer = xhttp.responseText;
                    console.clear();
                    answer = JSON.parse(answer);
                    call(answer);


                }
                else {
                    call("badkey")

                }
            }
            let call = (u) => {
                if (u === "badkey") {
                    this.setState({ goodKey: "The key is wrong, try again!" })
                }
                else {
                    this.setState({ goodKey: "" })
                    this.fetchUsers(u);
                }

            }

        }


        this.fetchUsers = (response) => {

            this.users = [];
            console.clear();
            for (const user of response) {
                if (user.memberships[0].membershipStatus === "ACTIVE") {
                    this.users.push({ "name": user.name, "id": user.id, "workspace": user.activeWorkspace });
                }
                
            }

            for (let x = 0; x < this.users.length; x++) {
                this.getLogs(this.users[x].workspace, this.users[x].id);
                if (x === this.users.length - 1) {
                    //Activating the button INFO
                    this.setState({
                        usersData: this.users.map((item) => {
                            return (
                                <tr key={item.id}  >
                                    
                                    <td className="">{item.name}  </td>
                                    <td className="">{item.id}  </td>
                                    <td className="">{item.workspace}  </td>
                                    <td><button className="myBut" onClick={() => this.showDatelogs(item.name)}>Info</button></td>
                                </tr>
                            )
                        })
                    })
                }
            }

        }


        this.showDatelogs = (selected) => {
            this.LOGS = [];
            this.setState({ log: '' });
            for (let x = 0; x < this.logResponse.length; x++) {
                let startDate;
                let endDate;
                let startH, endH;
                let user;
                let z = this.logResponse[x].length - 1;
                let reg = []
                let i = z;

                for (z; z >= 0; z--) {
                    for (let j = 0; j < this.users.length; j++) {
                        if (this.users[j].id === this.logResponse[x][z]["userId"]) {
                            user = this.users[j].name;
                            break;
                        }
                    }
                    if (this.logResponse[x][z]["timeInterval"]["end"] == null) {
                        //If is null, that is mean the user is working on it
                        let reg2 = [];
                        startH = this.logResponse[x][z]["timeInterval"]["start"].substring(11, 19);
                        endH = "UNKNOWN";
                        startDate = this.logResponse[x][z]["timeInterval"]["start"].substring(0, 10);
                        endDate = "UNKNOWN";
                        reg2 = [startDate, startH, endH, user];
                        this.LOGS.push(reg2);
                        continue
                    }

                    startH = this.logResponse[x][z]["timeInterval"]["start"].substring(11, 19);
                    endH = this.logResponse[x][z]["timeInterval"]["end"].substring(11, 19);
                    startDate = this.logResponse[x][z]["timeInterval"]["start"].substring(0, 10);
                    endDate = this.logResponse[x][z]["timeInterval"]["end"].substring(0, 10);

                    if (z === i) {
                        reg = [startDate, startH, endH, user];
                        continue
                    }

                    if (endDate === reg[0]) {
                        reg[2] = endH
                    }
                    else {
                        this.LOGS.push(reg);
                        reg = [startDate, startH, endH, user]
                    }


                }
            }
            this.setState({
                log: this.LOGS.map((date) => {

                    if (date[3] === selected) {
                        return (
                            <tr className="row100 body" key={date} >
                                <td className="cell100 column1"> {date[0]}   </td>
                                <td className="cell100 column2"> {date[1]}   </td>
                                <td className="cell100 column3"> {date[2]}   </td>
                                <td className="cell100 column4"> {date[3]}   </td>
                            </tr>

                        )
                    }

                })
            })
        }

        this.printData=()=>{
        
           let  newWin= window.open("");
            newWin.document.write(this.div.innerHTML);
            newWin.print();
            newWin.close();
        }



    }

    render() {


        return (
            <div >



                {/*@@@@@@@@@@@@@@@@@@@@@@@@@@T A B L E   U S E R S  */}
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">

                                <button className=" myBut" onClick={() => this.getUsers(this.key)} >Get Report</button>
                                <h3 className="">New key : <span className="border-bottom p-2 text-primary border-primary">{(this.props.param1 !== "") ? this.key = this.props.param1 : this.key = "XWor3IxeV2M9g/mQ"}</span></h3>
                                <p className="text-danger">{this.state.goodKey}</p>
                                <h3 className="card-title">Table Users</h3>
                            </div>

                            <div className="card-body table-responsive p-0">
                                <table className="table table-hover text-nowrap">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Id</th>
                                            <th>Workspace Id</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.usersData}
                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </div>
                </div>
                {/* @@@@@@@@@@@@@@@@@@@@@@@@@@ T A B L E   L O G S  */}
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Table Logs</h3>


                            </div>

                            <div className="card-body table-responsive p-0" ref={div=>{this.div=div}} id="printTable">
                                <table className="table table-head-fixed text-nowrap" >
                                    <thead>
                                        <tr>
                                            <th>Start Date</th>
                                            <th>Start Hour</th>
                                            <th>End Hour</th>
                                            <th>Worker</th>
                                            <th><button onClick={this.printData}>Print</button></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.log}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        );
    }
}

export default Info;




