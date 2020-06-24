// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");

// Create an instance of the express app.
const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Data
let icecreams = [
  {name: 'vanilla', price: 10, awesomeness: 3},
  {name: 'chocolate', price: 4, awesomeness: 8},
  {name: 'banana', price: 1, awesomeness: 1},
  {name: 'greentea', price: 5, awesomeness: 7},
  {name: 'jawbreakers', price: 6, awesomeness: 2},
  { name: "pistachio", price: 11, awesomeness: 15 },
  {name: 'chocolate mint', price: 5, awesomeness: 20},

];
// Routes
app.get("/icecream/:name", function(req, res) {
  // { flavours: [
  //   name: "mycream", price: 9.99, awesomeness: 3 ]}

  const flavourName = req.params.name
  console.log( ` .. requested flavour: '${flavourName}'` )
  let flavours = icecreams.filter( item=>item.name.indexOf(flavourName)>-1 )
  console.log( ` .. found ${flavours.length} matches ` )

  if( flavours.length==0 )
    flavours.push( { name: "None found!", price: "Priceless", awesomeness: 0 } )

  console.log( `[icecream:${flavourName}] `, flavours )

  res.render("flavour", { flavours: flavours } );
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
