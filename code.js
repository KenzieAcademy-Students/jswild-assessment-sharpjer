// To run this assignment, right click on index.html in the Visual Studio file explorer to the left
// and select "Open with Live Server"

// Your Code Here.

let myLocation = {
    latitude: "60.1699",
    longitude: "24.9384"
}

let flickrURL = `https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=28cfb4e6f54d76d0aedbea72f8668c79&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=${myLocation.latitude}&lon=${myLocation.longitude}&text=finland`;


function success(position) {
    let lat = `${position.coords.latitude}`;
    let lon = `${position.coords.longitude}`;
    console.log(lat, lon);
    myLocation.latitude = lat;
    myLocation.longitude = lon;
}
  
function error() {
    console.log('Sorry, could not access your location.');
}
  
const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
};
  
const watchID = navigator.geolocation.watchPosition(success, error, options);

function constructImageURL (photoObj) {
    return "https://farm" + photoObj.farm +
            ".staticflickr.com/" + photoObj.server +
            "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
}

let currentPhotoIndex = 0;

function appendImage(photos) {
    let imageUrl = constructImageURL(photos[currentPhotoIndex]);
    let image = document.createElement("img");
    image.src = imageUrl;
    let main = document.querySelector("main");
    main.innerHTML = "";
    main.appendChild(image);
    if (currentPhotoIndex < 4) {
        currentPhotoIndex++;
    } else {
        currentPhotoIndex = 0;
    }
}

fetch(flickrURL)
.then(response => response.json())
.then(result => {
  console.log('Success:', result);
  let photosArray = result.photos.photo;
  appendImage(photosArray);
  setInterval(appendImage, 5000, photosArray);
})
.catch(error => {
  console.error('Error:', error);
});

