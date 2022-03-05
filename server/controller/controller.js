const Userdb = require("../model/model.js");

//create and save new user
exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
    return;
  }

  //new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
  });

  user
    .save(user)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating a crete operation",
      });
    });
};

//retrieve and return all user/ retrive and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ messsage: "Not found user" });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err || "Error retrieving user" });
      });
  } else {
    Userdb.find()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error occurred while retriving user infomation",
        });
      });
  }
};

//Update a new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update cannot be empty" });
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Cannot update user. Maybe user not found" });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error update user infomation",
      });
    });
};

//Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({ message: "Cannot delete. Maybe id is wrong" });
      } else {
        res.send({ message: "User was deleted successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete user",
      });
    });
};
