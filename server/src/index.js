const express = require("express");
const db = require("./db");
const wildersController = require("./controller/wilders");
const skillsController = require("./controller/skills");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/hello", (req, res) => {
  console.log("new request from client");
  res.send("hello");
});

app.post("/wilders", wildersController.create);
app.get("/wilders", wildersController.read);
app.patch("/wilders/:id", wildersController.update);
app.delete("/wilders/:id", wildersController.delete);
app.post("/wilders/:wilderId/skills", wildersController.addSkill);
app.delete("/wilders/:wilderId/skills/:skillId", wildersController.removeSkill);

app.post("/skills", skillsController.create);
app.get("/skills", skillsController.read);
app.patch("/skills/:id", skillsController.update);
app.delete("/skills/:id", skillsController.delete);

async function start() {
  await db.initialize();
  app.listen(4000, () => {
    console.log("server ready");
  });
}

start();
