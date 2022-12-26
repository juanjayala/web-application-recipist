# Web Application - Recipist

Contributors: Kevin Li Chen, Frank Qiao, Riley Morris.

![image](https://user-images.githubusercontent.com/60584205/209588945-eaeced3c-ecf7-4fb3-936b-d42b2da0e270.png)






**Third-party libraries used**

* ReactJs
* Material UI  
* React-Bootstrap

**Creating admin **



* Send POST request on “api/users” with body:
* (Make sure email is valid format and password is minimum 4 characters)
        * name: &lt;name of admin>
        * email: &lt;email of admin>
        * password: &lt;password of admin>
        * isAdmin: true

![image](https://user-images.githubusercontent.com/86399894/161873386-33c99e40-35b4-4efe-9487-c6f73ab76d78.png)

    




**How to use this application**



* Login. 
    * Entering correct credentials of the user will take the user to the Home page.
    * Users already in the database include:
        * [user@user.com](mailto:user@email.com) pw: user
        * [admin@admin.com](mailto:admin@admin.com) pw: admin
    * Once a user or admin is logged in, a user should not refresh any of the pages as the session id is still in development and unanticipated issues may occur
    * Trying to access /Profile or other pages will give errors if user has not logged in, make sure to log in before accessing those pages
* Register user
    * Enter an email that has a valid format (with @ and .com, etc)
    * Password has to be minimum 4 characters
    * Can not sign up with email that already exists so: [user@user.com](mailto:user@email.com)  or [admin@admin.com](mailto:admin@admin.com) will not work
* Admins
    * To log in as an admin use the credentials:
        * [admin@admin.com](mailto:admin@admin.com) pw: admin
    * Admins can create announcements and access the manage page
    * Admins can also view recipes and save them like users
* Manage
    * The manage page is accessible only for admins by using the navbar. It allows the admin to delete recipes that users have posted
* Home
    * Home page allows for the user to see multiple recipes that have been uploaded.
        * The user is able to like recipes, and save recipes with the bookmark icon.
        * Can also view recipes in detail
    * The navbar is available to the user. It allows the user to see announcements, to add a new recipe, to view profile and view saved recipes
* Announcements
    * User can see announcements that have been made by the admins on a pop up that appears in the middle of the screen
* Profile
    * Page allows for the user to view their profile picture, allows for editing their profile and allows to view their saved and created recipes
    * EditProfile:
        * User can change their name as well as their email
* UploadRecipe
    * User can create their own recipe and upload the recipe at different steps
    * First step the user is prompted to enter the Dish Name as well as the serving size, clicking on Next allows the user to enter the next step
    * Second step the user can enter the ingredient in New Ingredient as well as enter the amount and the unit of measurement. Clicking on Add will submit the recipe while the user also has the ability to go back to previous step or move on to enter a new step
    * Third step allows the user to enter a new step in the text box. As in the step before, the users has the ability to either add the step, go to a previous step or click on next to view the next step
    * Fourth step allows the user to enter in any cooking tips for the recipe
    * Fifth step allows for an image to be uploaded to be a part of your recipe. 
* Saved Recipes
    * Clicking on Saved in the drop down menu on top right leads to the saved recipes
    * The recipes saved by the current user will appear here
* View Recipe
    * Clicking on a recipe card allows the user to view the details about a recipe. The details include: the recipe name, the creator, the date created, ingredients, picture of the recipe, and as well as the instructions
    * The user is able to set a serving size which will modify the ingredients required based on the serving size inputted.
* Search Bar
    * Users can look up recipe titles on the search bar

**Using the app as a user**

Regular user instructions



* Login in the landing page with [user@user.com](mailto:user@email.com) and password “user”
* View the recipes as you wish in the Feed tab. The user can click on the recipes to view them individually and change the serving size to their liking. 
* On the Feed tab, the user can also “like” recipes via the heart icon in the recipe cards as well as “save” recipes using the bookmark icon.
* The user can view their saved recipes by clicking on their profile and selecting saved recipes.
* The user can select their own profile to view their recipes as well and can edit their profile in that page as well
* The user can also click on Upload Recipes in the navbar to upload recipes of their own.

**Using the app as an admin**

Admin instructions 



* Login in the landing page with [admin@admin.com](mailto:admin@admin.com) and password “admin”
* View the recipes as you wish in the Feed tab, you can click on them to view a recipe individually and change the serving size to your liking.
* You can browse to the manage tab to see a list of all the recipes in the database and remove them as you wish (you can see the amount of reports a recipe has).
* You can also make global announcements that all regular users can see through the “Announce” tab, use this to send reminders, etc.

**<span style="text-decoration:underline;">Routes</span>**

**Images:**



* /images
    * **POST**: used to upload images to our cloudinary and mongodb. Used in our app’s add recipe feature to add an image to a recipe. It expects form data in the body with key “image” and an image file. For instance:

            


![image](https://user-images.githubusercontent.com/86399894/161873476-986c7268-9894-440c-a7e9-cbec221dd51f.png)


* /images/:imageId
    * **GET**: used to retrieve an image object with id “:imageId”. Used in our app to display the images in the main feed as recipe cards and viewing each recipe. Does not expect data and returns the recipe object with id “imageID”

**Recipes:**



* /api/recipes
    * **GET**: used to retrieve all the recipes from the database, used in the app to display all the recipes in the main view (feed). It returns a list of all the recipe objects 
    * **POST**: used to create a new recipe and save it in the database, used in the app in the add recipe feature to save new recipes to the database. The data it expects is a json file with fields from our recipe schema and this route returns the newly created Recipe object. The required fields is as follows from this example:

            "dish_name": "Grilled Cheese Sandwich",


                "creator_name": "Sally Peppar",


                "serving_size": 2,


                "reported": 0,


                "ingredients": [


                    {


                        "name": "white bread",


                        "amount": 4,


                        "unit": "slices"


                    },


                    {


                        "name": "butter",


                        "amount": 3,


                        "unit": "tbsp"


                    },


                    {


                        "name": "cheddar cheese",


                        "amount": 2,


                        "unit": "slices"


                    }


                ],


                "steps": [


                    "Preheat the skillet over medium heat. Generously butter one side of a slice of bread.",


                        "Place bread butter-side-down onto skillet bottom and add 1 slice of cheese",


                        "Butter a second slice of bread on one side and place butter-side-up on top of sandwich",


                        "Grill until lightly browned and flip over; continue grilling until cheese is melted",


                        "Repeat with remaining 2 slices of bread, butter and slice of cheese"


                ],


                "image_id": ""

* /api/recipes/report/:id
    * **POST**: used to handle the report functionality in the app. It increases the report value of the recipe with id “:id” by one. It does not expect data to be sent to it and it returns the recipe object with the updated “reported” value
* /api/recipes/:id
    * **GET**: used to retrieve the recipe with id “:id”. It is used in our app to view a single recipe from the main view with a feed of recipes. It returns the recipe object with id “:id”
    * **DELETE**: used to delete the recipe with id “:id”. It is used in our app by admins to remove any recipes they want (they can see the number of reports on each recipe and delete as they please). It does not expect data and returns the deleted recipe object.
* /api/recipes/:id/savedby
    * **PUT:** used to add a user to the recipe’s “saved_by” attribute. It is used in our app when users click the “bookmark” icon on a Recipe Card. The data it expects is a json file with the field: “user”: &lt;user id>. It returns the recipe object.

**Announcements:**



* /api/announcements
    * **POST**: used in our app to allow admins to create announcements that every user can see. It expects a json file with the fields “announcer” (String) and “content” (String). And returns the newly created announcement object.
    * **GET**: used in our app to retrieve all announcements made by admins and display them as a pop up for regular users. Does not expect data and returns a list of all the announcement objects.

**Users:**



* /api/users
    * **GET: **used to retrieve all users from the database. It does not expect data and returns a list of all the User objects,
    * **POST: **used to create a new user and save it in the database. The data it expects is a json file with the fields: “name”: &lt;name of the user>, “email”: &lt;user email>, and “password”: &lt;user password>.
* /api/users/login
    * **POST: **used to authenticate user login by checking if it exists in our database. It is used in our app to authenticate users logging in. It expects a json file with the fields: “email”: &lt;user email> and “password”: &lt;user password>..
* /api/users/:id
    * **GET:** used to retrieve the user with id “:id”. It is used in our app to get the User object of the user currently logged in or of the user whose profile is being viewed. It does not expect data and returns the User object.
* /api/users/:id/name
    * **PUT:** used to edit the name of the user with id “:id”. It is used in our app in Profile, when a user clicks “edit profile” and then “edit name”, they can edit their name. The data it expects is a json file with the field: “name”: &lt;name of the user>. It returns the user with id “:id”.
* /api/users/:id/email
    * **PUT:** used to edit the email of the user with id “:id”. It is used in our app in Profile, when a user clicks “edit profile” and then “edit email”, they can edit their email. The data it expects is a json file with the field: “email”: &lt;user email>. It returns the user with id “:id”.


# How to run this app locally 



* Mongodb

        create and run local Mongo database in the root directory of the repo


        mkdir mongo-data


        mongod --dbpath mongo-data

* Install Dependencies

        # install server dependencies in the root directory


        npm install


        # install frontend dependencies in the client directory


        cd client


        npm install

* React Bootstrap

		#install react bootstrap to client directory

		npm install l react-bootstrap bootstrap@5.1.3



* Material UI (MUI)

        #install mui to client directory


        npm install @material-ui/core

* Express Server

        # build the React app


        cd client


        npm run build


        # go back to the root directory


        cd ..


        # run the server


        node server.js


        App will be shown in the url that the server is listening on 
