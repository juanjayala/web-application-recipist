const mockRecipes = {
    "1": {
        recipeId: 1,
        title: "Perfect Chicken Teriyaki",
        userName: "Ryosuke Champ",
        dateCreated: "May 21, 2021",
        servingSize: 1,
        pic: "chicken_teriyaki.png",
        reported: 0,
        ingredients: [
            {
                name: "Large Chicken Thigh (skin on)",
                amount: 1,
                unit: "unit"
            },
            {
                name: "Potato Starch ",
                amount: 1,
                unit: "tbsp"
            },
            {
                name: "Green Onion",
                amount: 0.5,
                unit: "unit"
            },
            {
                name: "Cooking Sake ",
                amount: 1,
                unit: "tbsp"
            },
            {
                name: "Brown Sugar ",
                amount: 2,
                unit: "tsp"
            },
            {
                name: "Water",
                amount: 1.5,
                unit: "tbsp"
            },
            {
                name: "Soy sauce",
                amount: 1.5,
                unit: "tbsp"
            },
            {
                name: "Honey",
                amount: 2,
                unit: "tsp"
            }
        ],
        steps: [
            "Cut off any fatty parts of one large chicken thigh (skin on)",
            "Cover the chicken thigh in potato (or corn) starch on both sides and sprinkle with salt and pepper",
            "Make your sauce by mixing your cooking sake, brown sugar, water, soy sauce and honey and mixing them",
            "Heat some olive oil in a frying pan on a medium heat and put the chicken in skin side down",
            "Add your green onions and cook the chicken until the skin is golden brown and crispy (be careful not to burn the onions!)",
            "Turn the chicken over, set aside the green onions and continue to cook the chicken on a low heat with the lid on - for about 3 minutes",
            "Take the chicken out of the pan - wipe away the excess fat and then put them back in with the sauce",
            "Let that simmer with the lid on for about 5 minutes",
            "Cover the chicken in sauce and you’re done!"
        ]
    },
    "2": {
        recipeId: 2,
        title: "Bison Chili",
        userName: "Kevin Curry",
        dateCreated: "May 16, 2019",
        servingSize: 5,
        pic: "bison_chili.jpg",
        reported: 0,
        ingredients: [
            {
                name: "Large Chicken Thigh (skin on)",
                amount: 1,
                unit: "unit"
            },
            {
                name: "Potato Starch ",
                amount: 1,
                unit: "tbsp"
            },
            {
                name: "Green Onion",
                amount: 0.5,
                unit: "unit"
            },
            {
                name: "Cooking Sake ",
                amount: 1,
                unit: "tbsp"
            },
            {
                name: "Brown Sugar ",
                amount: 2,
                unit: "tsp"
            },
            {
                name: "Water",
                amount: 1.5,
                unit: "tbsp"
            },
            {
                name: "Soy sauce",
                amount: 1.5,
                unit: "tbsp"
            },
            {
                name: "Honey",
                amount: 2,
                unit: "tsp"
            }
        ],
        steps: [
            "Set a nonstick skillet on medium heat.  Once hot, toss in oil, garlic, onion and bell pepper.  Cook until the onions are softer and brown and slightly translucent.",
            "Add the meat to the skillet and chop it up as it cooks.  As the meat continues to cook, add the seasonings.  And continue cooking.",
            "Pour in beef stock and tomato paste and fold everything together.  Reduce the heat to a light simmer, then cover and cook for at least 25 minutes, then allow it to slightly cool off the heat  to thicken.",
            "Garnish and enjoy with your choice of rice, sweet potato, cauliflower mash or plantain"
        ]
    },
    "3": {
        recipeId: 3,
        title: "Grilled Cheese Sandwich",
        userName: "Sally Peppar",
        dateCreated: "April 20, 2021",
        servingSize: 2,
        pic: "grilled_cheese.jpg",
        reported: 21,
        ingredients: [
            {
                name: "white bread",
                amount: 4,
                unit: "slices"
            },
            {
                name: "butter",
                amount: 3,
                unit: "tbsp"
            },
            {
                name: "cheddar cheese",
                amount: 2,
                unit: "slices"
            }
        ],
        steps: [
            "Preheat skillet over medium heat. Generously butter one side of a slice of bread.",
            "Place bread butter-side-down onto skillet bottom and add 1 slice of cheese",
            "Butter a second slice of bread on one side and place butter-side-up on top of sandwich",
            "Grill until lightly browned and flip over; continue grilling until cheese is melted",
            "Repeat with remaining 2 slices of bread, butter and slice of cheese"
        ]
    },
    "4": {
        recipeId: 4,
        title: "PB & Bacon Sandwich",
        userName: "Gerard Seint",
        dateCreated: "January 2, 2021",
        servingSize: 1,
        pic: "pbb_sandwich.jpeg",
        reported: 309,
        ingredients: [
            {
                name: "peanut butter",
                amount: 1,
                unit: "tbsp"
            },
            {
                name: "toasted whole wheat bread",
                amount: 2,
                unit: "slices"
            },
            {
                name: "crispy bacon",
                amount: 2,
                unit: "slices"
            }
        ],
        steps: [
            "Spread peanut butter on one slice of toast.",
            "Top peanut butter with sliced bacon and remaining piece of toast."
        ]
    },
    "5": {
        recipeId: 5,
        title: "Perfect Basic Oatmeal",
        userName: "Elizabeth Laseter",
        dateCreated: "January 25, 2018",
        servingSize: 2,
        pic: "oatmeal.jpg",
        reported: 2,
        ingredients: [
            {
                name: "old-fashioned rolled oats",
                amount: 1,
                unit: "cup"
            },
            {
                name: "milk",
                amount: 1,
                unit: "cup"
            },
            {
                name: "water",
                amount: 1,
                unit: "cup"
            },
            {
                name: "kosher salt",
                amount: 0.125,
                unit: "tsp"
            },
            {
                name: "ground cinnamon",
                amount: 0.5,
                unit: "tsp"
            },
            {
                name: "honey",
                amount: 1,
                unit: "tsp"
            },
            
        ],
        steps: [
            "Combine oats, milk, water, salt, and cinnamon in a medium saucepan. Bring to a boil, then reduce heat to low.",
            "Simmer uncovered for 3 to 5 minutes until thickened, stirring occasionally. Remove from heat and let cool slightly.",
            "Divide equally between two bowls. Drizzle each serving with 1/2 teaspoon honey. Add additional desired toppings and serve (e.g. bananas, blueberries, etc.)"
        ]
    }
};

export default mockRecipes;