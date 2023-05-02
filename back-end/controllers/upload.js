const express = require("express");
const router = express.Router();
//Multer middleware handles the uploaded files
const multer = require("multer");
//Tesseract middleware extracts the text from the image, which is also known as ocr (Optical Character Recognition) Library
const T = require("tesseract.js");

//Setting the multer storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

//Defining multer middleware storage
const upload = multer({ storage: storage });

//Text Extraction and Post Request
router.post("/", upload.any(), function (req, res) {
  // Grabbing the filename
  let filename = req.files[0].originalname;
  let languageSelected = req.body.language;
  // Using Tesseract to recognize the text
  T.recognize(`uploads/${filename}`, languageSelected, {
    logger: (e) => console.log(e),
  }).then((output) => {
    const displayText = output.data.text;
    //REMOVES WHITE SPACES AND LINE BREAKS, WAS USING .TRIM() BUT IT WAS NOT SUCCESSFUL AS USING REGEX (Regular Expression) something that matches a pattern
    const sanitizedText = displayText.replace(/(\r\n|\n|\r)/gm, "");

    //CREATED A RESPONSE OBJECT WITH THE COGNIZED TEXT
    let textData = {
      recognizedText: sanitizedText,
    };

    res.send(textData);
  });
});

router.get("/", (req, res) => {
  res.send("You have hit the upload controller, yay");
});

module.exports = router;
