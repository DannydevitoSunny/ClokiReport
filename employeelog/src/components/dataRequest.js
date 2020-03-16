import React from 'react';


class Info extends React.Component {
    constructor(props) {
        super(props);
        this.logResponse = [];  
        this.users = []; 
        this.LOGS = {};
        this.keysDate = [];
        this.state ={
            usersData : "",
            log :"",
            butState : true
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
                    this.setState({butState: false});
                    this.setState({usersData: this.users.map((item)=>{
                        return (
                            <li className="list-group-item" key={item.id}>{item.name}-{ item.id}-{ item.workspace}</li>
                        )
                    })})
                    
                    //Here I unlock the button
                }
                }
      
        }

        
        
        this.showDatelogs=()=>{
            
         
            for (let x = 0; x < this.logResponse.length; x++) {
                let startDate;
                let endDate;
                let startH, endH;
                let user;
                let z = this.logResponse[x].length-1;
                let reg = []
                for (z; z >= 0; z--) {
                    
                    if (this.logResponse[x][z]["timeInterval"]["end"] == null) {
                        //If is null, that is mean the user is working on it
                        continue
                    }
                    for (let j = 0; j < this.users.length; j++) {
                        if (this.users[j].id === this.logResponse[x][z]["userId"] ) {
                            user = this.users[j].name;
                            break;
                        }
                    }
                    startH = this.logResponse[x][z]["timeInterval"]["start"].substring(11, 19);
                    endH = this.logResponse[x][z]["timeInterval"]["end"].substring(11, 19);
                    startDate = this.logResponse[x][z]["timeInterval"]["start"].substring(0, 10);
                    endDate = this.logResponse[x][z]["timeInterval"]["end"].substring(0, 10);

                   if (z === 0) {
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

           
                return (
                <tr key={date} >
                    <th scope="row" className="text-white bg-primary"> {date[0]}   </th>
                    <th scope="row" className="text-white bg-primary"> {date[1]}   </th>
                    <th scope="row" className="text-white bg-primary"> {date[2]}   </th>
                    <th scope="row" className="text-white bg-primary"> {date[3]}   </th>
                </tr>
                    
                )
            })})
        }
      
        

    }

  render() {
  
     
    return (
        <div>
            <h2>Visualizacion de tiempo de tarea por usuario cada dia:</h2>
            <button className="btn btn-info" disabled={this.state.butState} onClick={this.showDatelogs}  >Info</button>
            <button className="btn btn-info" onClick={this.getUsers} >GET</button>
            <ul className="list-group">{this.state.usersData}</ul>
            <table className="table" border="1">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Start</th>
                    <th scope="col">End</th>
                    <th scope="col">Worker</th>
                    </tr>
                </thead>
                {this.state.log}
            </table>
    
        </div>
    );
  }
}

export default Info;
