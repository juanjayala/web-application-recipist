import React, { useState } from 'react'
import { Button } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import './styles.css';

import { Link } from 'react-router-dom';
import { addAnnouncement } from '../../actions/announcement';


function AnnouncePopUp(props) {
    const [content, setContent] = useState('');

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner"> 
                <Link className="nav-links" to={`/Feed`}>
                    <Button variant="contained" color="error" className="close-btn">
                        Close
                    </Button>
                </Link>

                <h3>Make an announcement!</h3>
                <TextField multiline maxRows={3} fullWidth="true" id="filled-basic" label="Announce" variant="filled" 
                onChange={(e) => setContent(e.target.value)}/>
                <Button onClick={() => addAnnouncement(content)} variant="text" color="primary" className="announce-btn">Submit</Button>
            </div>
        </div>
    ) : ""
}

export default AnnouncePopUp