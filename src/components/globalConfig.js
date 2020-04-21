import React, { Component } from 'react';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { spanish } from './Translate.js';
require('dotenv').config()
export var Domain = process.env.REACT_APP_API_ENDPOINT
var lang = navigator.language.substring(0, 2).toUpperCase();

const resources = {
  ES: {
    translation: spanish
  },
  EN: {
    translation: {//Original Web is already in english

    }
  }
};

function changeLenguage(lang) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: lang,
      fallbackLng: lang,
      keySeparator: false,
      interpolation: {
        escapeValue: false
      }
    });
}



export function Translate(r) {
  const { t } = useTranslation();

  return t(r.word);
}
export const MyContext = React.createContext();
export class MyProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      CIF: "",
      Company: "",
      ApiKey: "Key Required",
      lang: "IN",
      UserName: "",
      email: "",
      id: "",
      Warning: "",
      session: "",
      breakTime: "1"
    }



    this.request = (data) => {
      /* THIS FUNCTION MANAGE USER SESSIONS AND ALL CHANGES IN THE CONFIGURATION */
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", data[0], true);
      xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhttp.send(data[2]);
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let result = JSON.parse(this.responseText);
          myCallback(result);
        }
      };



      var myCallback = (result) => {
        switch (data[1]) {
          case "reg": this.StartSession(result); break;
          case "log": this.StartSession(result); break;
          case "conf": this.updateGlobal(); break;
          case "update": this.SetNewValues(result); break;
          case "facebook": this.StartSession(result); break;
          default: break;
        }



      }
      this.StartSession = (r) => {

        if (r["success"] === "true") {
          let id = r["id"];
          let obj = JSON.stringify({ "id": id })
          localStorage.setItem("userNameSession", obj);
          this.updateGlobal();
        }
        else {
          this.setState({
            Warning: r["warning"],
          })
        }

      }


    }

    this.CloseSession = () => {
      localStorage.clear();
      this.setState({ session: "" })
    }


    this.updateGlobal = () => {
      let id = JSON.parse(localStorage.getItem("userNameSession"));
      let postRequest = "&id=" + id.id;
      let data = [Domain+"/PHP/getGlobal.php", "update", postRequest]
      this.request(data);

    }

    this.SetNewValues = (r) => {
      this.setState({ Warning: r[""] });
      this.setState({ session: r["success"] })
      this.setState({ email: r["email"] });
      this.setState({ UserName: r["name"] });
      this.setState({ id: r["id"] });
      this.setState({ ApiKey: r["apikey"] });
      this.setState({ lang: r["lang"] });
      this.setState({ breakTime: r["breakTime"] });
      this.setState({ Company: r["company"] });
      this.setState({ CIF: r["CIF"] });
      lang = this.state.lang.toString();
   
    }
  }

  componentWillMount() {
    if (localStorage.getItem("userNameSession") !== null) {
      this.updateGlobal();
    }

  }
  componentWillUpdate(nextProps, nextState) {
    changeLenguage(this.state.lang);
  }

  render() {

    return (
      <MyContext.Provider value={{
        state: this.state,
        submit: this.request,
        closeSession: this.CloseSession,
      }}>
        {this.props.children}{/*-->This is required, you can't change this name, otherwise you get an error */}
      </MyContext.Provider>
    )
  }
}