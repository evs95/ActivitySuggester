//Get user coordinates

var userCoordinates = navigator.geolocation.getCurrentPosition(success, fail);

function success (position){
    console.log(position.coords.longitude);
}

function fail (fail){
    console.log(fail);
}


//Capture HTML elements


