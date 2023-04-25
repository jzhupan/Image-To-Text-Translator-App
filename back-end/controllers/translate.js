const express = require("express");
//A class from express library
const router = express.Router();
// parse requests of content-type - application/json
router.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
router.use(express.urlencoded({ extended: true }));
const axios = require("axios");

router.post("/", function (req, res) {
  //this is the Template from rapidAPI google translate API
  const encodedParams = new URLSearchParams();
  encodedParams.set("q", req.body.recognizeText);
  encodedParams.set("target", "en");
  encodedParams.set("source", req.body.languageSource);

    const options = {
        method: 'POST',
        url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept-Encoding': 'application/gzip',
          'X-RapidAPI-Key': process.env.apiKey,
          'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
    data: encodedParams,
  };

  async function translateText() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      let translatedText = response.data.data.translations[0].translatedText;
      console.log(response.data.data.translations[0].translatedText);

      res.send({
        translatedText: translatedText,
      });
    } catch (error) {
      console.error(error);
    }
  }

  translateText();
});

router.get("/", (req, res) => {
  res.send("You have hit the translate controller, yay!");
});

module.exports = router;
