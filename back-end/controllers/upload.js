const express = require('express');
const router = express.Router();
//multer middleware handles the uploaded files
const multer = require('multer');
//tesseract middleware extracts the text from the image, which is also known as ocr (Optical Character Recognition)
const T = require('tesseract.js');
//free google-translate-api 

// Setting the multer storage
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

// Defining multer middleware storage
const upload = multer({ storage: storage })

//Tesseract text extraction and post request response

router.post('/', upload.any(), function (req, res) {
    // Grabbing the filename
    let filename = req.files[0].originalname;
    let languageSelected = req.body.language;
    // Using Tesseract to recognize the text
    T.recognize(`uploads/${filename}`, languageSelected, { logger: e => console.log(e) }).then((output) => {
        const displayText = output.data.text
        const sanitizedText = displayText.replace(/(\r\n|\n|\r)/gm, "")
        console.log(sanitizedText)

        let textData = {
            "recognizedText": sanitizedText
        }

        res.send(textData)
    })
})


router.get('/', (req, res) => {
    res.send("You have hit the upload controller, yay")
});


module.exports = router;