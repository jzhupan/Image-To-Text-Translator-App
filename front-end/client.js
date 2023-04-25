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
