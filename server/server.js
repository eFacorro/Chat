require('dotenv').config()
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const carpetaStatic = path.join(__dirname, "static");

app.use(express.static(carpetaStatic));

app.listen(8000, function () {
  console.log("Server running");
});