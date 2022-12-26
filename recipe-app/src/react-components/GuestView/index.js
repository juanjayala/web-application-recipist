import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './styles.css';
import mockRecipes from './../../mockRecipes'

import Navbar from './../Nav';
import RecipeCard from './../RecipeCard';

const useStyles = makeStyles({
    recipesContainer: {
        paddingTop: "20px",
        paddingLeft: "55px",
        paddingRight: "55px",
    }
})

const GuestView = () => {
    const classes = useStyles();
    const [recipesData, setRecipesData] = useState(mockRecipes)

    const getRecipeCard = (recipeId) => {
        console.log(recipesData[`${recipeId}`])
        return (
            <Grid item md={4} lg={3} key={recipeId}>
                <RecipeCard recipeProp={recipesData[`${recipeId}`]}></RecipeCard>
            </Grid>
        )
    } 

    return (
        <div>
            <Navbar mod={false} colour={"primary"}/>
            <Grid container spacing={4} className={classes.recipesContainer}>
                {Object.keys(recipesData).map((recipeId) => getRecipeCard(recipeId))
                }
            </Grid>
        </div>
    );
}

export default GuestView;