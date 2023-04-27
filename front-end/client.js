const inputImage = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const resetImage = document.getElementById("deleteButton");
//console.log(inputImage)
const translateButton = document.getElementById("translateButton");
//console.log(translateButton)


resetImage.addEventListener("click", function () {
  refreshPage();
});
function refreshPage() {
  window.location.reload();
}

//If "choose file" button is clicked and a file is uploaded, the button status will be changed
inputImage.addEventListener("change", function () {
  changeImage(this);
});

//If button above is changed = true, use this function.
//This function will grab the uploaded image turn it into an urlObject and send it back for preview
function changeImage(inputImage) {
    //grabbing the files inside InputImage
  if (inputImage.files && inputImage.files[0]) {
    //FileReader object reads the contents of files (or raw data buffers) stored on the computer.
    const reader = new FileReader();
    //onload property contains an event handler executed when the load event is fired
    reader.onload = function (e) {
      console.log("changed");
      //Grabs the src and turns it to an url object and returns it as a preview
      preview.src = e.target.result;
      //console.log(preview)
    };
    //readAsDataURL method is used to read the contents of the specified File or Blob, when reading is done, the result contains the data as a data:URL
    reader.readAsDataURL(inputImage.files[0]);
  }
}

function sendImageToBackend() {
  let image = document.getElementById("imageInput");
  let language = document.getElementById("languageInput");

  let formData = new FormData();
  // {
  //    "image": image.files[0]
  // }

  formData.append("image", image.files[0]);
  formData.append("language", language.value);

  //CREATED OPTIONS FOR THW POST REQUEST
  const options = {
    method: "POST",
    body: formData,
  };

  //THIS POST REQUEST WITH FETCH SENDS THE IMAGE TO BACKEND AND RETRIEVING THE TEXT
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

//SENDING RECOGNIZED TEXT TO BACKEND
function sendRecognizedTextToBackend() {
  let recognizedText = document.getElementById("recognizedText").innerHTML;
  //console.log(recognizedText)
  let translatedText = document.getElementById("translatedText");
  //console.log(translatedText)
  let language = document.getElementById("languageInput");
  let languageSource = language.value;

  if (language.value == "kor") {
    languageSource = "ko";
  }

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recognizeText: recognizedText,
      languageSource: languageSource,
    }),
  };
  //POST request with fetch
  fetch("http://localhost:3001/translate", options)
    //Grabbing the back-end text and convert it to json data
    .then((response) =>
      response.json().then((data) => {
        translatedText.innerHTML = data.translatedText;
      })
    );
}

const jsonTLanguageList = {
  "languages": {
    "Amharic": "amh",
    "Arabic": "ara",
    "Assamese": "asm",
    "Azerbaijani": "aze",
    "Azerbaijani-Cyrillic": "aze_cyrl",
    "Belarusian": "bel",
    "Bengali": "ben",
    "Tibetan": "bod",
    "Bosnian": "bos",
    "Bulgarian": "bul",
    "Catalan-Valencian": "cat",
    "Cebuano": "ceb",
    "Czech": "ces",
    "Chinese-Simplified": "chi_sim",
    "Chinese-Traditional": "chi_tra",
    "Cherokee": "chr",
    "Welsh": "cym",
    "Danish": "dan",
    "German": "deu",
    "Dzongkha": "dzo",
    "Greek-Modern(1453-)" : "ell",
    "English": "eng",
    "English-Middle(1100-1500)": "enm",
    "Esperanto": "epo",
    "Estonian": "est",
    "Basque": "eus",
    "Persian": "fas",
    "Finnish": "fin",
    "French": "fra",
    "German-Fraktur": "frk",
    "French-Middle(ca. 1400-1600)": "frm",
    "Irish": "glegle",
    "Galician": "glg",
    "Greek-Ancient(-1453)": "grc",
    "Gujarati": "guj",
    "Haitian-HaitianCreole": "hat",
    "Hebrew": "heb",
    "Hindi": "hin",
    "Croatian": "hrv",
    "Hungarian": "hun",
    "Inuktitut": "iku",
    "Indonesian": "ind",
    "Icelandic": "isl",
    "Italian": "ita",
    "Italian-Old": "ita_old",
    "Javanese": "jav",
    "Japanese": "jpn",
    "Kannada": "kan",
    "Georgian": "kat",
    "Georgian-Old": "kat_old",
    "Kazakh": "kaz",
    "Central-Khmer": "khm",
    "Kirghiz-Kyrgyz": "kir",
    "Korean": "kor",
    "Kurdish": "kur",
    "Lao": "lao",
    "Latin": "lat",
    "Latvian": "lav",
    "Lithuanian": "lit",
    "Malayalam": "mal",
    "Marathi": "mar",
    "Macedonian": "mkd",
    "Maltese": "mlt",
    "Malay": "msa",
    "Burmese": "mya",
    "Nepali": "nep",
    "Dutch-Flemish": "nld",
    "Norwegian": "nor",
    "Oriya": "ori",
    "Panjabi-Punjabi": "pan",
    "Polish": "pol",
    "Portuguese": "por",
    "Pushto-Pashto": "pus",
    "Romanian-Moldavian-Moldovan": "ron",
    "Russian": "rus",
    "Sanskrit": "san",
    "Sinhala-Sinhalese": "sin",
    "Slovak": "slk",
    "Slovenian": "slv",
    "Spanish-Castilian": "spa",
    "Spanish-Castilian-Old": "spa",
    "Albanian": "sqi",
    "Serbian": "srp",
    "Serbian-Latin": "srp_latn",
    "Swahili": "swa",
    "Swedish": "swe",
    "Syriac": "syr",
    "Tamil": "tam",
    "Telugu": "tel",
    "Tajik": "tgk",
    "Tagalog": "tgl",
    "Thai": "tha",
    "Tigrinya": "tir",
    "Turkish": "tur",
    "Uighur-Uyghur": "uig",
    "Ukrainian": "ukr",
    "Urdu": "urd",
    "Uzbek": "uzb",
    "Uzbek-Cyrillic": "uzb_cyrl",
    "Vietnamese": "vie",
    "Yiddish": "yid"
  }   
}

const sortedJsonList = Object.fromEntries(Object.entries(jsonTLanguageList.languages).sort())

function tesseractDropDown() {
  
  const selectLanguageElement = document.getElementById("languageInput")
  
  for(const language in sortedJsonList){
    //console.log(language, jsonTLanguageList.languages[language])
    const languageOption = document.createElement("option")
    languageOption.text = language
    languageOption.value = jsonTLanguageList.languages[language]
    selectLanguageElement.appendChild(languageOption)
  }

}
tesseractDropDown()
