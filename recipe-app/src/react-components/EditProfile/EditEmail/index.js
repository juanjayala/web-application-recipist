import React, { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Card, CardContent } from '@mui/material';

import Navbar from "./../../Nav";

import ENV from '../../../config.js'
const API_HOST = ENV.api_host

const EditEmail = (props) => {
    const [newEmail, setNewEmail] = useState("")

    const handleInputChange = (event) => {
        setNewEmail(event.target.value)
    }

    const edit = () => {
        // message div
        const message = document.querySelector('#message')

        // check if new email is not empty
        if (!newEmail){
            message.innerText = 'Failed: Invalid email.'
            message.setAttribute("style", "color: red")
            console.log("Invalid email")
            return;
        }

        // CHANGE THIS: TO GET USER ID FROM LOGGED IN INFO
        const id = props.curr_id
        const url = `${API_HOST}/api/users/${id}/email`
        // the data we are going to send
        let data = {
            email: newEmail
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
                // email was changed successfully
                message.innerText = 'Success: Email was changed.'
                message.setAttribute("style", "color: green")
                console.log(res)
            } else {
                message.innerText = 'Failed: Server error.'
                message.setAttribute("style", "color: red")
            }

    
        })
        .catch(error => {
            console.log(error)
        }) 

    }

    return (
      <div>
        <div>
          <Navbar mod={false} colour={"primary"} />
        </div>
        <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Edit Email
            </Typography>
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} item>
                  <TextField
                    required
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="newEmail"
                    value={newEmail}
                    onChange={(e) => handleInputChange(e)}
                  ></TextField>
                </Grid>
                <Grid xs={12} item>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => edit()}
                  >
                    Submit
                  </Button>
                </Grid>
                <div>
                  <p id="message"></p>
                </div>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </div>
    );
}

export default EditEmail;