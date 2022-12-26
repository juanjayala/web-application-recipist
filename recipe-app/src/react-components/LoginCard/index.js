import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
} from "@material-ui/core";

import React, { Component, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import "./styles.css";
import mockRecipes from "./../../mockRecipes";
import ReactDOM from "react-dom";
import Navbar from "./../Nav";
import RecipeCard from "./../RecipeCard";
import { Redirect } from "react-router-dom";

import MenuItem from "@mui/material/MenuItem";
import { useHistory, Link } from "react-router-dom";
import UserView from "../UserView";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import withHook from "./highorder";
import { useNavigate } from "react-router-dom";

//import { login } from "../../actions/user";

import ENV from '../../config.js'
const API_HOST = ENV.api_host

const Login = (props) => {
    const navigate = useNavigate()
    // source for the log in useState and handleChange function: https://sebhastian.com/handlechange-react/
    const [formValue, setFormValue] = useState({
        email: "",
        password: ""
    });


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const { email, password } = formValue;

    const login = (app) => {
        // console.log('hi')
        //message div
		const message = document.querySelector('#message')

        // login
        const url = `${API_HOST}/api/users/login`
        // the data we are going to send
        let data = {
			email: email,
			password: password
		}

        // create request constructor
        const request = new Request(url, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-type":"application/json; charset=UTF-8",
            }
        })

        // send the request with fetch
        fetch(request)
        .then(res => {
            if (res.status === 200){
                return res.json();
            }
            else {
                message.innerText = 'Failed: Incorrect login/password.'
                message.setAttribute("style", "color: red")
            }
        })
        .then(json => {
            console.log(json.isAdmin)
            if (json.isAdmin){
                // console.log(json.currentEmail)
                navigate("/Feed")
                app.setState({ currentUser: json.currentUser, currentEmail: json.currentEmail })
            } else {
                navigate("/Home")
                // console.log(json.currentEmail)
                app.setState({ currentUser: json.currentUser, currentEmail: json.currentEmail })
            }
        })
        .catch(error => {
            console.log(error)
        })

    }

    const register = () => {
 		//message div
		const message = document.querySelector('#message')

		// register
		const url = `${API_HOST}/api/users`
		// the data we are going to send
		let data = {
			email: email,
			password: password
		}

        // create request constructor
        const request = new Request(url, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-type":"application/json; charset=UTF-8",
            }
        })

        // send the request with fetch
        fetch(request)
        .then(res => {
            if (res.status === 200){
                // registered successfully
                message.innerText = 'Sucess: Account registered.'
                message.setAttribute("style", "color: green")
            } else {
                message.innerText = 'Failed: Invalid email/password.'
                message.setAttribute("style", "color: red")
            }

        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
      <div>
        <AppBar position="static" alignitems="center" color="primary">
          <Toolbar>
            <Grid container justify="center" wrap="wrap">
              <Grid item>
                <Typography variant="h6">RECIPIST</Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <Grid container spacing={0} justify="center" direction="row">
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              spacing={2}
              className="login-form"
            >
              <Paper
                variant="elevation"
                elevation={2}
                className="login-background"
              >
                <Grid item>
                  <Typography component="h2" variant="h4">
                    Welcome to Recipist
                  </Typography>
                  <Typography component="h2" variant="h6">
                    Sign in or Register:
                  </Typography>
                </Grid>
                <Grid item>
                  <form>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <TextField
                          type="text"
                          placeholder="Email"
                          fullWidth
                          name="email"
                          variant="outlined"
                          onChange={(e) => handleChange(e)}
                          value={email}
                          required
                          autoFocus
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          type="password"
                          placeholder="Password"
                          fullWidth
                          name="password"
                          variant="outlined"
                          value={password}
                          onChange={(e) => handleChange(e)}
                          required
                        />
                      </Grid>
                      <Grid item>
                      <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={() => login(props.app)}
                        >
                            Login
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={() => register()}
                        >
                            Register
                        </Button>
                      </Grid>
                    </Grid>
                    <div>
                    	<p id="message"></p>
                    </div>
                  </form>
                </Grid>
                <Grid item></Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
}

export default Login;






// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     const isUser = props.isUser;
//     this.state = { username: "", password: "", authflag: 1 };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     const checkUser =
//       this.state.username == "user" && this.state.password == "user"
//         ? [true]
//         : [false];
//   }

//   handleChange(event) {
//     this.setState({
//       username: event.state.username,
//       password: event.state.password,
//     });
//   }
//   handleSubmit(event) {
    
//     event.preventDefault();
//     if (this.state.username == "user" && this.state.password == "user") {
//     } else if (
//       this.state.username == "admin" &&
//       this.state.password == "admin"
//     ) {
//       return <Link to={"/Manage"}></Link>;
//     } else {
//       alert("Incorrect Credentials!");
//     }
//   }

//   render() {

    // const myUseHookValue = this.props.myUseHookValue;
    
//   }
// }
// export default withHook(Login, useNavigate, 'myUseHookValue');

// default Login;

// const renderForm = (
//     <div className="form">

//       <form onSubmit={handleSubmitUser}>
//         <div className="input-container">
//           <label>Username </label>
//           <input type="text" name="uname" required />
//           {renderErrorMessage("uname")}
//         </div>
//         <div className="input-container">
//           <label>Password </label>
//           <input type="password" name="pass" required />
//           {renderErrorMessage("pass")}
//         </div>
//         <div className="button-container">
//           <input type="submit" value="Guest Login" />
//         </div>
//         <div className="button-container">
//           <input type="submit" value="Login"/>
//         </div>
//         <div className="button-container">
//           <input type="submit" value="Signup"/>
//         </div>
//       </form>

//     </div>

//   );