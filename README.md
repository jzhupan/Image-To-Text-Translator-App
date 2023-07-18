# OCR and Translation App

This project was made while I was still learning JavaScript and it was inspired by a hobby of enjoying foreign comics without knowing the language. This is a tool that can also be used to translate any image you desire.

## Resources Used

[Tesseract.js](https://github.com/naptha/tesseract.js/blob/master/README.md)

[Google Translate API](https://rapidapi.com/googlecloud/api/google-translate1)

[CropGuide](https://crop.guide/)

[Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

## Web App Demo

![ImageTranslatorDemo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWIwMmIwZmFmMzgwZWM4MjRkZmY3MmQ5MzM5YWJiMDk5NzRlYTljNyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3d1Z8kK9ap0h4sru3y/giphy.gif)

Tesseract OCR library's supports other languages within its library besides the Korean language shown in the demo for text recognition, users can translate images with the free rapid google translate API's to any supported languages.

How to use:

1. Create an account with CropGuide, with this users will be able to crop the image targetting the text only, I used the 7 day free trial.

   a) Create a domain name and the settings for the cropping size.

   b) Go to the dashboard and click details.

   c) Copy the script code that includes your unique Key they provide and replace the existing expired code in the index.html file.

2. Create an account with RapidApi for the Google Translate Api, it's also free but it's limited to 500 characters per month.
   
   a) Go to Endpoints, select POST translate and go to Request Body to set up testing.
   
   b) At the 'q' input box, place the text you want to translate, 'target' will be the language you desire to be translated to.
   
   c) Down to 'source' input box, should be the language of the text pasted.
   
   d) Click Test Endpoint to check that the settings are correct, the text will be translated under Results.
   
   e) Make sure on line 10 in the translate controller in the 'Back-end Folder' has the same information as your code Snippets (In this case, encodedParams.set for target and your X-RapidAPI-Key).
   
3. Set up and replace the Bootstrap src links as well. (Feel free to style it as you desire).
4. Open the index.html local file on your computer to run the app, follow the Demo.
