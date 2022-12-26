// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host
// console.log('Current environment:', ENV.env)

//a function to send a POST request to add a recipe to the database
export const addRecipe = (recipe) => {

    // the URL for the request
    const url = `${API_HOST}/api/recipes`;

    // The data we are going to send in our request
    const recipeObj = {
        dish_name: recipe.dish_name,
        creator: recipe.creator,
        creator_name: recipe.creator_name,
        serving_size: recipe.serving_size,
        reported: 0,
        ingredients: recipe.ingredient,
        steps: recipe.cooking_steps,
        tips: recipe.tips,
        saved_by: [],
        image_id: recipe.image_id

    }

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(recipeObj),
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

// A function to send a GET request to the web server,
// and then loop through them and add a list element for each student
export const deleteRecipe = (recipe_id) => {
    // the URL for the request
    const url = `${API_HOST}/api/recipes/${recipe_id}`;

    // const request = new Request(url, {
    //     method: "post",
    //     body: "",
    //     headers: {
    //         Accept: "application/json, text/plain, */*",
    //         "Content-Type": "application/json"
    //     }
    // });

    // Send the request with fetch()
    fetch(url, {
        method: 'DELETE',
    })
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                alert("Succesfully deleted this recipe!")
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                alert("An error occurred while deleting this recipe!")
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const reportRecipe = (recipe_id) => {
    // the URL for the request
    const url = `${API_HOST}/api/recipes/report/${recipe_id}`;

    const request = new Request(url, {
        method: "post",
        body: "",
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
                // If student was added successfully, tell the user.
                alert("Succesfully reported this recipe!")
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                alert("An error occurred while reporting this recipe!")
            }
        })
        .catch(error => {
            console.log(error);
        });
};