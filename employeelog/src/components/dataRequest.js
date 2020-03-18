import React from 'react';
import './Custom_styles/style_one.css'

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.logResponse = [];  
        this.users = []; 
        this.LOGS = [];
        this.keysDate = [];
        this.state ={
            usersData : "",
            log :"",
            butStateVisible: 'hidden',
            selectedUser :"",
            butClass : "myBut"
        }

        //--------------- M E T H O D S ---------------------------

        this.getLogs =(usersworkspace, usersid)=>{
            //XWor3IxeV2M9g/mQ -- clave alejandro
            //Xmiz4o3aZjHM5X7l -- mi clavegit
            var xhttp = new XMLHttpRequest();
            let url = 'https://api.clockify.me/api/v1/workspaces/'+usersworkspace+'/user/'+usersid+'/time-entries';
            xhttp.open('GET', url, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            
            xhttp.setRequestHeader("X-Api-Key", "XWor3IxeV2M9g/mQ");
            xhttp.send();
            xhttp.onload = function() {
                if (this.readyState === 4 && this.status === 200) {
                    let answer= this.responseText;
                    answer = JSON.parse(answer);
                    add(answer);
                } 
            }
            let add = (answer)=>{
                this.logResponse.push(answer);

            }

        }

        this.getUsers= ()=> {
            //New request clear the old data (refresh)
            this.logResponse = [];  
            this.users = [];
            this.LOGS = [];
            this.keysDate = [];
            let url = 'https://api.clockify.me/api/v1/workspaces/5c334808b079874ebdd7c345/users';
            var xhttp = new XMLHttpRequest();
        
            xhttp.open('GET', url, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("X-Api-Key", "XWor3IxeV2M9g/mQ");
            xhttp.send();
           
            xhttp.onload = function() {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    let answer= xhttp.responseText;  
                    answer  = JSON.parse(answer);  
                    call(answer);

        
                }
            }
            let call = (u)=>{
                this.fetchUsers(u);
            }
              
        }


        this.fetchUsers=(response)=>{
            
            this.users= [];
            for (const user of response) {
                
                this.users.push({"name":user.name, "id":user.id, "workspace":user.activeWorkspace});
            }
           
            for (let x = 0; x < this.users.length; x++){
                this.getLogs(this.users[x].workspace, this.users[x].id);
                if(x === this.users.length-1 ){
                    //Activating the button INFO
                    this.setState({butStateVisible:'visible'});
                    this.setState({usersData: this.users.map((item)=>{
                        return (
                            <tr  key={item.id} onClick={() => this.selectUser(item.name)} >
                                <th scope="row" className="th-User UserName">Name: {item.name}  </th>
                                <th scope="row" className="th-User">id: {item.id}  </th>
                                <th scope="row" className="th-User">Workspace id: {item.workspace}  </th>
                            </tr>
                        )
                    })})
                }
            }
      
        }

        this.selectUser=(u)=>{
            this.LOGS = [];
            this.setState({butClass:'butWorks'});
            this.setState({log:''});
            this.setState({selectedUser:u});

        }
        
        this.showDatelogs=(selected)=>{
            this.LOGS = [];
            console.log(this.logResponse);
            for (let x = 0; x < this.logResponse.length; x++) {
                let startDate;
                let endDate;
                let startH, endH;
                let user;
                let z = this.logResponse[x].length-1;
                let reg = []
                let i = z;
                
                for (z; z >= 0; z--) {
                    for (let j = 0; j < this.users.length; j++) {
                        if (this.users[j].id === this.logResponse[x][z]["userId"] ) {
                            user = this.users[j].name;
                            break;
                        }
                    }
                    if (this.logResponse[x][z]["timeInterval"]["end"] == null) {
                        //If is null, that is mean the user is working on it
                        let reg2=[];
                        startH = this.logResponse[x][z]["timeInterval"]["start"].substring(11, 19);
                        endH = "UNKNOWN";
                        startDate = this.logResponse[x][z]["timeInterval"]["start"].substring(0, 10);
                        endDate = "UNKNOWN";
                        reg2 = [startDate,startH,endH,user];
                        this.LOGS.push(reg);
                        continue
                    }
                    
                    startH = this.logResponse[x][z]["timeInterval"]["start"].substring(11, 19);
                    endH = this.logResponse[x][z]["timeInterval"]["end"].substring(11, 19);
                    startDate = this.logResponse[x][z]["timeInterval"]["start"].substring(0, 10);
                    endDate = this.logResponse[x][z]["timeInterval"]["end"].substring(0, 10);

                    if (z === i) {
                        reg= [startDate,startH,endH,user];
                            continue
                    }
                
                    if (endDate === reg[0]) {
                        reg[2] = endH
                    }
                    else{
                        this.LOGS.push(reg);
                        reg = [startDate,startH,endH,user]
                    }
            
       
                }
            }
            this.setState({log: this.LOGS.map((date)=>{

                if (date[3] === selected) {
                    return (
                        <tr key={date} >
                            <th scope="row" className="th-logs"> {date[0]}   </th>
                            <th scope="row" className="th-logs"> {date[1]}   </th>
                            <th scope="row" className="th-logs"> {date[2]}   </th>
                            <th scope="row" className="th-logs"> {date[3]}   </th>
                        </tr>
                            
                        )
                }
                
            })})
        }
      
        

    }

  render() {
  
     
    return (
        <div >
            <h2  className="titleh2 ">Full Report</h2>
            <div className="infoWraper">
                <button className=" myBut" onClick={this.getUsers} >Select User</button>
                    <button className={this.state.butClass} style={{visibility: this.state.butStateVisible}}  onClick={()=>this.showDatelogs(this.state.selectedUser)}>Info</button>
                <table className="Users-table w-50">{this.state.usersData}</table>
                <table className=" w-50 table-Logs" border="1">
                    
                    <tr>
                    <th className="titleLOGS" scope="col">Date</th>
                    <th className="titleLOGS" scope="col">Start</th>
                    <th className="titleLOGS" scope="col">End</th>
                    <th className="titleLOGS" scope="col">Worker</th>
                    </tr>
                    {this.state.log}
                </table>

            </div>
            
    
        </div>
    );
  }
}

export default Info;
