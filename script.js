// Note: For security, API key is removed. Insert your own key here for testing.
const API_KEY = 'YOUR_API_KEY_HERE'; 
const API_URL = 'https://api.vyro.ai/v2/image/generations';


const imageContainer = document.getElementById('imageContainer');
const imageResultElement = document.getElementById('imageResult');

//fuction to generate the image
//.value retrives the current value of the element
function generateImage() {
    //Get values from input fields
    const promptValue = document.getElementById("prompt").value;
    const styleValue = document.getElementById("dropdownStyles").value;
    const ratioValue = document.getElementById("dropdownRatio").value;

    // If Prompt is empty
    if(!promptValue){
        alert("Please enter a prompt.");
        return;
    }

    setLoadingState(true)

    //Preparing form data for the API request
   var myHeaders = new Headers();
   myHeaders.append("Authorization", "Bearer " + API_KEY);

    const formData = new FormData()
    //FormData is a built-in JS object that allows to construct a set of key/value pairs representing form fields and their values. 
    formData.append("prompt",promptValue)
    formData.append("style",styleValue)
    formData.append("aspect_ratio",ratioValue)
     
    var requestOptions = {
       method: 'POST',
       headers: myHeaders,
       body: formData,
       redirect: 'follow'
};

    fetch(API_URL,requestOptions)
     .then(response => response.blob())
   .then(blob => {
         // create an object URL for the blob
         const imageURL = URL.createObjectURL(blob);
         //set the image source to display
         imageResultElement.src = imageURL;
   })
   .catch(error =>{
    console.log('error', error);
    alert("An error occured while generating the image.");
   })
   .finally(()=>{
    //Restore the Loading state
    setLoadingState(false);
   });



}
 
function setLoadingState(isLoading) {
if(isLoading){
imageResultElement.style.display =  "none"
imageContainer.classList.add("loading") //This adds the loading class to imageContainer
}else{
imageResultElement.style.display = "block"
imageContainer.classList.remove("loading")
}
}

function downloadImage() {
const imageURL = imageResultElement.src;

   //if image URL is empty
   if(!imageURL){
    alert("No image is available for download.")
    return;
   }
   //create a temporary anchor element to initiate download
   const link = document.createElement("a");
   link.href = imageURL;
   link.download = "ai-generated-image.jpg";
   link.click();

}