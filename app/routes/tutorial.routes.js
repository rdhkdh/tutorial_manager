module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");

    var router = require("express").Router();

    //create new tut
    router.post("/", tutorials.create);

    // retrieve all tuts
    router.get("/", tutorials.findAll);

    //retrieve all published tuts
    router.get("/published", tutorials.findAllPublished);

    //retrive a single tut by ID
    router.get("/:id", tutorials.findOne);

    //update a tut by ID
    router.put("/:id", tutorials.update);

    //delete tut by ID
    router.delete("/:id", tutorials.delete);

    //delete all tuts
    router.delete("/", tutorials.deleteAll);

    app.use('/api/tutorials', router);

};