import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import mockRecipes from './../../mockRecipes'

import Navbar from './../Nav';
import RecipeCard from './../RecipeCard';
import RecipeTable from './recipeTable';



const useStyles = makeStyles({
    recipesContainer: {
        paddingTop: "20px",
        paddingLeft: "55px",
        paddingRight: "55px",
    }
})

const ModManage = () => {
    const classes = useStyles();

    return (
        <div>
            <Navbar mod={true} colour={"secondary"}/>
            <Grid container spacing={4} className={classes.recipesContainer}>
                <RecipeTable></RecipeTable>
            </Grid>
        </div>
    );
}

export default ModManage;