// imports
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express(); //create express app

//add middleware
var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//adding mongodb connect method
const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err=> {
        console.log("Cannot connect to database.", err);
        process.exit();
    });

    
//simple route
app.get("/", (req,res) => {
    res.json({message: "Welcome to the tutorial manager application."});
});

require("./app/routes/tutorial.routes")(app); //including routes in server

//set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});