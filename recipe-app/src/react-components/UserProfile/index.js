import React, { useState, useEffect } from 'react';
import "./styles.css";
import { makeStyles } from '@material-ui/core/styles';

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { Link } from "react-router-dom";

import Navbar from "./../Nav";
import RecipeCard from "./../RecipeCard";

import ENV from '../../config.js'
const API_HOST = ENV.api_host

const useStyles = makeStyles({
    recipesContainer: {
        paddingTop: "20px",
        paddingLeft: "55px",
        paddingRight: "55px",
    }
})

const UserProfile = (props) => {
    const classes = useStyles()
    const [userInfo, setUserInfo] = useState([])
    const [recipesData, setRecipesData] = useState([])
    const [numRecipes, setNumRecipes] = useState("")
    // const numRecipes = "cHaN!ge"

    // CHANGE THIS TO CHECK IF WE ARE LOGGED IN TO SAME USER AS THIS PROFILE
    const curr_user = true;

    // CHANGE THIS: TO GET USER ID FROM LOGGED IN INFO
    // const id = '624b3e2e045954b63f4bc861'
    const id = props.curr_id
    
    useEffect(() => {
        // console.log(props.curr_id)
        // get user's name
        fetch(`${API_HOST}/api/users/${id}`)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    alert("Could not get recipes")
                }
            })
            .then(data => {
                setUserInfo(data)
            })
            .catch(error => {
                console.log(error)
            })


        // get the user's recipes
        fetch(`${API_HOST}/api/recipes`)
            .then(res => {
                if (res.status === 200) {
                    // return a promise that resolves with the JSON body
                    return res.json();
                } else {
                    alert("Could not get recipes");
                }
            })
            .then(data => {
                console.log(data)
                // get recipes of this user
                const user_recipes = []
                let num_rec = 0
                for (let i = 0; i < data.length; i++){
                    // console.log(data[i])
                    let curr_recipe = data[i]

                    if (curr_recipe.creator === id){
                        user_recipes.push(curr_recipe)
                        num_rec = num_rec + 1
                    }
                }
                console.log(user_recipes)
                
                setRecipesData(user_recipes)
                setNumRecipes(num_rec)

            })
            .catch(error => {
                console.log(error);
            });
        
        
    }, [])

    const getRecipeCard = (recipe) => {
        console.log(recipe)
        return (
            <Grid item md={6} lg={6} key={recipe.id}>
                <RecipeCard key={Math.random()} recipeProp={recipe}></RecipeCard>
            </Grid>
        )
    }

    return (
      <div>
        <Navbar mod={false} colour={"primary"} />

        {curr_user ? (
          <div>
            <Container sx={{ py: 8 }} maxWidth="md">
              <div id="bio">
                <div class="profilePicContainer">
                  <img src="/images/gordon.jpg" id="profilePicture" />
                </div>
                <div class="userInfo">
                  <p>{userInfo.name}</p>
                  {/* <p class="handle">@{this.state.username} </p> */}
                  <p>Recipes: {numRecipes} </p>
                  <Link to="/EditProfile" style={{ textDecoration: "none" }}>
                    <Button variant="outlined">Edit Profile</Button>
                  </Link>
                </div>
              </div>
            </Container>
            <Container sx={{ py: 8 }} maxWidth="lg">
              <Grid container spacing={4} className ={classes.recipesContainer}>
                  {recipesData.map((recipe) => getRecipeCard(recipe))}
              </Grid>
            </Container>
          </div>
        ) : (
          <div>
            <Container sx={{ py: 8 }} maxWidth="md">
              <div id="bio">
                <div class="profilePicContainer">
                  <img src="/images/gordon.jpg" id="profilePicture" />
                </div>
                <div class="userInfo">
                  <p>{userInfo.name}</p>
                  <p>Recipes: {numRecipes} </p>
                </div>
              </div>
            </Container>
            <Container sx={{ py: 8 }} maxWidth="lg">
              <Grid container spacing={4} className ={classes.recipesContainer}>
                  {recipesData.map((recipe) => getRecipeCard(recipe))}
              </Grid>
            </Container>
          </div>
        )}
      </div>
    );
}

export default UserProfile;
