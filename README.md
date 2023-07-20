# Image to Text Translator App

This project was inspired by a hobby of enjoying foreign comics without knowing the language. This is a tool that can also be used to translate any image you desire, it includes all Tesseract OCR supported language library.

## Resources Used

[Tesseract.js](https://github.com/naptha/tesseract.js/blob/master/README.md)

[Google Translate Rapid API](https://rapidapi.com/googlecloud/api/google-translate1)

[CropGuide](https://crop.guide/)

[Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

## Web App Demo

![ImageTranslatorDemo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWIwMmIwZmFmMzgwZWM4MjRkZmY3MmQ5MzM5YWJiMDk5NzRlYTljNyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3d1Z8kK9ap0h4sru3y/giphy.gif)

Tesseract OCR library's supports other languages within its library besides the Korean language shown in the demo for text recognition, users can translate images with the free rapid google translate API's to any supported languages.

## Number of Supported Languages

Tesseract.js: total of 101 Languages

Rapid Google API Translator: total of 104 Languages

## Languages Google might not support but Tesseract can extract text of:

- Assamese
- Tibetan
- Cherokee
- Dzongkha
- Inuktitut
- Oriya
- Sanskrit
- Syriac
- Tigrinya
- Uighur; Uyghur

List of complete Tesseract.js Supported Languages [HERE](https://tesseract-ocr.github.io/tessdoc/Data-Files#data-files-for-version-400-november-29-2016)

## Languages that Tesseract.js does not support but Google API supports:

- Armenian
- Corsican
- Frisian
- Hausa
- Hawaiian
- Hmong
- Igbo
- Luxembourgish
- Malagasy
- Maori
- Mongolian
- Nyanja(Chichewa)
- Samoan
- Scots Gaelic
- Sesotho
- Shona
- Sindhi
- Somali
- Sundanese
- Xhosa
- Yoruba
- Zulu

List of complete Google Rapid API Supported Languages [HERE](https://rapidapi.com/googlecloud/api/google-translate1/details)

## How to use:

1. Install Visual Studio Code and node.js.
2. Create an account with CropGuide for free with a 7 days trial, users will be able to crop the uploaded image targetting the text only.

   a) Create a domain name and the settings for the cropping size.

   b) Go to the dashboard and click details.

   c) Copy the script code that includes your unique Key provided and replace the existing expired code in the index.html file.

3. Create an account with RapidApi for the Google Translate Api, it's also free but limited to translate 500 characters per month.
   
   a) Go to Endpoints, select POST translate and go to Request Body to set up testing.
   
   b) At the 'q' input box, place the text you want to translate, 'target' will be the language you desire to be translated to.
   
   c) Down to 'source' input box, should be the language of the text pasted.
   
   d) Click Test Endpoint to check that the settings are correct, the text will be translated under Results tab.
   
   e) Make sure that on line 10 in the translate controller inside the 'Back-end Folder' has the same information as your code Snippets (In this case, encodedParams.set for target and your X-RapidAPI-Key).
   
4. Set up and replace the Bootstrap src links as well. (Feel free to style it as you desire).
5. Open the index.html local file on your computer to run the app, follow the Demo.
