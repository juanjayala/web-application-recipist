import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
} from "@material-ui/core";

// import { Navigate, Routes, useNavigate } from "react-router-dom";
// import React, { Component, useState } from "react";
import React from "react";
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
// import { User } from "../../../../models/user";
// import mongoose from "mongoose";
import { connect } from 'mongoose';

// const { User } = require('./../../models/user');
//  const { mongoose } = require("./../../db/mongoose");
// const { mongoose } = require("./../../db/mongoose")

// team43\models\user.js
// team43\db\mongoose.js
 
// const mongoose = require('mongoose')

// /* Connnect to our database */
// // Get the URI of the local database, or the one specified on deployment.
// const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/RecipistAPI'

// mongoose.connect(mongoURI, 
//     { useNewUrlParser: true, useUnifiedTopology: true})
//     .catch((error) => { 
//         console.log(error)
//         console.log('Error connecting to mongodb. Timeout reached.') 
//     })
// ;

class Login extends React.Component {
  constructor(props) {
    super(props);
    const isUser = props.isUser;
    this.state = { username: "", password: "", authflag: 1 };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    const checkUser = props.checkUser;
  }

  handleChange(event) {
    this.setState({
      username: event.state.username,
      password: event.state.password,
    });
  }

  handleRegister(event){
    
  }
  handleSubmit(event) {
    
    // var UserLogin = mongoose.model("User", User);
    // // var user = new UserLogin({email: this.state.username, password: this.state.password}) 

    // UserLogin.findByEmailPassword(this.state.username, this.state.password) 

    // findByEmailPassword(this.state.username,this.state.password)

    // event.preventDefault();
    // if (this.state.username == "user" && this.state.password == "user") {
    //   console.log("you clicked submit");
      // const user =  await User.findOne({ _id: this.state.username });
      // if (user) console.log("User exists");
    
      //   this.checkUser = true;
      //   console.log(this.checkUser);
      //{myUseHookValue}
   
    // }
    //  else if (
    //   this.state.username == "admin" &&
    //   this.state.password == "admin"
    // ) {
        // this.checkUser = false;
        // console.log(this.checkUser);
      //return <Link to={"/Manage"}></Link>;
    // } else if ( //change this condition to if the user does not exist
      // this.state.username == "admin" &&
      // this.state.password == "admin"
    // ) { 
      //insert code here for user not existing


    // }else {
      // alert("Incorrect Credentials!");
      // event.preventDefault();
    //   this.state.username == null;
    // }
  }

  render() {

    // const myUseHookValue = this.props.myUseHookValue;
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
                    Sign in below
                  </Typography>
                </Grid>
                <Grid item>
                  <form onSubmit={this.handleSubmit}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <TextField
                          type="text"
                          placeholder="Username"
                          fullWidth
                          name="username"
                          variant="outlined"
                          value={this.state.username}
                          onChange={(event) =>
                            this.setState({
                              [event.target.name]: event.target.value,
                            })
                          }
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
                          value={this.state.password}
                          onChange={(event) =>
                            this.setState({
                              [event.target.name]: event.target.value,
                            })
                          }
                          required
                        />
                      </Grid>
                      {/* <Grid item {if (this.state.username =='user' &&this.state.password =='user' ? : )}> */}
                      <Grid item>
                        {/* <Link {...this.isUser ? 'http://localhost:3000/Home': 'http://localhost:3000/'}  > */}
                        {/* <Link {...this.checkUser 
                        ? this.to='/Home'
                        : this.to="/User%20Feed"}> */}
                        <Link
                            // onClick={this.handleSubmit} 
                            target={'link'} // opens a seperate tab for the application
                            to={this.checkUser ? '/Manage' :'/Home'}
                            // style= {{marginTop: 10}}
                            // onClick={this.handleSubmit}
                            > 
                          {console.log(this.handleSubmit)}
                          <Button
                            // target={'link'}
                            // to={this.checkUser ? '/Manage' :'/Home'}
                            variant="contained"
                            color="primary"
                            // onClick={this.handleSubmit}
                            // type="submit"
                            className="button-block"
                            //to={`/Home`}
                          >
                            {/* <div>

                            </div> */}
                            {/* <a href="http://localhost:3000/Home"></a>
            </div> */}
                            {/* {if this.state.username =='user' &&this.state.password =='user' }
                                <Link to={'/Home'}></Link>  */}
                            {/* <Link to={'/Home'}></Link> */}
                            {/* <Link to={'/Manage'}></Link> */}
                            Login
                          </Button>
                        </Link>
                        <Link
                            onClick={this.handleRegister} 
                            target={'link'} // opens a seperate tab for the application
                            to={'/Register'}
                            // style= {{marginTop: 10}}
                            // onClick={this.handleSubmit}
                            > 
                          {/* {console.log(this.handleRegister)} */}
                          <Button
                           
                            variant="contained"
                            color="primary" 
                            // onClick={this.handleSubmit}
                            // type="submit"
                            className="button-block"
                            //to={`/Home`}
                          >
                           
                            Register
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
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
}
// export default withHook(Login, useNavigate, 'myUseHookValue');
export default Login;
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
  