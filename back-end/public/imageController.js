//Grabs the upload file
const inputImage = document.getElementById('imageUploadControl')
//Grabbing my preview "box" which takes in images
const preview = document.getElementById('preview')

//If "choose file" button changes aka user selected image
//the button will be "changed" from original status
inputImage.addEventListener('change', function() {
    changeImage(this)
});

//If button above is changed = true, use this function.
//This function will grab the uploaded image turn it into an urlObject and send it back for preview
function changeImage(inputImage) {
    
    if(inputImage.files && inputImage.files[0]) {
       const reader = new FileReader();

        reader.onload = function (e) {
            console.log('changed')
            //Grabs the src and turns it to an url object and returns it as a preview
            preview.src = e.target.result;
            console.log(preview)
        }
        reader.readAsDataURL(inputImage.files[0]);
    }
}

