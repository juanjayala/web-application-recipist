class User{
    constructor(userName){
        this.userName = userName;
        this.password = null;
        this.savedRecipes = [];
        this.postRecipes = [];
    }
}

class Recipe{
    constructor(){
        this.user = null;
        this.name = null;
        this.steps = [];
        this.comments = [];
        this.ingredients = [];
        this.cookingTips = null;
        this.servingSize = "not specified";
    }
}