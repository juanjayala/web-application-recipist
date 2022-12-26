import React, { useState, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import mockRecipes from './../../mockRecipes'
import { uid } from "react-uid";

import Navbar from './../Nav';
import RecipeCard from './../RecipeCard';
import AnnouncePopUp from '../AnnouncePopUp';

import { SearchContext } from "../../context/search_context";

import ENV from '../../config.js'
const API_HOST = ENV.api_host


const useStyles = makeStyles({
    recipesContainer: {
        paddingTop: "20px",
        paddingLeft: "55px",
        paddingRight: "55px",
    }
})

const ModView = (props) => {
    const classes = useStyles();
    const [recipesData, setRecipesData] = useState([])

    const searchContext = useContext(SearchContext);

    useEffect(() => {
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
                // the resolved promise with the JSON body
                setRecipesData(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    const getRecipeCard = (recipe) => {
        //console.log(recipe)
        return (
            <Grid item md={4} lg={3} key={recipe.id}>
                <RecipeCard key={uid(recipe)} isMod={true} recipeProp={recipe}></RecipeCard>
            </Grid>
        )
    }

    return (
        <div>
            <Navbar mod={true} colour={"secondary"}/>
            <Grid container spacing={4} className={classes.recipesContainer}>
                {recipesData.map((recipe) => recipe.dish_name.toLowerCase().includes(searchContext.query) && getRecipeCard(recipe))
                }
            </Grid>
            <AnnouncePopUp trigger={props.announce}></AnnouncePopUp>

        </div>
    );
}

export default ModView;