//Get user coordinates

var userCoordinates = navigator.geolocation.getCurrentPosition(success, fail);

function success (position){
    console.log(position.coords.longitude);

// Get user coordinates 

var latitude  =  0;
var longitude =  0;

var userCoordinates = navigator.geolocation.getCurrentPosition(success, fail);

function success (position){
    longitude = position.coords.longitude;
    latitude  = position.coords.latitude;

}

function fail (fail){
    console.log(fail);
}

}

// Capture HTML elements

var searchInput = $('#the-one-input-to-rule-them-all');
var activitySection = $('#activities');

activitySection.hide();
// Capture Moment.js date

var date = moment().format('dddd');

// Fetch Weather API

// Renders Page Elements  
    //Render Weather
    //Render Date

// Handles search request
function handleSearchRequest() {

    //Store search values in local storage

    //Fetch the TrueWay API

    //Evaluate activity results

    //Build results elements

    //Redirect to Results Page



};
