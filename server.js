require("dotenv").config();
const express = require("express");
const { MongooseDocument, Schema } = require("mongoose");
const mongoose = require("mongoose");

const app = express();

const port = process.env.PORT || 9000;

// DB Stuff
const URI = process.env.URI;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("db connected!");
});

// Data Schema

const characterSchema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true, default: 1 },
  HP: { type: Number, required: true },
  MP: { type: Number, required: true },
  items: [{}],
});

const Character = mongoose.model("Character", characterSchema);

// Share static content
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // parse application/json

// API Routes

app.post("/api/v1/character", (req, res) => {
  // console.log(req.body);
  const newChar = new Character(req.body);

  newChar.save((err, model) => {
    if (err) return res.status(500).send(err);
    res.status(201).send(model);
  });
});

app.get("/api/v1/characters/:id?", (req, res) => {
  const filters = {};
  const { id } = req.params;

  if (id) {
    filters._id = id;
  }

  Character.find(filters).exec((err, characters) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(characters);
  });
});

app.put("/api/v1/characters/:id", (req, res) => {
  const { id } = req.params;

  Character.updateOne({ _id: id }, req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

app.delete("/api/v1/characters/:id", (req, res) => {
  const { id } = req.params;

  Character.remove({ _id: id }, (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(204);
  });
});

app.all("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
