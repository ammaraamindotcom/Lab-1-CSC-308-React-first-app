import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import {
  getUsers,
  findUserById,
  addUser,
  deleteUserById
} from "./models/user-services.js";
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/users")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

const port = 8000;

app.use(cors());

app.use(express.json());

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});


  app.get("/users/:id", (req, res) => {
    findUserById(req.params.id)
      .then((user) => {
        if (user === null) {
          res.status(404).send("Resource not found.");
        } else {
          res.send(user);
        }
      })
      .catch(() => {
        res.status(404).send("Resource not found.");
      });
  });
  
  app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
  
    getUsers(name, job)
      .then((users) => {
        res.send({ users_list: users });
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });
  
  app.post("/users", (req, res) => {
    addUser(req.body)
      .then((user) => {
        res.status(201).send(user);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  app.delete("/users/:id", (req, res) => {
    deleteUserById(req.params.id)
      .then((user) => {
        if (user === null) {
          res.status(404).send("Resource not found.");
        } else {
          res.status(204).send();
        }
      })
      .catch(() => {
        res.status(404).send("Resource not found.");
      });
  });