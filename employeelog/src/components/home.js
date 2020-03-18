import React from "react";
import './Custom_styles/style_one.css'


class Home extends React.Component{
    render(){
        return(
            <div>
              <table className="Api-key " >
                <tr>
                  <th className="text-dark p-3" scope="row">Change Api-KEY</th>
                  <th scope="row"><input type="text" placeholder="API_KEY"></input></th>
                  <th className="p-3" scope="row"><input type="button" className="bg-white text-primary" value="Change"></input></th>
                </tr>
              </table>
            </div>

            )

    }

}
export default Home;