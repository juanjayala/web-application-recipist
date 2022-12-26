import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
// import { uid } from "react-uid";
import Typography from "@mui/material/Typography";

import Navbar from "./../Nav";
import RecipeCard from "./../RecipeCard";
import Container from "@mui/material/Container";

import "./styles.css";
import ENV from "../../config.js";
import { Card, CardActionArea, CardMedia, Input } from "@mui/material";
const API_HOST = ENV.api_host;

const ViewRecipe = () => {
  const location = useLocation()
  const { isAdmin } = location.state
  const [recipeData, setRecipeData] = useState(null);
  const [image, setImage] = useState(null);
  const [wantedServing, setWantedServing] = useState("")
  const [servingSizeMulitiplier, setServingSizeMulitiplier] = useState(1)
  const recipe_id = useParams();
  //const servingSizeMulitiplier = 1;// useState(null);
  //const servingSizeTotal = null;
  console.log(recipe_id);

  const handleServingSize = (e) => {
    setWantedServing(e.target.value)
    setServingSizeMulitiplier(e.target.value / recipeData.serving_size)
  }

  

  useEffect(() => {
    fetch(`${API_HOST}/api/recipes/${recipe_id.id}`)
      .then((res) => {
        if (res.status === 200) {
          // return a promise that resolves with the JSON body
          return res.json();
        } else {
          alert("Could not get recipes");
        }
      })
      .then((data) => {
        // the resolved promise with the JSON body
        setRecipeData(data);
        setWantedServing(data.serving_size);
        //console.log(data.image_id);
        fetch(`${API_HOST}/images/${data.image_id}`)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get image");
            }
        })
        .then(data => {
            // the resolved promise with the JSON body
            setImage(data.image);
        })
        .catch(error => {
            console.log(error);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



//   useEffect(() => {
//     fetch(`${API_HOST}/images/${recipeData.image_id}`)
//         .then(res => {
//             if (res.status === 200) {
//                 // return a promise that resolves with the JSON body
//                 return res.json();
//             } else {
//                 alert("Could not get image");
//             }
//         })
//         .then(data => {
//             // the resolved promise with the JSON body
//             setImage(data.image);
//         })
//         .catch(error => {
//             console.log(error);
//         });
// }, [])

  console.log(recipeData);
  console.log(image);
  console.log(wantedServing)
  console.log(servingSizeMulitiplier)

  return (
    <div>
      <Navbar mod={isAdmin} colour={isAdmin? "secondary" : "primary"} />
      {/* {recipeData && <RecipeCard key={Math.random()} recipeProp={recipeData}></RecipeCard>} */}

      {recipeData && (
        <div
          //  fontSize={500}

          className="Title"
          //
        >
          {recipeData.dish_name}
        </div>
      )}
      <div className="createdBy" component="div">
        Created by:{" "}
        {recipeData && (
          <div className="amd" component="div">
            {recipeData.creator_name}
          </div>
        )}
      </div>
      <div className="createdOn">
        Created on:{" "}
        {recipeData && <div className="amd">{recipeData.date_created}</div>}
      </div>
      <div>
        <div className="Servingsize">
          Set Serving Size:
          <Input
            justify
            type="number"
            className="Servingsizeinsert"
            value={wantedServing}
            onChange={(e) => handleServingSize(e)}
            
            
            placeholder="        Insert Here"
          ></Input>
        </div>
        <div>
          
          <Card className="card" sx={{ maxWidth: 800 }}>
            <CardActionArea>
                            
            {recipeData && image &&(<CardMedia component="img"
                            height="400" image={image.image_url} alt="Image not available" >
                  {/* <img src="https://meowlivia.s3.us-east-2.amazonaws.com/codepen/Waitress/GettingOutOfMudPie.png" /> */}
                  {/* {recipeData.image_id} */}
                </CardMedia>)}

            </CardActionArea>
          </Card>
          {recipeData && (
            <span className="ingredients">
              Ingredients
              {recipeData.ingredients.map((ingredients) => (
                <div className="ingredients-list">
                  {/* {recipeData.serving_size*servingSizeMulitiplier} */}
                   {ingredients.serving_size} 
                  {ingredients.amount * servingSizeMulitiplier}
                  <span className="ingredients-list-name">
                    {ingredients.name} {ingredients.unit}
                  </span>
                </div>
              ))}
            </span>
          )}
        </div>
      </div>
      {/* {recipeData && <div  component="div">{recipeData.serving_size}</div>}  */}
      {/* {recipeData && <h3>{recipeData}</h3>} */}

      {/* Double Check that the Image ID is active */}

      {/* Need to break down the steps here */}
      <div className="instruction-title">
        Instructions
        {recipeData && <div></div>}
      </div>

      {recipeData && (
        <div>
          {recipeData.steps.map((steps) => (
            <div className="instructions">{steps}</div>
          ))}
        </div>
      )}

    </div>
  );
};

export default ViewRecipe;
