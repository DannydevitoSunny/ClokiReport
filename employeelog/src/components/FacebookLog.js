import React from 'react';
import FacebookAuth from 'react-facebook-auth';
import {MyContext } from "./globalConfig.js";
 
const MyFacebookButton = ({ onClick }) => (
  <button className="fa fa-facebook-official btn-login-with bg1 m-b-10 " onClick={onClick}>
    Login with facebook
  </button>
);

 
const FacebookLog = () => (
  <div>
    <MyContext.Consumer>
                 {(value) => (
      <FacebookAuth
        appId="260918438260759"
        callback={(r)=>{
            console.log(r);
            if (typeof r["email"]!=="undefined" ) {
                let url = "http://localhost/PHP/facebook_session.php";
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
