import React, { useState, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './styles.css';
import mockRecipes from './../../mockRecipes'
// import { uid } from "react-uid";

import Navbar from './../Nav';
import RecipeCard from './../RecipeCard';
import UserAnnouncements from '../UserAnnouncements';

import { SearchContext } from "../../context/search_context";
import { useNavigate } from "react-router-dom";

import ENV from '../../config.js'
const API_HOST = ENV.api_host

const useStyles = makeStyles({
    recipesContainer: {
        paddingTop: "20px",
        paddingLeft: "55px",
        paddingRight: "55px",
    }
})

const UserView = (props) => {
    const navigate = useNavigate()
    const classes = useStyles();
    const [recipesData, setRecipesData] = useState([])

    const searchContext = useContext(SearchContext);

    const curr_id = props.curr_id

    useEffect(() => {
        // check if logged in
        fetch(`${API_HOST}/api/session`)
        .then(res => {
            if (res.status === 200) {
                // user in session
                console.log(res.json())
            } else {
                // console.log(res.json())
                navigate("/Home")
            }
        })
        .catch(error => {
            console.log(error);
        });



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
                // console.log(data)
                setRecipesData(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    const getRecipeCard = (recipe) => {
        // console.log(recipe)
        return (
            <Grid item md={4} lg={3} key={recipe.id}>
                <RecipeCard key={Math.random()} isMod={false} recipeProp={recipe} curr_id={curr_id}></RecipeCard>
            </Grid>
        )
    }

    return (
        <div>
            <Navbar mod={false} colour={"primary"}/>
            <Grid container spacing={4} className={classes.recipesContainer}>
                {recipesData.map((recipe) => recipe.dish_name.toLowerCase().includes(searchContext.query) && getRecipeCard(recipe))}
            </Grid>
            <UserAnnouncements trigger={props.announce}></UserAnnouncements>
        </div>
    );
}

export default UserView;