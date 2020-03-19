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
            butStateVisible: 'hidden',
            selectedUser: "",
            butClass: "myBut",
            newKey : "XWor3IxeV2M9g/mQ"
           
         
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
                    console.log(answer);
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
                    answer = JSON.parse(answer);
                    call(answer);


                }
            }
            let call = (u) => {
                this.fetchUsers(u);
            }

        }


        this.fetchUsers = (response) => {

            this.users = [];
            for (const user of response) {

                this.users.push({ "name": user.name, "id": user.id, "workspace": user.activeWorkspace });
            }

            for (let x = 0; x < this.users.length; x++) {
                this.getLogs(this.users[x].workspace, this.users[x].id);
                if (x === this.users.length - 1) {
                    //Activating the button INFO
                    this.setState({ butStateVisible: 'visible' });
                    this.setState({
                        usersData: this.users.map((item) => {
                            return (
                                <tr key={item.id} onClick={() => this.selectUser(item.name)} >
                                    <td className="">{item.name}  </td>
                                    <td className="">{item.id}  </td>
                                    <td className="">{item.workspace}  </td>
                                </tr>
                            )
                        })
                    })
                }
            }

        }

        this.selectUser = (u) => {
            this.LOGS = [];
            this.setState({ butClass: 'butWorks' });
            this.setState({ log: '' });
            this.setState({ selectedUser: u });

        }

        this.showDatelogs = (selected) => {
            this.LOGS = [];
            ;
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
                        this.LOGS.push(reg);
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



    }

    render() {


        return (
            <div >

                <div className="infoWraper">
                    <div class="wrap-table100 table-Logs">
        <h2>Nueva key : {(this.props.param1 !="")?this.ZZ = this.props.param1 :  this.ZZ ="XWor3IxeV2M9g/mQ"}</h2>
                    <button className=" myBut" onClick={()=>this.getUsers(this.ZZ)} >Get Report</button>
                    <button className={this.state.butClass} style={{ visibility: this.state.butStateVisible }} onClick={() => this.showDatelogs(this.state.selectedUser)}>Info</button>
                        <table className="Users-table">
                            <tr>
                                <th>Name</th>
                                <th>ID</th>
                                <th>Workspace ID</th>
                            </tr>
                            {this.state.usersData}
                        </table>
                        <div class="table100 ver3 m-b-110">

                            <div class="table100-head">
                                <table>
                                    <thead>
                                        <tr class="row100 head">
                                            <th className="cell100 column1" >Date</th>
                                            <th className="cell100 column2" >Start</th>
                                            <th className="cell100 column3" >End</th>
                                            <th className="cell100 column4" >Worker</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>

                            <div class="table100-body js-pscroll">

                                <table>
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
