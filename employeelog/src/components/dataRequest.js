import React from 'react';
import ReactDOM from 'react-dom';

class Car extends React.Component {
    constructor(props) {
        super(props);
        this.l = [];  
        this.newRequest=()=> {
            let url = 'https://api.clockify.me/api/v1/workspaces/5c334808b079874ebdd7c345/users';
                var xhttp = new XMLHttpRequest();

                xhttp.open('GET', url, true);
                xhttp.setRequestHeader("Content-type", "application/json");
                xhttp.setRequestHeader("X-Api-Key", "XWor3IxeV2M9g/mQ");
                xhttp.send();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                    let answer= this.responseText;
                    answer  = JSON.parse(answer);
                    this.getUsers(answer);
                
                    }
                }
        }
        this.getLogs =(usersworkspace, usersid)=>{
            //XWor3IxeV2M9g/mQ -- clave alejandro
            //Xmiz4o3aZjHM5X7l -- mi clave
            var xhttp = new XMLHttpRequest();
            let url = 'https://api.clockify.me/api/v1/workspaces/'+usersworkspace+'/user/'+usersid+'/time-entries';
            xhttp.open('GET', url, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            
            xhttp.setRequestHeader("X-Api-Key", "XWor3IxeV2M9g/mQ");
            xhttp.send();
            xhttp.onload = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let answer= this.responseText;
                    answer = JSON.parse(answer);
                    this.l.push(answer)
                    return answer;
                }      
            }

        

        }
        this.getUsers=(response)=>{
            let text;
            let users = [];
            for (const user of response) {
                users.push({"name":user.name, "id":user.id, "workspace":user.activeWorkspace});
                text+="<ol>";
                text+="<li>id :"+user.id+"</li>";
                text+="<li>email: "+user.email+"</li>";
                text+="<li>name: "+user.name+"</li>";
                text+="<li>workspace id :"+user.activeWorkspace+"</li>";
                text+="</ol>";
                text+="<br/><hr/>";
            }
            document.getElementById('view').innerHTML=text;;
            for (let x = 0; x < users.length; x++){
                this.getLogs(users[x].workspace, users[x].id);
                    if(x == users.length-1 ){
                        document.getElementById("info").disabled=false;
                        document.getElementById("info").onclick = ()=>{
                            this.showDatelogs(this.l, users); 
                        }

                    }
                }
        }

        this.showDatelogs=(response, users)=>{
            let text=""  
            let LOGS = [];
            let keysDate = [];
            for (let x = 0; x < response.length; x++) {
                let startDate;
                let endDate;
                let startH, endH;

                let z = response[x].length-1
                for (z; z >= 0; z--) {
                    if (response[x][z]["timeInterval"]["end"] == null) {
                        startH = response[x][z]["timeInterval"]["start"].substring(11, 19);
                        endH = "UNKNOWN"
                        startDate = response[x][z]["timeInterval"]["start"].substring(0, 10);
                        endDate = "UNKNOWN"

                        LOGS[endDate] = [startDate,startH,endDate,endH];
                        continue;
                    }
                    startH = response[x][z]["timeInterval"]["start"].substring(11, 19);
                    endH = response[x][z]["timeInterval"]["end"].substring(11, 19);
                    startDate = response[x][z]["timeInterval"]["start"].substring(0, 10);
                    endDate = response[x][z]["timeInterval"]["end"].substring(0, 10);

                    if(!keysDate.includes(endDate)){
                        keysDate.push(endDate);
                    }
                    
                    LOGS[endDate] = [startDate,startH,endDate,endH];
                }
                
            }
            
            for (let i = 0; i < keysDate.length; i++) {
                
            text+= "<p>Start Date: "+LOGS[keysDate[i]][0]+" Time: from "+LOGS[keysDate[i]][1]+" to "+LOGS[keysDate[i]][3]+"</p>"
                
            }
            document.getElementById('view2').innerHTML=text;

        }
    }


    

  
  render() {
    return (
        <div>
            <button disabled id="info" >Info</button>
            <button onClick="this.newRequest()">GET</button>
            <div id="view"></div>
            <div id="view2">Ey</div>
        </div>
    );
  }
}

export default Car;
