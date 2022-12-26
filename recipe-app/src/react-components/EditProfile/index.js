import React from 'react';

import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Card, CardContent} from '@mui/material';

import Navbar from "./../Nav";


// citation for the MUI layout of the edit page: https://www.youtube.com/watch?v=Lv3OhfcxjkA&list=LL&index=1&t=542s

class EditProfile extends React.Component {
  // get current name/username from database (IMPLEMENT PHASE 2)
  //
  //     currName: "Gordon Ramsay",
  //     currUsername: "RealGordonRamsay",
  //

  // just need to change database and we just render name from db, no need to change it in app itself
//   state = {
//     newName: "",
//     newUsername: "",
//   };

//   handleInputChange = (event) => {
//     const target = event.target;
//     const value = target.value;
//     const name = target.name;

//     this.setState({
//       [name]: value,
//     });
//   };

  addNew = () => {
    // IMPLEMENT PHASE 2:
    // get current name + username from db

    // check that username is valid (not blank, longer than __ characters, only letters and underscores)
    // check if user exists

    // currName = this.state.newName
    // currUsername = this.state.

    return null;
  };

  render() {
    return (
        <div>
            <div>
                <Navbar mod={false} colour={"primary"} />
            </div>
            <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        Edit Profile
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid xs={12} item>
                            <Link to="/EditName" style={{ textDecoration: 'none' }}>
                                <Button 
                                variant="outlined"
                                fullWidth
                                >
                                Edit name
                                </Button>
                            </Link>
                        </Grid>
                        <Grid xs={12} item>
                            <Link to="/EditEmail" style={{ textDecoration: 'none' }}>
                                <Button 
                                variant="outlined"
                                fullWidth
                                >
                                Edit email
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>

    //   <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
    //     <CardContent>
    //       <Typography gutterBottom variant="h5">
    //         Edit Profile
    //       </Typography>
    //       <form>
    //         <Grid container spacing={1}>
    //           <Grid xs={12} item>
    //             <TextField
    //               required
    //               label="Name"
    //               variant="outlined"
    //               fullWidth
    //               name="newName"
    //               value={this.state.newName}
    //               onChange={this.handleInputChange}
    //             ></TextField>
    //           </Grid>
    //           <Grid xs={12} item>
    //             <TextField
    //               required
    //               label="Username"
    //               variant="outlined"
    //               fullWidth
    //               name="newUsername"
    //               value={this.state.newUsername}
    //               onChange={this.handleInputChange}
    //             ></TextField>
    //           </Grid>
    //           <Grid xs={12} item>
    //             <Button
    //               variant="contained"
    //               color="primary"
    //               fullWidth
    //               onClick={() => this.addNew()}
    //             >
    //               Submit
    //             </Button>
    //           </Grid>
    //         </Grid>
    //       </form>
    //     </CardContent>
    //   </Card>
    );
  }
}

export default EditProfile;