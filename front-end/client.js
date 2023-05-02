const inputImage = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const resetImage = document.getElementById("deleteButton");
const translateButton = document.getElementById("translateButton");

resetImage.addEventListener("click", function () {
  refreshPage();
});
function refreshPage() {
  window.location.reload();
}

inputImage.addEventListener("change", function () {
  changeImage(this);
});
//If button above is changed = true, use this function.
//THIS FUNCTION WILL GRAB THE USER'S UPLOADED IMAGE AND TURN IT INTO AN URLOBJECT TO DISPLAY IT FOR THE USER
function changeImage(inputImage) {
  //grabbing the files inside InputImage
  if (inputImage.files && inputImage.files[0]) {
    //FileReader object reads the contents of files (or raw data buffers) stored on the computer.
    const reader = new FileReader();
    //onload property contains an event handler executed when the load event is fired
    reader.onload = function (e) {
      //Grabs the src and turns it to an url object and returns it as a preview
      preview.src = e.target.result;
    };
    //readAsDataURL method is used to read the contents of the specified File or Blob, when reading is done, the result contains the data as a data:URL
    reader.readAsDataURL(inputImage.files[0]);
  }
}

function sendImageToBackend() {
  let image = document.getElementById("imageInput");
  let language = document.getElementById("languageInput");
  let formData = new FormData();

  formData.append("image", image.files[0]);
  formData.append("language", language.value);

  //CREATED OPTIONS FOR THE POST REQUEST
  const options = {
    method: "POST",
    body: formData,
  };

  //THIS POST REQUEST WITH FETCH, SENDS THE IMAGE TO BACKEND AND RETRIEVES THE EXTRACTED TEXT FROM THE IMAGE
  fetch("http://localhost:3001/upload", options)
    //Grabbing the back-end text and convert it to json data
    .then((response) =>
      response.json().then((data) => {
        //console.log(data, typeof data)
        document.getElementById("recognizedText").innerHTML =
          data.recognizedText;
      })
    );
}

translateButton.addEventListener("click", function () {
  sendRecognizedTextToBackend(this);
});

const jsonTLanguageList = {
  languages: {
    Amharic: "amh",
    Arabic: "ara",
    Assamese: "asm",
    Azerbaijani: "aze",
    "Azerbaijani-Cyrillic": "aze_cyrl",
    Belarusian: "bel",
    Bengali: "ben",
    Tibetan: "bod",
    Bosnian: "bos",
    Bulgarian: "bul",
    "Catalan-Valencian": "cat",
    Cebuano: "ceb",
    Czech: "ces",
    "Chinese-Simplified": "chi_sim",
    "Chinese-Traditional": "chi_tra",
    Cherokee: "chr",
    Welsh: "cym",
    Danish: "dan",
    German: "deu",
    Dzongkha: "dzo",
    "Greek-Modern(1453-)": "ell",
    English: "eng",
    "English-Middle(1100-1500)": "enm",
    Esperanto: "epo",
    Estonian: "est",
    Basque: "eus",
    Persian: "fas",
    Finnish: "fin",
    French: "fra",
    "German-Fraktur": "frk",
    "French-Middle(ca. 1400-1600)": "frm",
    Irish: "glegle",
    Galician: "glg",
    "Greek-Ancient(-1453)": "grc",
    Gujarati: "guj",
    "Haitian-HaitianCreole": "hat",
    Hebrew: "heb",
    Hindi: "hin",
    Croatian: "hrv",
    Hungarian: "hun",
    Inuktitut: "iku",
    Indonesian: "ind",
    Icelandic: "isl",
    Italian: "ita",
    "Italian-Old": "ita_old",
    Javanese: "jav",
    Japanese: "jpn",
    Kannada: "kan",
    Georgian: "kat",
    "Georgian-Old": "kat_old",
    Kazakh: "kaz",
    "Central-Khmer": "khm",
    "Kirghiz-Kyrgyz": "kir",
    Korean: "kor",
    Kurdish: "kur",
    Lao: "lao",
    Latin: "lat",
    Latvian: "lav",
    Lithuanian: "lit",
    Malayalam: "mal",
    Marathi: "mar",
    Macedonian: "mkd",
    Maltese: "mlt",
    Malay: "msa",
    Burmese: "mya",
    Nepali: "nep",
    "Dutch-Flemish": "nld",
    Norwegian: "nor",
    Oriya: "ori",
    "Panjabi-Punjabi": "pan",
    Polish: "pol",
    Portuguese: "por",
    "Pushto-Pashto": "pus",
    "Romanian-Moldavian-Moldovan": "ron",
    Russian: "rus",
    Sanskrit: "san",
    "Sinhala-Sinhalese": "sin",
    Slovak: "slk",
    Slovenian: "slv",
    "Spanish-Castilian": "spa",
    "Spanish-Castilian-Old": "spa",
    Albanian: "sqi",
    Serbian: "srp",
    "Serbian-Latin": "srp_latn",
    Swahili: "swa",
    Swedish: "swe",
    Syriac: "syr",
    Tamil: "tam",
    Telugu: "tel",
    Tajik: "tgk",
    Tagalog: "tgl",
    Thai: "tha",
    Tigrinya: "tir",
    Turkish: "tur",
    "Uighur-Uyghur": "uig",
    Ukrainian: "ukr",
    Urdu: "urd",
    Uzbek: "uzb",
    "Uzbek-Cyrillic": "uzb_cyrl",
    Vietnamese: "vie",
    Yiddish: "yid",
  },
};
const sortedJsonList = Object.fromEntries(
  Object.entries(jsonTLanguageList.languages).sort()
);

function tesseractDropDown() {
  const selectLanguageElement = document.getElementById("languageInput");

  for (const language in sortedJsonList) {
    //console.log(language, jsonTLanguageList.languages[language])
    const languageOption = document.createElement("option");
    languageOption.text = language;
    languageOption.value = jsonTLanguageList.languages[language];
    selectLanguageElement.appendChild(languageOption);
  }
}
tesseractDropDown();

const canDetectButNotTranslateArray = [
  "Assamese",
  "Azerbaijani-Cyrillic",
  "Burmese",
  "Catalan-Valencian",
  "Central-Khmer",
  "Cherokee",
  "Dutch-Flemish",
  "Dzongkha",
  "English-Middle(1100-1500)",
  "French-Middle(ca. 1400-1600)",
  "Georgian-Old",
  "German-Fraktur",
  "Greek-Ancient(-1453)",
  "Greek-Modern(1453-)",
  "Haitian-HaitianCreole",
  "Inuktitut",
  "Italian-Old",
  "Kirghiz-Kyrgyz",
  "Oriya",
  "Panjabi-Punjabi",
  "Portuguese",
  "Pushto-Pashto",
  "Romanian-Moldavian-Moldovan",
  "Sanskrit",
  "Serbian-Latin",
  "Spanish-Castilian",
  "Spanish-Castilian-Old",
  "Syriac",
  "Tagalog",
  "Tibetan",
  "Tigrinya",
  "Uighur-Uyghur",
  "Uzbek-Cyrillic",
];
const canDetectBuCanTranslateArray = [
  "Armenian",
  "Catalan",
  "Corsican",
  "Dutch",
  "Greek",
  "Haitian-Creole",
  "Hausa",
  "Hawaiian",
  "Hmong",
  "Igbo",
  "Khmer",
  "Kyrgyz",
  "Luxembourgish",
  "Malagasy",
  "Maori",
  "Mongolian",
  "Myanmar-Burmese",
  "Nyanja-Chichewa",
  "Pashto",
  "Portuguese-PortugalBrazil",
  "Punjabi",
  "Romanian",
  "Samoan",
  "Scots-Gaelic",
  "Sesotho",
  "Shona",
  "Somali",
  "Spanish",
  "Sundanese",
  "Tagalog-Filipino",
  "Xhosa",
  "Yoruba",
  "Zulu",
];
const canDetectAndTranslateJson = {
  Afrikaans: {
    tesseract_language_code: "afr",
    google_language_code: "af",
  },
  Amharic: {
    tesseract_language_code: "amh",
    google_language_code: "am",
  },
  Arabic: {
    tesseract_language_code: "ara",
    google_language_code: "ar",
  },
  Azerbaijani: {
    tesseract_language_code: "aze",
    google_language_code: "az",
  },
  "Azerbaijani-Cyrillic": {
    tesseract_language_code: "aze_cyrl",
    google_language_code: "az",
  },
  Belarusian: {
    tesseract_language_code: "bel",
    google_language_code: "be",
  },
  Bengali: {
    tesseract_language_code: "ben",
    google_language_code: "bn",
  },
  Bosnian: {
    tesseract_language_code: "bos",
    google_language_code: "bs",
  },
  Bulgarian: {
    tesseract_language_code: "bul",
    google_language_code: "bg",
  },
  "Catalan-Valencian": {
    tesseract_language_code: "cat",
    google_language_code: "ca",
  },
  Cebuano: {
    tesseract_language_code: "ceb",
    google_language_code: "ceb",
  },
  Czech: {
    tesseract_language_code: "ces",
    google_language_code: "cs",
  },
  "Chinese-Simplified": {
    tesseract_language_code: "chi_sim",
    google_language_code: "zh-CN",
  },
  "Chinese-Traditional": {
    tesseract_language_code: "chi_tra",
    google_language_code: "zh-TW",
  },
  Welsh: {
    tesseract_language_code: "cym",
    google_language_code: "cy",
  },
  Danish: {
    tesseract_language_code: "dan",
    google_language_code: "da",
  },
  German: {
    tesseract_language_code: "deu",
    google_language_code: "de",
  },
  "Greek-Modern(1453-)": {
    tesseract_language_code: "ell",
    google_language_code: "el",
  },
  English: {
    tesseract_language_code: "eng",
    google_language_code: "en",
  },
  "English-Middle(1100-1500)": {
    tesseract_language_code: "enm",
    google_language_code: "en",
  },
  Esperanto: {
    tesseract_language_code: "epo",
    google_language_code: "eo",
  },
  Estonian: {
    tesseract_language_code: "est",
    google_language_code: "et",
  },
  Basque: {
    tesseract_language_code: "eus",
    google_language_code: "eu",
  },
  Persian: {
    tesseract_language_code: "fas",
    google_language_code: "fa",
  },
  Finnish: {
    tesseract_language_code: "fin",
    google_language_code: "fi",
  },
  French: {
    tesseract_language_code: "fra",
    google_language_code: "fr",
  },
  "German-Fraktur": {
    tesseract_language_code: "frk",
    google_language_code: "de",
  },
  "French-Middle(ca. 1400-1600)": {
    tesseract_language_code: "frm",
    google_language_code: "fr",
  },
  Irish: {
    tesseract_language_code: "glegle",
    google_language_code: "ga",
  },
  Galician: {
    tesseract_language_code: "glg",
    google_language_code: "gl",
  },
  "Greek-Ancient(-1453)": {
    tesseract_language_code: "grc",
    google_language_code: "el",
  },
  Gujarati: {
    tesseract_language_code: "guj",
    google_language_code: "gu",
  },
  Hebrew: {
    tesseract_language_code: "heb",
    google_language_code: "he**",
  },
  Hindi: {
    tesseract_language_code: "hin",
    google_language_code: "hi",
  },
  Croatian: {
    tesseract_language_code: "hrv",
    google_language_code: "hr",
  },
  Hungarian: {
    tesseract_language_code: "hun",
    google_language_code: "hu",
  },
  Indonesian: {
    tesseract_language_code: "ind",
    google_language_code: "id",
  },
  Icelandic: {
    tesseract_language_code: "isl",
    google_language_code: "is",
  },
  Italian: {
    tesseract_language_code: "ita",
    google_language_code: "it",
  },
  "Italian-Old": {
    tesseract_language_code: "ita_old",
    google_language_code: "it",
  },
  Javanese: {
    tesseract_language_code: "jav",
    google_language_code: "jw",
  },
  Japanese: {
    tesseract_language_code: "jpn",
    google_language_code: "ja",
  },
  Kannada: {
    tesseract_language_code: "kan",
    google_language_code: "kn",
  },
  Georgian: {
    tesseract_language_code: "kat",
    google_language_code: "ka",
  },
  "Georgian-Old": {
    tesseract_language_code: "kat_old",
    google_language_code: "ka",
  },
  Kazakh: {
    tesseract_language_code: "kaz",
    google_language_code: "kk",
  },
  "Central-Khmer": {
    tesseract_language_code: "khm",
    google_language_code: "km",
  },
  "Kirghiz-Kyrgyz": {
    tesseract_language_code: "kir",
    google_language_code: "ky",
  },
  Korean: {
    tesseract_language_code: "kor",
    google_language_code: "ko",
  },
  Kurdish: {
    tesseract_language_code: "kur",
    google_language_code: "ku",
  },
  Lao: {
    tesseract_language_code: "lao",
    google_language_code: "lo",
  },
  Latin: {
    tesseract_language_code: "lat",
    google_language_code: "la",
  },
  Latvian: {
    tesseract_language_code: "lav",
    google_language_code: "lv",
  },
  Lithuanian: {
    tesseract_language_code: "lit",
    google_language_code: "lt",
  },
  Malayalam: {
    tesseract_language_code: "mal",
    google_language_code: "ml",
  },
  Marathi: {
    tesseract_language_code: "mar",
    google_language_code: "mr",
  },
  Macedonian: {
    tesseract_language_code: "mkd",
    google_language_code: "mk",
  },
  Maltese: {
    tesseract_language_code: "mlt",
    google_language_code: "mt",
  },
  Malay: {
    tesseract_language_code: "msa",
    google_language_code: "ms",
  },
  Nepali: {
    tesseract_language_code: "nep",
    google_language_code: "ne",
  },
  "Dutch-Flemish": {
    tesseract_language_code: "nld",
    google_language_code: "nl",
  },
  Norwegian: {
    tesseract_language_code: "nor",
    google_language_code: "no",
  },
  "Panjabi-Punjabi": {
    tesseract_language_code: "pan",
    google_language_code: "pa",
  },
  Polish: {
    tesseract_language_code: "pol",
    google_language_code: "pl",
  },
  "Pushto-Pashto": {
    tesseract_language_code: "pus",
    google_language_code: "ps",
  },
  "Romanian-Moldavian-Moldovan": {
    tesseract_language_code: "ron",
    google_language_code: "ro",
  },
  Russian: {
    tesseract_language_code: "rus",
    google_language_code: "ru",
  },
  "Sinhala-Sinhalese": {
    tesseract_language_code: "sin",
    google_language_code: "si",
  },
  Slovak: {
    tesseract_language_code: "slk",
    google_language_code: "sk",
  },
  Slovenian: {
    tesseract_language_code: "slv",
    google_language_code: "sl",
  },
  "Spanish-Castilian": {
    tesseract_language_code: "spa",
    google_language_code: "es",
  },
  "Spanish-Castilian-Old": {
    tesseract_language_code: "spa",
    google_language_code: "es",
  },
  Albanian: {
    tesseract_language_code: "sqi",
    google_language_code: "sq",
  },
  Serbian: {
    tesseract_language_code: "srp",
    google_language_code: "sr",
  },
  "Serbian-Latin": {
    tesseract_language_code: "srp_latn",
    google_language_code: "sr",
  },
  Swahili: {
    tesseract_language_code: "swa",
    google_language_code: "sw",
  },
  Swedish: {
    tesseract_language_code: "swe",
    google_language_code: "sv",
  },
  Tamil: {
    tesseract_language_code: "tam",
    google_language_code: "ta",
  },
  Telugu: {
    tesseract_language_code: "tel",
    google_language_code: "te",
  },
  Tajik: {
    tesseract_language_code: "tgk",
    google_language_code: "tg",
  },
  Thai: {
    tesseract_language_code: "tha",
    google_language_code: "th",
  },
  Turkish: {
    tesseract_language_code: "tur",
    google_language_code: "tr",
  },
  Ukrainian: {
    tesseract_language_code: "ukr",
    google_language_code: "uk",
  },
  Urdu: {
    tesseract_language_code: "urd",
    google_language_code: "ur",
  },
  Uzbek: {
    tesseract_language_code: "uzb",
    google_language_code: "uz",
  },
  "Uzbek-Cyrillic": {
    tesseract_language_code: "uzb_cyrl",
    google_language_code: "uz",
  },
  Vietnamese: {
    tesseract_language_code: "vie",
    google_language_code: "vi",
  },
  Yiddish: {
    tesseract_language_code: "yid",
    google_language_code: "yi",
  },
};

//SENDING RECOGNIZED TEXT TO BACKEND
function sendRecognizedTextToBackend() {
  let recognizedText = document.getElementById("recognizedText").innerHTML;
  //console.log(recognizedText)
  let translatedText = document.getElementById("translatedText");
  //console.log(translatedText)
  let language = document.getElementById("languageInput");
  let languageSource = language.value;

  for (const property in canDetectAndTranslateJson) {
    //console.log(`${property}: ${canDetectAndTranslateJson[property].google_language_code}`);
    if (
      language.value ==
      canDetectAndTranslateJson[property].tesseract_language_code
    ) {
      languageSource = canDetectAndTranslateJson[property].google_language_code;
    }
  }

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recognizeText: recognizedText,
      languageSource: languageSource,
    }),
  };
  fetch("http://localhost:3001/translate", options)
    //Grabbing the back-end text and convert it to json data
    .then((response) =>
      response.json().then((data) => {
        translatedText.innerHTML = data.translatedText;
      })
    );
}
