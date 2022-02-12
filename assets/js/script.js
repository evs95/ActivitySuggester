// Declare global variables
var latitude = 0;
var longitude = 0;
var date = moment().format("dddd, MMMM Do, h:mm a")
var trueWayPlaces;

// Get user coordinates 
var userCoordinates = navigator.geolocation.getCurrentPosition(success, fail);

function success(position) {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude +
        "&lon=" + longitude + "&units=imperial&appid=75cb326e22036d2782293ee5a922582b";
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            currentDate.text(data.name + '(' + moment().format("MM/DD/YYYY") + ')');
            $("#img").attr("src", " http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
            tempEl.text("Temp: " + data.main.temp + "°F");
        });
}

function fail(fail) {
    console.log(fail);
}

// Capture HTML elements
var searchInput = $('#the-one-input-to-rule-them-all');
var btnsearchEl = $('#btnsearch');
var currentDate = $(); // TODO : ID of curretn date in header
var tempEl = $(); // TODO : ID of temparature in header

// Hide results section
var activitySection = $('#activities');
activitySection.hide();

// Fetch Weather API
function getWeatherData(city) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=75cb326e22036d2782293ee5a922582b";
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data != null && data.cod == 200) {
                console.log(data);
                latitude = data.coord.lat;
                longitude = data.coord.lon;
                handleSearchRequest();

                // TODO : Show section of activities
            }
            else {
                console.log("Error from API");
            }
        });
};

// Renders Page Elements  
//Render Weather
//Render Date

// Fetch Weather API

// Handles search request
function handleSearchRequest() {
    /*****************************************/
    //Store search values in local storage
    var previousSearches;

    if (JSON.parse(localStorage.getItem('previousSearches')) == null) {
        previousSearches = [];
    }
    else {
        previousSearches = JSON.parse(localStorage.getItem('previousSearches'));
    }

    console.log(previousSearches);

    //All search value inputs go here
    // Coordinates will have to be reset from user position for a city search
    // var latitude  =
    // var longitude =

    var searchValues = {
        cityName: searchInput.val(),
        user_latitude: latitude,
        user_longitude: longitude,
        placeTypes: '',
        searchRadius: 10000
    };

    //The object is added to the previous searches array
    previousSearches.push(searchValues);

    //The array is stored locally in JSON
    localStorage.setItem('previousSearches', JSON.stringify(previousSearches));
    /*****************************************/

    /*****************************************/
    //Fetch the TrueWay API

    //Setup URL request
    var trueWayURL = "https://trueway-places.p.rapidapi.com/FindPlacesNearby?location="
        + searchValues.user_latitude + "%2C" + searchValues.user_longitude +
        "&radius=" + searchValues.searchRadius + "&language=en";


    var trueWayOptions = {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "trueway-places.p.rapidapi.com",
            "x-rapidapi-key": "7604be9d33msh51643c216e215aep1af206jsn2a5ee5996950"
        }
    };


    fetch(trueWayURL, trueWayOptions)
        .then(response => {
            console.log(response);
            //Save the place results to a global variable
            trueWayPlaces = response;
        })
        .catch(err => {
            console.error(err);
        });

    /*****************************************/

    //Evaluate activity results

    //Build results elements

    //Redirect to Results Page



};

function onSearchBtnClick(event) {
    event.preventDefault();

    getWeatherData(searchInput.val());

}

btnsearchEl.on('click', onSearchBtnClick);

//!----------Binary Bit Bytes Attempt To Do "Logic"------
//---------------------------------------------Listing Weather Codes-----------------------------------------------OpenWeatherAPI
//~~~~~~~~~~~~~~~~~~~~~~~~~~~Bad Weather~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const codeThunderstorm = [200,201,202,210,211,212,221,230,231,232]; //Have a striking moment, careful its lightning!
const codeDrizzle = [300,301,302,310,311,312,313,314,321];//its Drizzling my dude!
const codeRain = [500,501,502,503,504,511,520,521,522,531];//MAIN: Light Rain, Moderate Rain, Heavy Intensity Rain, Very Heavy Rain, DONT GO OUTSIDE[503-531]
const codeSnow = [600,601,602,611,612,613,615,616,620,621,622];//MAIN: Snow
const codeAtmosphere = [701,711,721,741,771]; //MAIN: Mist, Smoke, Haze, Fog, Squall
//~~~~~~~~~~~~~~~~~~~~~~~~~~~Good Weather~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~OpenWeatherAPI
const codeClear = [800]; //MAIN: Clear
const codeClouds = [801,802,803,804];// MAIN: Clouds (11-25%),Clouds (25-50%), Clouds (51-84%), Clouds (85-100%),
//------------------------------------------Categorized Weather Type Codes------------------------OpenWeatherAPI
const goodWeatherConditions = [codeClear, codeClouds];
const badWeatherConditions = [codeThunderstorm, codeDrizzle, codeRain, codeSnow, codeAtmosphere];
//! JAVASCRIPT METHODS: toString(converts array to string), join(joins all array elems.), pop(pop out last array value), push(add new element to end of array),
//! shift(removes first element and relists new array shifted index), unshift(adds new element to start of array), ARRAY[INDEX POSITION]
//! concat(creates a new array my merging existing arrays), splice(adds new item to array), slice(slice out peice of an array)//The first parameter (2) defines the position where new elements should be added (spliced in)
//! toString(converts array to comma seperated string), 
//-------------------------------Activity Types-----------------------------------------------------------------RapidAPI[Trueway-Places]
const goodWeatherActivities = [amusement_park,aquarium,bicycle_store,campground,park,stadium,tourist_attraction,zoo];
const badWeatherActivities = [art_gallery,bakery,bar,beauty_salon,book_store,bowling,cafe,casino,cinema,clothing_store,department_store,library,liquor_store,museum,night_club,restaurant,shoe_store,shopping_center,spa,store,gym,home_goods_store];
//! COMPARISONS, BOOLEANS, CONDITIONS, STATEMENTS[SWITCH], LOOPS[FOR, FOR IN, FOR OF++[ITERABLES]++ ,WHILE], SETS.add(), Map()
function logMe(){
    console.log(codeAtmosphere);
    console.log(codeDrizzle);
    console.log(goodWeatherConditions);
    console.log(badWeatherConditions);
    console.log(codeThunderstorm);
    console.log(codeRain);
    console.log(codeSnow);
    console.log(codeClear);
    console.log(codeClouds);
}
console.log(logMe());
//--A---Logic for comparing array output

//--B-1--Logic based on types based on weather

//--B-2--Find City

//--B-3--Find Weather for City

//--C---Activity Type Value