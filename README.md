# Image Text Extractor and Translator

This application was inspired by a hobby- enjoying foreign comics without knowing the language. This is a tool that can also be used to translate any image with text you desire.

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
   a) Create a domain name.  
   b) Go to the dashboard and click details.
   c) Copy the script code that includes your unique Key they provide and replace the existing expired code in the index.html file.
