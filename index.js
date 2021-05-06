const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
///////// REALLY NOT SURE about the .then , doesn't look like inception so is it right ? It's working but ?
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    const newRecipe = await Recipe.create({
      title: "Crepes",
      level: "Easy Peasy",
      ingredients: ["1 cup all-purpose flour", "2 eggs", "½ cup milk"],
      cuisine: "French",
      dishType: "dessert",
    });
    console.log("The new recipe is : " + newRecipe.title);
  })

  .then(async () => {
    const manyRecipes = await Recipe.insertMany(data);
    console.log("The recipes we just added are : ");
    manyRecipes.forEach(({ title }) => console.log(`${title}`));
    console.log("_____________________________________ ANNOYING MONGOOSE MSG");
  })

  .then(async () => {
    const newRe = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {$set:{duration:100}}, {new: true});
    console.log("______________________________________________________________________________ANNOYING MONGOOSE MSG");
    console.log("Rigatoni alla Genovese duration is now :" + newRe.duration);

  })

  .then(async () => {
    const deleteRecipe = await Recipe.deleteOne({title: "Carrot Cake"});
    console.log("Carrot Cake has been deleted");

  })

  .then(async () => {
    await mongoose.connection.close()})


  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
