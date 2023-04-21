const express = require('express');
const router = express.Router();
const translate = require('google-translate-api');



// router.post('/translation', translate, (req, res) => {
//     // let recognizedText = document.getElementById('recognizedText').innerHTML

//     // translate(`${recognizedText}`, {from: 'ko',to: 'en'}, {logger: e => console.console.log(e)})
//     // .then(response => {
//     //     const translatedText = output.data.text

//     //     console.log(response.text)
//     //     console.log(response.from.text.autoCorrected)
//     //     console.log(response.from.text.value)
//     //     console.log(res.from.text.didYouMean)
//     // }).catch(err => {
//     //     console.log(`couldn't translate, you must be missing something`)
//     // })
//     // res.send(detectedLanguageResponse)

// })

router.get('/translate', (req, res) => {
    res.send(`You have hit the translate controller, yay!`)
});




module.exports = router;
module.exports = translate;

