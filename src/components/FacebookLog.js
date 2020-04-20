import React from 'react';
import FacebookAuth from 'react-facebook-auth';
import {MyContext,Domain} from "./globalConfig.js";
import {Translate} from './LocateTrans.js'
 
const MyFacebookButton = ({ onClick }) => (
  <button className="fa fa-facebook-official btn-login-with bg1 m-b-10 " onClick={onClick}>
    <Translate word="Log in with Facebook"/>
  </button>
);

 
const FacebookLog = () => (
  <div>
    <MyContext.Consumer>
                 {(value) => (
      <FacebookAuth
        appId="260918438260759"
        callback={(r)=>{
            if (typeof r["email"]!=="undefined" ) {
                let url = Domain+"/PHP/facebook_session.php";
                let origin = "facebook";
                let post = "email="+r["email"];
                let data = [url,origin,post];
                value.submit(data);
            };
          }
          
        }
        component={MyFacebookButton}
      />
      )}
    </MyContext.Consumer>
  </div>
);
 

export default FacebookLog;
