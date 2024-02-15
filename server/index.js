// const express = require('express');
// const mongoose = require('mongoose')
// const cors = require('cors')  //pour acces backend side in the  frontend sur le même port

// mongoose
//   .connect(
//    "mongodb+srv://username:<password>@cluster0.g5bfrva.mongodb.net/?retryWrites=true&w=majority"
//     )
//   .then(() => {
//     console.log("Connected successfuly");
//   })
//   .catch((error) => {
//     console.log("error with connecting with the db", error);
//   });

// const UserModel = require( './models/Users' );

// const app = express()
// app.use(cors())
// app.use(express.json)

// app.post("/craeteUser" , (req , res) => {
//     UserModel.create(req.body)
//     .then(users => res.json(users))
//     .catch(err=> res.json(err));
// })

// app.listen(3001 , () => {
//     console.log("Server is running on http://localhost:3001")
// })

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");

mongoose
  .connect(
    "mongodb+srv://username:<password>@cluster0.g5bfrva.mongodb.net/CRUD?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((error) => {
    console.log("Error connecting to the database", error);
  });

const app = express();
app.use(cors());
app.use(express.json()); // Ajoutez les parenthèses pour appeler la fonction express.json

//add user
app.post("/createUser", async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

//get all users
app.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error Finding users" });
  }
});

//get specific user
app.get("/getuser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById({ _id: id });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error Finding users" });
  }
});

//update specifc user
app.put("/updateUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateUser = await UserModel.findByIdAndUpdate(
        {_id:id},
        {name: req.body.name , email: req.body.email , age: req.body.age}
        );
    res.json(updateUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

// Delete user
app.delete("/deleteUser/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await UserModel.findByIdAndDelete({ _id: id });

        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully', deletedUser });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
