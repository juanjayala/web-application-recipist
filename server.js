"use strict";

/* Server environment setup */
// To run in development mode, run normally: node server.js
// To run in development with the test user logged in the backend, run: TEST_USER_ON=true node server.js
// To run in production mode, run in terminal: NODE_ENV=production node server.js
const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)

const log = console.log;
const path = require('path')

// import modules
const express = require('express');
// const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors');


// express-session for managing user sessions
const session = require("express-session");


// app
const app = express();
app.use(bodyParser.json());

// database
// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
const { ObjectID, ObjectId } = require('mongodb')
//mongoose.set('useFindAndModify', false); // for some deprecation issues
const { Announcement } = require('./models/announcement');
const { Recipe } = require('./models/recipe');
const { Image } = require("./models/image");
const { User } = require("./models/user")

// middleware
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

const cloudinary = require('cloudinary');
const res = require('express/lib/response');
cloudinary.config({
    cloud_name: 'dp73mxl6c',
    api_key: '173626243471863',
    api_secret: 'Xt1wlxFJ6s1gZkbm9F9kNrlsG48'
});

if (env !== 'production') { app.use(cors()) } 

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()  
    }   
}
// Our own express middleware to check for 
// an active user on the session cookie (indicating a logged in user.)
const sessionChecker = (req, res, next) => {
    // //console.log(req.session)
    // //console.log(req.session.user)
    if (req.session.user) {
        // res.send("logged in")
        res.redirect('/dashboard'); // redirect to dashboard if logged in.
    } else {
        next(); // next() moves on to the route.
    }    
};

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
  });

/*** Session handling **************************************/
// express-session for managing user sessions

// SESSION CHECK
/// Middleware for creating sessions and session cookies.
// A session is created on every request, but whether or not it is saved depends on the option flags provided.
// app.use(session({
//     secret: 'our hardcoded secret', // later we will define the session secret as an environment variable for production. for now, we'll just hardcode it.
//     cookie: { // the session cookie sent, containing the session id.
//         expires: 60000, // 1 minute expiry
//         httpOnly: true // important: saves it in only browser's memory - not accessible by javascript (so it can't be stolen/changed by scripts!).
//     },
//     resave: false,
//     saveUninitialized: false,
// }));
app.use(
    session({
        secret: process.env.SESSION_SECRET || "our hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        },
        // store the sessions on the database in production
        // store: env === 'production' ? MongoStore.create({
        //                                         mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/StudentAPI'
        //                          }) : null
    })
);

const authenticate = (req, res, next) => {
    //console.log(req.session.user)
    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Unauthorized")
    }
}

// check if user is logged in right now
app.get("/api/session",  mongoChecker, async (req, res) => {

    try {
        // if (req.session.user){
        //     //console.log(req.session.user)
        //     res.send(req.session.user)
        // } else {
        //     res.status(400).send("Not logged in.")
        // }
        // //console.log(req.current_user)
        if (req.current_user){
            res.send(req.current_user)
        } else {
            res.status(400).send("Not logged in.")
        }
    } catch (error) {
        //console.log(error)
        res.status(400).send('Bad request')
    }
})

// routes
//          API ROUTES 
/** Recipist resource routes **/

// a POST route to *create* an image
app.post("/images", multipartMiddleware, (req, res) => {

    // Use uploader.upload API to upload image to cloudinary server.
    cloudinary.uploader.upload(
        req.files.image.path, // req.files contains uploaded files
        function (result) {

            // Create a new image using the Image mongoose model
            var img = new Image({
                image_id: result.public_id, // image id on cloudinary server
                image_url: result.url, // image url on cloudinary server
                created_at: new Date(),
            });

            // Save image to the database
            img.save().then(
                saveRes => {
                    res.send(saveRes);
                },
                error => {
                    res.status(400).send(error); // 400 for bad request
                }
            );
        });
});

// a GET route to get an images by id
app.get("/images/:imageId", (req, res) => {
	const imageId = req.params.imageId;
    Image.findOne({ image_id: imageId }).then(
        image => {
            res.send({ image }); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});


// a POST route to create a recipe
app.post('/api/recipes', mongoChecker, async (req, res) => {
	// log(req.body)
	//console.log(req.session.user)
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  
	const cur_date = new Date();

	// Create a new student using the Student mongoose model
	const recipe = new Recipe({
		creator: req.body.creator,
        creator_name: req.body.creator_name,
        date_created: cur_date.toDateString(),
        image_id: req.body.image_id,
		dish_name: req.body.dish_name,
        serving_size: req.body.serving_size,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        reported: req.body.reported,
        saved_by: req.body.saved_by

	})

	// Save recipe to the database
	try {
		const result = await recipe.save()	
		res.send(result)
	} catch(error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}

})

app.get('/api/recipes', mongoChecker, async (req, res) => {
    // Get the students
    try {
        const recipes = await Recipe.find()
        // res.send(students) // just the array
        res.send(recipes) // can wrap students in object if want to add more properties
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }

})


app.post('/api/recipes/report/:id', async (req, res) => {
	const id = req.params.id
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;  // so that we don't run the rest of the handler.
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// Increase report by 1
	try {
		const recipe = await Recipe.findOneAndUpdate({_id: id}, {$inc: { reported: 1 }}, {new: true, useFindAndModify: false})
		if (!recipe) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(recipe)
		}
	} catch (error) {
		log(error)
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	}
})

// a GET route to get a repice by id
app.get('/api/recipes/:id', async (req, res) => {
	/// req.params has the wildcard parameters in the url, in this case, id.
	// log(req.params.id)
	const id = req.params.id

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// If id valid, findById
	try {
		const recipe = await Recipe.findById(id)
		if (!recipe) {
			res.status(404).send('Resource not found')  // could not find this student
		} else {
			/// sometimes we might wrap returned object in another object:
			//res.send({student})   
			res.send(recipe)
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
})

/// a DELETE route to remove a student by their id.
app.delete('/api/recipes/:id', async (req, res) => {
	const id = req.params.id

	// Validate id
	if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found')
		return;
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	// Delete a student by their id
	try {
		const recipe = await Recipe.findByIdAndRemove(id)
		if (!recipe) {
			res.status(404).send()
		} else {   
			res.send(recipe)
		}
	} catch(error) {
		log(error)
		res.status(500).send() // server error, could not delete.
	}
})

/*
Request body expects:
{   
	"user": <user id>
}
*/
// a PUT route to add user to saved_by attribute of recipe
app.put('/api/recipes/:id/savedby', mongoChecker, async (req, res) => {
    const id = req.params.id

    //validate id
    if (!ObjectId.isValid(id)) {
        res.status(404).send('Invalid id')
        return;
    }

    // if id valid, find by id
    try {
        const recipe = await Recipe.findById(id)
        if (!recipe) {
            res.status(404).send('Resource not found') 
        } else {
            // add user
            recipe.saved_by.push(req.body.user)
            recipe.save()
            res.send({recipe})
        }
    } catch(error){
        res.status(500).send('Internal Server Error')
    }

})


// a POST route to *create* an announcement
app.post('/api/announcements', mongoChecker,  async (req, res) => {
	// log(req.body)

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	// Create a new student using the Student mongoose model
	const announcement = new Announcement({
		announcer: req.body.announcer,
		content: req.body.content
	})


	// Save announcement to the database
	// async-await version:
	try {
		const result = await announcement.save()	
		res.send(result)
	} catch(error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}

})

// a GET route to retrieve all the announcements
app.get('/api/announcements', mongoChecker, async (req, res) => {

    // Get the students
    try {
        const announcements = await Announcement.find()
        // res.send(students) // just the array
        res.send(announcements) // can wrap students in object if want to add more properties
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }

})


// USERS
// a GET route to get all users
app.get('/api/users/', mongoChecker, async (req, res) => {

    // Get the users
    try {
        const users = await User.find()
        res.send ({ users })
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

/*
Request body expects:
{
	"name": <the name of the user>
	"email": <user email>
    "password": <user password>
}
*/
// a POST route to register a user
app.post('/api/users', mongoChecker, async (req, res) => {
    // Create a new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
        profilePic: req.body.profilePic
    })


    // Save user to db
    try {
        const result = await user.save()
        res.send(result)
    } catch(error) {
        //console.log(error)
        res.status(400).send('Bad Request') 
        // if (isMongoError(error)) { 
		// 	res.status(500).send('Internal server error')
		// } else {
		// 	res.status(400).send('Bad Request') 
		// }
    }

})

// authenticate user
/*
Request body expects:
{
	"email": <user email>
    "password": <user password>
}
*/
// authenticate user log in
app.post('/api/users/login', mongoChecker, async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByEmailPassword(email, password);
        //console.log(user)
        if(!user){
            res.status(400).send('Bad Request') 
        } else {
            req.session.user = user._id
            req.session.email = user.email
            //console.log(req.session.user)
            //console.log(req.session.email)
            // req.current_user = user
            res.send({ currentUser: user._id, currentEmail: user.email, isAdmin: user.isAdmin });
            // //console.log(req.session)
            // res.redirect('/Home')
            // res.json({
            //     _id: user._id,
            //     name: user.name,
            //     email: user.email,
            //     isAdmin: user.isAdmin,
            //     pic: user.pic
            // })    
        }
    } catch (error) {
        //console.log(error)
        res.status(400).send('Bad Request') 
    }
    // const user = await User.findOne({ email })

    // if (user && (await user.matchPassword(password))) {
    
})

// A route to check if a user is logged in on the session
app.get("/users/check-session", (req, res) => {
    if (env !== 'production' && USE_TEST_USER) { // test user on development environment.
        req.session.user = TEST_USER_ID;
        req.session.email = TEST_USER_EMAIL;
        res.send({ currentUser: TEST_USER_EMAIL })
        return;
    }

    if (req.session.user) {
        res.send({ currentUser: req.session.email });
    } else {
        res.status(401).send();
    }
});



// a GET route to get a user by their id
app.get('/api/users/:id', mongoChecker, async (req, res) => {
    const id = req.params.id

    // validate id
    if (!ObjectId.isValid(id)) {
        res.status(404).send('Invalid id')
        return;
    }

    // If id valid, findById
    try {
        const user = await User.findById(id)
        if (!user) {
            res.status(404).send('Resource not found')
        } else {
            res.send(user)
        }
    } catch(error) {
        log(error)
        res.status(500).send('Internal Server Error')  // server error
    }



})

/*
Request body expects:
{   
	"name": <name of the user>
}
*/
// edit name of user
app.put('/api/users/:id/name', mongoChecker, async (req, res) => {
    const id = req.params.id

    // validate id
    if (!ObjectId.isValid(id)){
        res.status(404).send()
        return;
    }

    // check mongoose connection established
    if (mongoose.connection.readyState != 1) {
        res.status(500).send('Internal server error')
        return;
    }

    // id is valid so find user by id
    try {
        const user = await User.findById(id)
        if (!user) {
            res.status(404).send('Resource not found')
        } else {
            //console.log(req.body.name)
            user.name = req.body.name
            user.save()
            res.send({ user })
        }
    } catch(error) {
        //console.log(error)
        res.status(500).send('Internal Server Error')
    }
})

/*
Request body expects:
{   
	"email": <user email>
}
*/
// edit email of user
app.put('/api/users/:id/email', mongoChecker, async (req, res) => {
    const id = req.params.id

    // validate id
    if (!ObjectId.isValid(id)){
        res.status(404).send()
        return;
    }

    // check mongoose connection established
    if (mongoose.connection.readyState != 1) {
        res.status(500).send('Internal server error')
        return;
    }

    // id is valid so find user by id
    try {
        const user = await User.findById(id)
        if (!user) {
            res.status(404).send('Resource not found')
        } else {
            user.email = req.body.email
            user.save()
            res.send({ user })
        }
    } catch(error) {
        //console.log(error)
        res.status(500).send('Internal Server Error')
    }
})

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/recipe-app/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = [
        "/", "/Home", "/Feed",
        "/Manage", "/Announce", '/GuestHome',
        "/Profile", "/EditProfile"
    ];
    if (!goodPageRoutes.includes(req.url)) {
        // if url not in expected page routes, set status to 404.
        res.status(404);
    }

    // send index.html
    res.sendFile(path.join(__dirname, "/recipe-app/build/index.html"));
});

// port and listener
const port = process.env.PORT || 5000;
app.listen(port, () => {
	//console.log(env)
    log(`Listening on port ${port}...`);
});