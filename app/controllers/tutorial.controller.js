const db = require("../models");
const Tutorial = db.tutorials;

// create and save a new tut
exports.create = (req,res) => {
    //validate request
    if(!req.body.title)
    {
        res.status(400).send({message: "Content cannot be empty!"});
        return;
    }

    //create a tutorial
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });

    //save tutorial in db
    tutorial
        .save(tutorial)
        .then(data=> {
            res.send(data);
        })
        .catch(err=> {
            res.status(500).send({
                message: err.message || "Some error occured while creating the Tutorial."
            });
        });  
};

//retrieve all tuts from database
exports.findAll = (req,res) => {
    const title = req.query.title;
    var condition = title ? {title: {$regex: new RegExp(title), $options: "i"}} : {};

    Tutorial.find(condition)
        .then(data=> {
            res.send(data);
        })
        .catch(err=> {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving tutorials."
            });
        });
};

//find a tut by ID
exports.findOne = (req,res) => {
    const id = req.params.id;

    Tutorial.findById(id)
        .then(data=> {
            if(!data)
            { res.status(404).send({message: "Not found tutorial with id " + id}); }
            else{ res.send(data); }
        })
        .catch(err=> {
            res.status(500).send({message: "Error retrieving Tutorial with id=" + id});
        });
};

//update tut by ID
exports.update = (req,res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty!"
        });
    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data=> {
            if(!data) {
                res.status(404).send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found.`
                })
            }
            else{
                res.send({
                    message: "Tutorial updated successfully."
                });
            }
        })
        .catch(err=> {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });

};

//delete by ID
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Tutorial.findOneAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
};

//delete all tuts from database
exports.deleteAll = (req,res) => {
    Tutorial.deleteMany({})
        .then(data=> {
            res.send({
                message: `${data.deletedCount} Tutorials were deleted successfully.`
            });
        })
        .catch(err=> {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tutorials."
            });
        });
};

//find all published tuts
exports.findAllPublished = (req,res) => {
    Tutorial.find({published:true})
        .then(data=> {
            res.send(data);
        })
        .catch(err=> {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
};