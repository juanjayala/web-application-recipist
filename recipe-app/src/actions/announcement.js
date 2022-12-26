// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host
// console.log('Current environment:', ENV.env)

// A function to update the student form state
export const addAnnouncement = (a_content) => {

    // the URL for the request
    console.log(a_content)
    const url = `${API_HOST}/api/announcements`;

    // The data we are going to send in our request
    const announcementObj = {
        announcer: "Mod",
        content: a_content
    }

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(announcementObj),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                alert("Success")
            } else {
                alert("Error")
            }
        })
        .catch(error => {
            console.log(error);
        });
};

