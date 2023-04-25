require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Hi back-end is working`);
});

//Upload Controller
const uploadController = require("./controllers/upload.js");
app.use("/upload", uploadController);
//Translate Controller
const translateController = require("./controllers/translate.js");
app.use("/translate", translateController);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
