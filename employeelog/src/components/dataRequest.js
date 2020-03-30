import React from 'react';
import './Custom_styles/style_one.css'
import { Bar } from 'react-chartjs-2';

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.days = [];
        this.HoursperDay=[];
        this.logResponse = [];
        this.users = [];
        this.keysDate = [];
        this.state = {
            usersData: "",
            log: "",
            selectedUser: "",
            newKey: "XWor3IxeV2M9g/mQ",
            goodKey: "",
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'My First dataset',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: [0, 0, 0, 0, 0, 0, 0,]
                    }
                ]
            }



        }


        //--------------- M E T H O D S ---------------------------

        this.getLogs = (usersworkspace, usersid) => {
            var xhttp = new XMLHttpRequest();
            let url = 'https://api.clockify.me/api/v1/workspaces/' + usersworkspace + '/user/' + usersid + '/time-entries?page-size=2500';
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
            for (const user of response) {
                if (user.memberships[0].membershipStatus === "ACTIVE") {
                    this.users.push({ "name": user.name, "id": user.id, "workspace": user.activeWorkspace });
                }

            }

            for (let x = 0; x < this.users.length; x++) {
                //Making requests for each user 
                this.getLogs(this.users[x].workspace, this.users[x].id);

                //SHOW USERS
                this.setState({
                    usersData: this.users.map((item) => {
                        return (
                            <tr key={item.id}  >

                                <td className="">{item.name}  </td>
                                <td className="">{item.id}  </td>
                                <td className="">{item.workspace}  </td>
                                <td><button className="btn text-white bg-secondary" onClick={() => this.generateLogs(item.id, "2020-03")}>Info</button></td>
                            </tr>
                        )
                    })
                })

            }

        }
        this.generateLogs = (selected, searchDate) => {
            console.clear();
            
            this.setState({ selectedUser: selected });
            this.LOGS = [];
            this.keyDates = [];
            let auxDate = "";
            for (let x = 0; x < this.logResponse.length; x++) {
                this.LOGS[0] = [];
                let newStartDate = "/"
                let startDate = "";
                let startH, endH;
                let user;
                let duration = "";
                let TaskDate = "";
                for (let j = 0; j < this.users.length; j++) {
                    if (this.users[j].id === this.logResponse[x][0]["userId"]) {
                        user = this.users[j].name;
                        break;
                    }
                }

                if (this.logResponse[x][0]["userId"] === selected) {
                    this.HoursperDay=[]
                    for (let z = this.logResponse[x].length - 1; z >= 0; z--) {// ----> LOOP  OF  T A S K S
                        

                        //----------------APPLIYING DATE FILTER
                        if (this.logResponse[x][z]["timeInterval"]["start"].substring(0, 10).includes(searchDate)) {
                            
                            let reg = []
                            startDate = this.logResponse[x][z]["timeInterval"]["start"].substring(0, 10);
                            startH = this.logResponse[x][z]["timeInterval"]["start"].substring(11, 19);
                            //If is null, that is mean the user is working on it
                            if (this.logResponse[x][z]["timeInterval"]["end"] == null) {
                                endH = "UNKNOWN"
                                duration = "UNKNOWN"
                            }
                            else {
                                endH = this.logResponse[x][z]["timeInterval"]["end"].substring(11, 19);
                                duration = this.logResponse[x][z]["timeInterval"]["duration"];
                                
                            }
                            /* @@@@@@@@@@@@@@@@-- ADDING REGISTER WITH GOOD DATA --@@@@@@@@@@@@@ */

                            reg = [startDate, startH, endH, duration, user];
                            if (startDate !== newStartDate) {
                                newStartDate = startDate; //New date as index
                                this.LOGS[0][newStartDate] = []; //CREATING NEW START DATE ARRAY
                                this.LOGS[0][newStartDate].push(reg);
                            }
                            else {
                                this.LOGS[0][newStartDate].push(reg);
                            }
                            if (auxDate !== newStartDate) {
                                auxDate = newStartDate;
                                this.keyDates.push(auxDate);
                            }

                        }


                    }
            
                    break;
                    
                }
            }
 
            this.getDuration()


        }

        this.getDuration=()=>{
            let hour = 0, min = 0, sec = 0;
            let currentDate =  new Date();
            let currentYear = currentDate.getFullYear();
            let currentMonth = currentDate.getMonth();
            let month_length = new Date(currentYear, currentMonth+1, 0).getDate();
         
            for (let day = 1; day <= month_length; day++) {
               
                let currentDay = this.keyDates[1].slice(8, 10);
                console.log(currentDay );
                if (day == currentDay ){
                    hour = 0;
                    min = 0;
                    sec = 0;
                  
                    for (let index = 0; index <this.LOGS[0][this.keyDates[day]].length; index++) { //number of tasks in this day
                
            
                        let auxh = 0,auxm =0, auxs = 0;
                        let duration = this.LOGS[0][this.keyDates[day]][index][3];
                        
                        let aux_char = "";
                        for (let s = 0; s < duration.length; s++) {
                            let character = duration.charAt(s);
                            character = character.toLowerCase();
    
                            if (character === "p" || character === "t") {
                                continue;
                            }
                            if (character === "h") {
                                auxh += aux_char                       
                                aux_char = ""
                                continue;
                            }
                            if (character === "m") {
                                auxm = aux_char;
                                aux_char = ""
                                continue;
                            }
                            if (character === "s") {
                                auxs = aux_char;
                                aux_char = ""
                                continue;
                            }
                            aux_char += character;
    
                        }
    
                        
                        hour+=parseInt(auxh);
                        min+=parseInt(auxm);
                        sec+=parseInt(auxs);
                    
                    }
                    let d = new Date();
                    d.setHours(hour);
                    d.setMinutes(min);
                    d.setSeconds(sec)
                    let str = d.toString()
                    this.LOGS[0][this.keyDates[day]][0][3] = str.slice(15,24);
                 
                    this.HoursperDay.push(hour+"."+min)//First DURATION in array is trash, I remove it in the Chart() function

                }
                else{
                    this.HoursperDay.push(0);
                }
                
            }
      
            this.chartInfo(currentYear,currentMonth);
            this.showLogs();
        }


        this.showLogs = () => {
            this.setState({
                log: this.keyDates.map((date) => {
                    let last = this.LOGS[0][date].length - 1;
                    return (
                        <tr className="row100 body" key={date} >
                            <td className="cell100 column1">{this.LOGS[0][date][0][0]}</td>
                            <td className="cell100 column2">{this.LOGS[0][date][0][1]}</td>
                            <td className="cell100 column3">{this.LOGS[0][date][last][2]}</td>
                            <td className="cell100 column4">{this.LOGS[0][date][0][3]}</td>
                            <td className="cell100 column4">{this.LOGS[0][date][0][4]}</td>
                        </tr>
                    )
                })
            })
        }

        this.printData = () => {

            let newWin = window.open("");
            newWin.document.write(this.div.innerHTML);
            newWin.print();
            newWin.close();
        }

        this.chartInfo = (y,m) => {
        
            let days_length = new Date(y, m, 0).getDate();
            this.days = [];
            for (let day = 1; day <= days_length; day++) {
                this.days.push(day);

            }


            this.setState({
                data: {
                    labels: this.days,
                    datasets: [
                        {
                            label: 'My First dataset',
                            backgroundColor: 'rgba(255,99,132,0.2)',
                            borderColor: 'rgba(255,99,132,1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                            hoverBorderColor: 'rgba(255,99,132,1)',
                            data:this.HoursperDay
                        }
                    ]
                }
            });

        }

        this.filterDate = () => {
            let FDate = this.year.value+"-"+this.select.value;
            this.generateLogs(this.state.selectedUser, FDate)
            this.chartInfo(this.year.value,this.select.value)

        }


    }

    render() {



        return (
            <div >



                {/*@@@@@@@@@@@@@@@@@@@@@@@@@@ T A B L E   U S E R S  */}
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">

                                <button className="btn bg-primary" onClick={() => this.getUsers(this.key)} >Get Report</button>
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

                {/*    @@@@@@@@@@@@@@@@@@@ P A G E S @@@@@@@@@@@@@@@@@@@@@@@@@ */}


                {/* @@@@@@@@@@@@@@@@@@@@@@@@@@ T A B L E   L O G S  */}
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Select Date: </h3>
                                <p>
                                    <select className="ml-4" ref={select =>{this.select=select}}>
                                        <option>- Month -</option>
                                        <option value="01">January</option>
                                        <option value="02">Febuary</option>
                                        <option value="03">March</option>
                                        <option value="04">April</option>
                                        <option value="05">May</option>
                                        <option value="06">June</option>
                                        <option value="07">July</option>
                                        <option value="08">August</option>
                                        <option value="09">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                    <input type="text" maxLength="4" placeholder="Year" ref={year => {this.year=year}}></input>
                                    <button className="btn text-white bg-secondary" onClick={this.filterDate}>Search</button>
                                </p>


                        </div>

                        <div className="card-body table-responsive p-0" ref={div => { this.div = div }} id="printTable">
                            <table className="table table-head-fixed text-nowrap" >
                                <thead>
                                    <tr>
                                        <th>Start Date</th>
                                        <th>Start Hour</th>
                                        <th>End Hour</th>
                                        <th>Duration</th>
                                        <th>Worker</th>
                                        <th><button className="btn bg-primary" onClick={this.printData}>Print table</button></th>
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

                 {/* @@@@@@@@@@@@@@@@@@@ G E N E R A T E   C H A R T @@@@@@@  */ }
        <div className="card card-primary">
            <div className="card-header">
                <h3 className="card-title">March</h3>

                <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus"></i>
                    </button>
                    <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times"></i></button>
                </div>
            </div>
            <div className="card-body">
                <div className="chart">
                    <Bar data={this.state.data} />
                </div>
            </div>

        </div>
                
                
            </div >

        );
    }
}

export default Info;






