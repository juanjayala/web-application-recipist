import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CommentIcon from '@mui/icons-material/Comment';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { reportRecipe } from '../../actions/recipes';
import { Link } from 'react-router-dom';

import "./styles.css";
import ENV from '../../config.js'
const API_HOST = ENV.api_host

export default function RecipeCard(props) {
    const recipe = props.recipeProp;
    const { _id, image_id, dish_name, creator_name, date_created } = recipe;
    // console.log(_id)

    const curr_id = props.curr_id

    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [image, setImage] = useState(null);
    // console.log(image_id)
    // console.log(image)

    const saveRecipe = () => {
        console.log(curr_id)

        const id = props.curr_id

        const url = `${API_HOST}/api/recipes/${_id}/savedby`

        let data = {
            user: id
        }

        // create request constructor
        const request = new Request(url, {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-type":"application/json; charset=UTF-8",
            }
        });

        // send the request with fetch
        fetch(request)
        .then(res => {
            if (res.status === 200){
                alert("Recipe saved!")
            }
        })
        .catch(error => {
            console.log(error)
            alert("Error saving recipe!")
        }) 
    }

    useEffect(() => {
        fetch(`${API_HOST}/images/${image_id}`)
            .then(res => {
                if (res.status === 200) {
                    // return a promise that resolves with the JSON body
                    return res.json();
                } else {
                    // alert("Could not get image");
                }
            })
            .then(data => {
                // the resolved promise with the JSON body
                setImage(data.image);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])
    if(image){
        // console.log(image.image_url)
    }
    

    return (
            <Card sx={{ maxWidth: 500 }}>
                
                <Link className="card-links" to={`/recipe/${_id}`} state= {{ _id:_id, 
        image_id: image_id,
         dish_name: dish_name,
          creator_name: creator_name,
           date_created:date_created,
           isAdmin: props.isMod }}
>
                    <CardActionArea>
                        {image && <CardMedia
                            component="img" 
                            height="140"
                            image={image.image_url}
                            alt="Image not available"
                        />}
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {`${dish_name}`}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {`${creator_name}`}
                            </Typography>
                            <Typography variant="subtitle" color="text.secondary">
                                {`${date_created}`}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
            <CardActions>
                <IconButton aria-label="add to favorites" onClick={() => setLiked(!liked)}>
                    {liked ?
                        (<FavoriteIcon></FavoriteIcon>) : (<FavoriteBorderIcon></FavoriteBorderIcon>)
                    }
                </IconButton>
                <IconButton aria-label="add a comment">
                    <CommentIcon />
                </IconButton>
                <IconButton aria-label="add a comment">
                    <SlideshowIcon />
                </IconButton>
                <IconButton aria-label="add a comment" style={{ marginLeft: "auto" }} onClick={() => saveRecipe()}>
                    {saved ?
                        (<BookmarkIcon></BookmarkIcon>) : (<BookmarkBorderIcon></BookmarkBorderIcon>)
                    }
                </IconButton>
                <IconButton aria-label="add a comment" onClick={() => reportRecipe(_id)}>
                    <ReportGmailerrorredIcon />
                </IconButton>

            </CardActions>
        </Card >
    );
}