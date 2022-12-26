// import * as React from 'react';
// import { useState } from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea, CardActions } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import CommentIcon from '@mui/icons-material/Comment';
// import SlideshowIcon from '@mui/icons-material/Slideshow';
// import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

// export default function RegisterUser(props) {
//     const user = props.userProp;
//     const { email, password, name } = user;

//     const [liked, setLiked] = useState(false);
//     const [saved, setSaved] = useState(false);

//     return (
//         <Card sx={{ maxWidth: 500 }}>
//             <CardActionArea>
//                 {/* <CardMedia
//                     component="img"
//                     height="140"
//                     image={require("./../../Images/" + pic)}
//                     alt="chicken teriyaki"
//                 /> */}
//                 <CardContent>
//                     <Typography gutterBottom variant="h6" component="div">
//                         {`${email}`}
//                     </Typography>
//                     <Typography variant="body1" color="text.secondary">
//                         {`${password}`}
//                     </Typography>
//                     <Typography variant="subtitle" color="text.secondary">
//                         {`${name}`}
//                     </Typography>
//                 </CardContent>
//             </CardActionArea>
//             <CardActions>
//                 <IconButton aria-label="add to favorites" onClick={() => setLiked(!liked)}>
//                     {liked ?
//                         (<FavoriteIcon></FavoriteIcon>) : (<FavoriteBorderIcon></FavoriteBorderIcon>)
//                     }
//                 </IconButton>
//                 <IconButton aria-label="add a comment">
//                     <CommentIcon />
//                 </IconButton>
//                 <IconButton aria-label="add a comment">
//                     <SlideshowIcon />
//                 </IconButton>
//                 <IconButton aria-label="add a comment" style={{ marginLeft: "auto" }} onClick={() => setSaved(!saved)}>
//                     {saved ?
//                         (<BookmarkIcon></BookmarkIcon>) : (<BookmarkBorderIcon></BookmarkBorderIcon>)
//                     }
//                 </IconButton>
//                 <IconButton aria-label="add a comment">
//                     <ReportGmailerrorredIcon />
//                 </IconButton>

//             </CardActions>
//         </Card>
//     );
// }