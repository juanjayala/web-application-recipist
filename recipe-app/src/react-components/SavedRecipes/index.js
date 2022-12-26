import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { Card, CardContent } from '@mui/material';
import Box from '@mui/material/Box';

import Navbar from "./../Nav";
import RecipeCard from "./../RecipeCard";

import ENV from '../../config.js'
const API_HOST = ENV.api_host

const useStyles = makeStyles({
    recipesContainer: {
        paddingTop: "20px",
        paddingLeft: "55px",
        paddingRight: "55px",
    },

    header: {
        textAlign: "center",
        alignSelf: "center"
    }
})

const SavedRecipes = (props) => {
    console.log(props.isAdmin)
    const classes = useStyles()
    const [recipesData, setRecipesData] = useState([])

    // CHANGE THIS: TO GET USER ID FROM LOGGED IN INFO
    // const id = '6248bf22501695b27cd4783c'
    // console.log(props.curr_id)
    const curr_id = props.curr_id
    const nav_color = props.isAdmin? "secondary" : "primary"

    useEffect(() => {
        // get saved recipes from current session user
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
            // console.log(data)
            // get saved recipes of this user
            const saved_recipes = []
            for (let i = 0; i < data.length; i++){
                // console.log(data[i])
                let curr_recipe = data[i]

                // console.log(curr_recipe)
                // console.log(curr_recipe.saved_by)
                // console.log(props.curr_id)

                // console.log(curr_recipe.saved_by.includes(props.curr_id))
                
                if (curr_recipe.saved_by.includes(curr_id)){
                    saved_recipes.push(curr_recipe)
                }
            }
            console.log(saved_recipes)
            
            setRecipesData(saved_recipes)

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
        <Navbar mod={props.isAdmin} colour={nav_color} />
        <div>
        <div className={classes.header}>
            <h2>Saved Recipes</h2>
        </div>
        {/* <Card style={{ maxWidth: 300, margin: "0 auto", padding: "5px 5px" }}>
            <CardContent>
            <Typography gutterBottom variant="h5">
                Saved Recipes
            </Typography>
            </CardContent>
        </Card> */}
          <Container sx={{ py: 8 }} maxWidth="lg">
            <Grid container spacing={4} className={classes.recipesContainer}>
              {recipesData.map((recipe) => getRecipeCard(recipe))}
            </Grid>
          </Container>
        </div>
      </div>
    );
}

export default SavedRecipes;