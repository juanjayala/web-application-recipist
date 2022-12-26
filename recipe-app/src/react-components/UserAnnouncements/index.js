import React, { useState, useEffect } from 'react'
import { Button } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import './styles.css';

import { Link } from 'react-router-dom';
import { getAnnouncements } from '../../actions/announcement';

import ENV from '../../config.js'
const API_HOST = ENV.api_host

function UserAnnouncements(props) {
    // const [announcements, setAnnouncements] = useState([]);
    // setAnnouncements(getAnnouncements())
    const [announcements, setAnnouncements] = useState([]);

    // const getAnnouncements = () => {
    //     // the URL for the request
    //     const url = `${API_HOST}/api/announcements`;
    
    //     // Since this is a GET request, simply call fetch on the URL
    //     fetch(url)
    //         .then(res => {
    //             if (res.status === 200) {
    //                 // return a promise that resolves with the JSON body
    //                 return res.json();
    //             } else {
    //                 alert("Could not get announcements");
    //             }
    //         })
    //         .then(json => {
    //             // the resolved promise with the JSON body
    //             setAnnouncements(json);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // };
    
    useEffect(() => {
        fetch(`${API_HOST}/api/announcements`)
            .then(res => {
                if (res.status === 200) {
                    // return a promise that resolves with the JSON body
                    return res.json();
                } else {
                    alert("Could not get announcements");
                }
            })
            .then(data => {
                // the resolved promise with the JSON body
                setAnnouncements(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])
    
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <Link className="nav-links" to={`/Home`}>
                    <Button variant="contained" color="error" className="close-btn">
                        Close
                    </Button>
                </Link>


                {announcements.map(announcement => (
                    <h3> {announcement.announcer}: {announcement.content}</h3>
                ))}



            </div>
        </div>
    ) : ""
}



export default UserAnnouncements