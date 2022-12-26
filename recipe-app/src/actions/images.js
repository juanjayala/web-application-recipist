// FROM POSTED EXAMPLE 

// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host

// A function to send a POST request with a new image 
export const addImage = (form, updateImageId) => {
    // the URL for the request
    //console.log(form)
    const url = `${API_HOST}/images`;

    // The data we are going to send in our request
    const imageData = new FormData(form);
    //console.log(imageData)

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: imageData,
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If image was added successfully, tell the user.
                alert("Image uploaded succesfully, submit recipe now!")
                return res.json();

            } else {
                // If server couldn't add the image, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                alert("Error uploading image")
            }
        })
        .then(json => {
            //console.log(json.image_id)
            updateImageId(json.image_id)
            //image.setState({image: json.image_id})
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a GET request to the web server,
// and then loop through them and add a list element for each image
// export const getImage = (imageId) => {
//     // the URL for the request
//     const url = `${API_HOST}/images/${imageId}`;

//     // Since this is a GET request, simply call fetch on the URL
//     fetch(url)
//         .then(res => {
//             if (res.status === 200) {
//                 // return a promise that resolves with the JSON body
//                 return res.json();
//             } else {
//                 alert("Could not get images");
//             }
//         })
//         .then(json => {
//             // the resolved promise with the JSON body
//             imageListComp.setState({ imageList: json.images });
//         })
//         .catch(error => {
//             console.log(error);
//         });
// };
