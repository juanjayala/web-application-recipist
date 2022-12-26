Third-party libraries used:
ReactJs,
Material UI 

Instructions:
Run “npm install” on the recipe-app directory,
Run “npm start” which will open the web app (this will open the Login page which is not implemented yet),
Go to /Home link (Main view for user is located at /Home)

Login:
Click Login which will take you to the homepage for the user at /Home,
Functionality still in development: (On entering “user” for the username and password it should take you to /Home as a User),
Functionality still in development: (On entering “admin” for the username and password it should take you to /Home as a Moderator)


Our features:
User view:
Users have access to dummy recipes in the Home page
Users can click on the Add Recipe tab (not yet working on the react app, refer to instructions in “Add recipe”)
Users can click their profile avatar and see list of options (Profile, saved recipes, logout), *saved recipes, and logout not implemented
Buttons for liking, commenting, viewing, saving, and blocking are displayed. However, functionality will be left for Phase 2.

Add recipe:
This functionality is coded in html/css/js and is currently separate from main React app (can be accessed in the recipe-app/src/individual_html_folder directory)
Users can upload recipes including name, serving size, gredient, steps, and recipe tips.

User profile:
Accessed from the top right of the Navigation Bar, click the icon to get the drop down menu and click “Profile” - this leads to /Profile
Users profile contains their name and username, as well as their shared recipes
Users can edit their profile with the button “Edit Profile”
This leads to a form which can be implemented for Phase 2 since we would need to edit this information in database so it can change in all pages that use name/username


Admin view:
Admins also have access to the general recipes feed
Admins can “manage” recipes (not completed) 
Admins can make announcements (not completed)


Since our routing is incomplete, these are the links to the features we completed for Phase 1.
Main view for user is located at /Home
Main view for admin is located at /User%20Feed
