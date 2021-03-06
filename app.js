const express = require("express");
require("dotenv").config();
const bodyparser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

var database, collection;

const path = require("path");
const app = express();

const port = process.env.PORT || 8000;

app.use("/static", express.static("static")); //for seerving static file
app.use(express.urlencoded({ extended: true }));

//set the template engine as pug
app.set("view engine", "pug");

//set the views directory
app.set("views", path.join(__dirname, "views"));

//our pug demo endpoint
app.get("/", (req, res) => {
  res.status(200).render("home.pug");
});

app.get("/Apply", (req, res) => {
  res.status(200).render("Apply.pug");
});
app.get("/About", (req, res) => {
  res.status(200).render("About.pug");
});
app.get("/Contact", (req, res) => {
  res.status(200).render("Contact.pug");
});
app.get("/Class", (req, res) => {
  res.status(200).render("Class.pug");
});

app.post("/Apply", (req, res) => {
  req.setTimeout(120000);
  collection.insert(req.body, (error, result) => {
    if (error) {
      res.status(400).send("This item was not saved to database");
    } else {
      res.send("This item is saved to database");
    }
  });
});

app.listen(port, () => {
  MongoClient.connect(
    process.env.CONNECTION_URL,
    { useNewUrlParser: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      database = client.db(process.env.DATABASE_NAME);
      collection = database.collection("people");
      console.log("Connected to `" + process.env.DATABASE_NAME + "`!");
    }
  );
  console.log(`The application started successfully on port : ${port}`);
});
