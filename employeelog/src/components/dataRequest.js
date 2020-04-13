import React from 'react';
import './Custom_styles/style_one.css'
import { Bar } from 'react-chartjs-2';
import { MyContext } from "./globalConfig.js";

class Info extends React.Component {
    constructor(props) {
        super(props);
        let currentDate = new Date();
        this.currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth();
        currentMonth = currentMonth + 1;
        this.days = [];
        this.HoursperDay = [];
        this.logResponse = [];
        this.keysDate = [];
        this.state = {
            display: "none",
            name: "",
            usersData: "",
            log: "",
            booleanArray: [],
            startYear: this.currentYear,
            startMonth: currentMonth,
            selectedUser: "",
            workspace: "",
            newKey: "XWor3IxeV2M9g/mQ",
            goodKey: "",
            id: "",
            users: [],
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

        this.getLogs = (y, m) => {
            this.logResponse = []
            let days_length = new Date(y, m, 0).getDate();
            days_length = days_length;
            console.clear();
            var xhttp = new XMLHttpRequest();
            let url = 'https://api.clockify.me/api/v1/workspaces/' + this.state.workspace + '/user/' + this.state.selectedUser + '/time-entries?start=' + y + '-' + m + '-01T00:00:14Z&end=' + y + '-' + m + '-' + days_length + 'T23:59:14Z&page-size=2500';

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
                //CALBACK SHOW LOGS
                if (answer.length !== 0) {
                    this.logResponse.push(answer);
                    this.generateLogs()
                }
                else {
                    this.setState({ log: "" })
                }
            }

        }

        this.getUsers = () => {
            //New request clear the old data (refresh)
            this.key = this.currentKey;
            this.logResponse = [];
            this.setState({ users: [] });
            let url = 'https://api.clockify.me/api/v1/workspaces/5c334808b079874ebdd7c345/users';
            var xhttp = new XMLHttpRequest();

            xhttp.open('GET', url, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("X-Api-Key", this.key);
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
            let call = (response) => {
                if (response === "badkey") {
                    this.setState({ goodKey: "There is no key or the key is wrong. Please try again" })
                }
                else {
                    this.setState({ goodKey: "" })
                    for (const user of response) {
                        if (user.memberships[0].membershipStatus === "ACTIVE") {
                            this.state.users.push({ "name": user.name, "id": user.id, "workspace": user.activeWorkspace, classTr: "bg-white" });
                        }

                    }

                    this.fetchUsers();
                }
            }
        }

        this.fetchUsers = () => {
            let i = 0
            this.setState({

                usersData: this.state.users.map((item) => {

                    return (
                        <tr className={this.state.users[i++].classTr} key={item.id} style={{ cursor: "pointer" }} onClick={() => this.showCurrent(item.workspace, item.id, item.name)} >
                            <td className="">{item.name}  </td>
                            <td className="">{item.id}  </td>
                            <td className="">{item.workspace}  </td>
                        </tr>
                    )
                })
            })
        }

        this.showCurrent = (workspace, id, name) => {
            this.userName = name
            for (let i = 0; i < this.state.users.length; i++) {
                if (name === this.state.users[i].name) {
                    this.state.users[i].classTr = "bg-primary";
                }
                else {
                    this.state.users[i].classTr = "bg-white";
                }
            }
            this.fetchUsers();
            this.setState({ selectedUser: id })
            this.setState({ workspace: workspace })
        }

        this.generateLogs = () => {
            this.LOGS = [];
            this.keyDates = [];
            let auxDate = "";
            for (let x = 0; x < this.logResponse.length; x++) {
                this.LOGS[0] = [];
                let newStartDate = "/"
                let startDate = "";
                let startH, endH;
                let duration = "";
                let firstTurn = 0;
                let secondTurn = 0;
                let numTasks = 1;


                for (let z = this.logResponse[x].length - 1; z >= 0; z--) {// ----> LOOP  OF  T A S K S
                    let reg = [] //new task
                    //local TIME pretty format
                    let localDate = new Date(this.logResponse[x][z]["timeInterval"]["start"]);
                    let year = localDate.getFullYear();
                    let mounth = localDate.getMonth() + 1;
                    (mounth < 10) ? (mounth = "0" + mounth) : mounth = mounth;
                    let day = localDate.getDate()
                    day < 10 ? (day = "0" + day) : day = day;
                    let h = localDate.getHours();
                    h < 10 ? (h = "0" + h) : h = h;
                    let m = localDate.getMinutes();
                    m < 10 ? (m = "0" + m) : m = m;
                    let s = localDate.getSeconds();
                    s < 10 ? (s = "0" + s) : s = s;

                    startDate = year + "/" + mounth + "/" + day;
                    startH = h + ":" + m + ":" + s;
                    //If is null, that is mean the user is working on it
                    if (this.logResponse[x][z]["timeInterval"]["end"] == null) {
                        endH = "UNKNOWN"
                        duration = "UNKNOWN"
                    }
                    else {
                        let localDate = new Date(this.logResponse[x][z]["timeInterval"]["end"]);
                        let h = localDate.getHours();
                        h < 10 ? (h = "0" + h) : h = h;
                        let m = localDate.getMinutes();
                        m < 10 ? (m = "0" + m) : m = m;
                        let s = localDate.getSeconds();
                        s < 10 ? (s = "0" + s) : s = s;
                        endH = h + ":" + m + ":" + s;
                        duration = this.logResponse[x][z]["timeInterval"]["duration"];

                    }
                    /* @@@@@@@@@@@@@@@@-- ADDING REGISTER WITH GOOD DATA --@@@@@@@@@@@@@ */

                    secondTurn = endH;
                    reg = [startDate, startH, endH, firstTurn, secondTurn, duration, numTasks];
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
                break;
            }
            this.getDuration()
        }

        this.getDuration = () => {
            this.HoursperDay = []
            let hour = 0, min = 0, sec = 0;
            let month_length = new Date(this.year.value, this.select.value, 0).getDate();
            for (let day = 1; day <= month_length; day++) {
                let match = 0;
                for (let j = 0; j < this.keyDates.length; j++) {
                    let currentDay = this.keyDates[j].slice(8, 10);
                    currentDay = parseInt(currentDay);
                    if (currentDay === day) {
                        match = 1;
                        hour = 0;
                        min = 0;
                        sec = 0;
                        let date = this.keyDates[j];
                        this.endH = 0;
                        this.endTurn = false;
                        for (let index = 0; index < this.LOGS[0][date].length; index++) { //number of tasks in this day

                            let auxh = 0, auxm = 0, auxs = 0;
                            let duration = this.LOGS[0][date][index][5];
                            let startHour = this.LOGS[0][date][index][1]
                            let endHour = this.LOGS[0][date][index][2]
                            let startHourDateFormat = startHour;
                            let endHourDateFormat = endHour;
                            startHour = parseFloat(startHour.replace(":", ".").slice(0, 5))
                            endHour = parseFloat(endHour.replace(":", ".").slice(0, 5))
                            if (index === 0) {
                                this.endH = endHour;
                            }
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

                            hour += parseInt(auxh);
                            min += parseInt(auxm);
                            sec += parseInt(auxs);
                            ///////////////////////////////////////

                            if (this.endTurn === false) {
                                if ((startHour - this.endH) < 1) {
                                    this.endH = endHour;
                                    this.LOGS[0][date][0][2] = endHourDateFormat //End FIRST turn
                                }
                                else {
                                    this.LOGS[0][date][0][3] = startHourDateFormat //Start SECOND turn
                                    this.LOGS[0][date][0][6] = 2
                                    this.endTurn = true;
                                }
                            }

                        }

                        let d = new Date();
                        d.setHours(hour);
                        d.setMinutes(min);
                        d.setSeconds(sec);

                        let duration = d.toString()
                        let numberFormat = duration.slice(15, 24)
                        this.LOGS[0][date][0][5] = duration.slice(15, 24);

                        numberFormat = numberFormat.replace(":", ".")
                        this.HoursperDay.push(numberFormat.slice(1, 6).trim())



                        break;
                    }
                }
                if (match === 0) {
                    this.HoursperDay.push(0)
                }
            }

            this.chartInfo();
            this.showLogs();
        }

        this.showLogs = () => {
            this.setState({
                log: this.keyDates.map((date) => {
                    let lastTask = this.LOGS[0][date].length - 1;
                    let b = 2;
                    return (
                        <tr className="row100 body" key={date} >
                            <td className="cell100 column1">{this.LOGS[0][date][0][0]}</td>
                            <td className="cell100 column2">{this.LOGS[0][date][0][1]}</td>
                            <td className="cell100 column3">{this.LOGS[0][date][0][2]}</td>
                            <td className="cell100 column4">{this.LOGS[0][date][0][3]}</td>
                            <td className="cell100 column4">{(this.LOGS[0][date][0][6] == 2) ? (this.LOGS[0][date][lastTask][4]) : ("0")}</td>
                            <td className="cell100 column4">{this.LOGS[0][date][0][5]}</td>

                        </tr>
                    )
                })
            })
        }

        this.printData = () => {
            let style = '<style>body{font-family:sans-serif; font-size: 0.9em;}\
            div table {\
                text-align:center;\
                border-collapse: collapse;\
                width: 100%;\
                font-size: 0.9em;\
              }\
              \
              div table td, div table th {\
                border: 1px solid #ddd;\
                padding: 8px;\
              }\
              \
              div table tr:nth-child(even){background-color: #c3c3c3;}\
              \
              div table tr:hover {background-color: #ddd;}\
              \
              div table th {\
                padding-top: 12px;\
                padding-bottom: 12px;\
                text-align: left;\
                background-color: #4CAF50;\
                color: white;\
              }</style>';
            let newWin = window.open();
            newWin.document.write('<head>' + style + '</head>')
            newWin.document.write("<body>\
           <section class='content'><h2 style='color:#3366ff'>Printing Report</h2>")
            newWin.document.write('<p><b>Date Report:</b>' + this.year.value + '/' + this.select.value + ',  <b>Company:</b><i>Comerline</i></p>\
            <h3>Worker : '+ this.state.name + '</h3><div style="width:50%;">' + this.div.innerHTML + '</div></section></body>');
            newWin.print();


        }

        this.chartInfo = () => {

            let days_length = new Date(this.year.value, this.select.value, 0).getDate();
            this.days = [];
            for (let day = 1; day <= days_length; day++) {
                this.days.push(day);

            }
            this.setState({
                data: {
                    labels: this.days,
                    datasets: [
                        {
                            label: 'Hours per day',
                            backgroundColor: 'rgba(255,99,132,0.2)',
                            borderColor: 'rgba(255,99,132,1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                            hoverBorderColor: 'rgba(255,99,132,1)',
                            data: this.HoursperDay
                        }
                    ]
                }
            });

        }

        this.filterDate = () => {
            this.setState({ display: "block" });
            this.setState({ name: this.userName });
            this.getLogs(this.year.value, this.select.value)

        }

    }

    render() {
        return (
            <MyContext.Consumer>
                {(value) => (
                    <div >


                        {/*@@@@@@@@@@@@@@@@@@@@@@@@@@ T A B L E   U S E R S  */}
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">

                                        <span style={{ display: "none" }}>{this.currentKey = value.state.ApiKey}</span>

                                        <p className="text-danger">{this.state.goodKey}</p>
                                        <h3 className="card-title">Table Users<button className=" ml-2 btn bg-primary" onClick={this.getUsers}>Get Report</button> </h3>
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


                                        <div className="row">
                                            <select className="col-sm" ref={select => { this.select = select }}>
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
                                            <select ref={year => { this.year = year }} className="col-sm ">
                                                <option>- Year -</option>
                                                <option value={this.currentYear} selected>{this.currentYear}</option>
                                                <option value={this.currentYear - 1}>{this.currentYear - 1}</option>
                                                <option value={this.currentYear - 2}>{this.currentYear - 2}</option>
                                                <option value={this.currentYear - 3}>{this.currentYear - 3}</option>

                                            </select>

                                            <button className="col-sm btn bg-primary" onClick={this.filterDate}>Search</button>
                                            <button className="col-sm btn bg-secondary text-white" onClick={this.printData}>Print table</button>
                                        </div>

                                        <h2 className=" mt-2" style={{ display: this.state.display, textAlign: "center" }}>{this.state.name}</h2>
                                    </div>

                                    <div className="card-body table-responsive p-0" ref={div => { this.div = div }} id="printTable">
                                        <table className="table table-head-fixed text-nowrap" >
                                            <thead>
                                                <tr>
                                                    <th>Start Date</th>
                                                    <th>Start 1ºTurn</th>
                                                    <th>End 1ºTurn</th>
                                                    <th>Start 2ºTurn</th>
                                                    <th>End 2ºTurn</th>
                                                    <th>Duration</th>


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
                        {/* @@@@@@@@@@@@@@@@@@@ G E N E R A T E   C H A R T @@@@@@@  */}
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
                )}

            </MyContext.Consumer>


        );
    }
}

export default Info;






