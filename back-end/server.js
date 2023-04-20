const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
//tesseract middleware
const T = require('tesseract.js')
const PORT = 3001
const app = express()

const multer = require('multer')
//this is an imported multer library. It will allow ups to take in the images and store it in our server in the defined path
const upload = multer({destination: __dirname + '/public/uploadImages'})

app.use(cors())
app.use(express.json())
//my simple server via express that displays the contents of index.html file inside the folder below
app.use(express.static('front-end'))

app.get('/', (req,res) => {
  res.send(`Hi back-end is working`)
})

app.post('/upload', upload.single('image'), (req,res) =>{
  //req. file is the 'image' file
  if(req.file) {
    res.json(req.file)
  } else throw 'error'
})

//express file upload middleware
app.use(
  fileUpload({
    limits: {
      fileSize: 10000000, //10MB
    },
    //Deny user the upload if exceeds 10MB
    abortOnLimit: true,
  })
)
  
//Tesseract Extracted text
app.post('/upload', (req,res) => {
  res.send(originalText.innerHTML = sanitizedText)
})


//Console log Tesseract Text
app.post('/upload', (req,res) => {
  //Gets the file that was set to our tag name="image" in our index
  const { image } = req.files;

  //if no image submitted, returns not found
  if(!image) return res.sendStatus(400);

  //to secure img uploads from allowing other type of files
  //if(/^image/.test(image.mimetype)) return res.sendStatus(400)

  //move the uploaded image to our upload folder
  image.mv(__dirname + '/upload/' + image.name);

  //this logs the file into console
  //console.log(req.files)
  //if all is good, 'Ok' will be displayed
  //res.sendStatus(200)

  T.recognize(`./upload//${image.name}`, 'kor', { logger: e => console.log(e)}).then((output) => {
    const displayText = output.data.text
    const sanitizedText = displayText.replace(/(\r\n|\n|\r)/gm, "")
    console.log(sanitizedText)
    
    res.send({
      "textFound": sanitizedText
    })
  })
})



app.listen(PORT, () => {
  console.log(`Express server working`)
})
