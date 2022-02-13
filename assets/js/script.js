
// Declare global variables
var latitude = 0;
var longitude = 0;
var date = moment().format("dddd, MMMM Do, h:mm a")
var localWeatherData;
var cityWeatherData;
var trueWayPlaces;

// Capture HTML elements
var searchInput = $('#the-one-input-to-rule-them-all');
var mainSection = $('#main-section');
var currentWeather = $('#current-weather');
var resultsSection = $('#results-section');
var rulesInfo = $('#rules-info');
var btnsearchEl = $('#btnsearch');
var currentDate = $(); // TODO : ID of curretn date in header
var tempEl = $(); // TODO : ID of temparature in header
var searchedCitiesListEl = $('#searchedCitiesList');

// Hide results section
var activitySection = $('#activities');
activitySection.hide();
resultsSection.hide();



//If the geolocation succeeds
function success(position) {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;

    //Render Weather
    function getLocalWeatherData(latitude, longitude) {
        var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=75cb326e22036d2782293ee5a922582b";
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data != null && data.cod == 200) {
                    //Capture local weather in a global variable
                    localWeatherData = data;


                    //Render the local weather page elements
                    $('#weather').text(localWeatherData.weather[0].description)
                        .css('text-transform', 'capitalize')
                        .append($('<img>')
                            .attr('alt', localWeatherData.weather[0].description)
                            .attr('src', "http://openweathermap.org/img/wn/"
                                + localWeatherData.weather[0].icon + "@2x.png"));

                    currentDate.text(data.name + '(' + moment().format("MM/DD/YYYY") + ')');
                    tempEl.text("Temp: " + data.main.temp + "°F");


                }
                else {
                    console.log("Error from API");
                }
            });
    };

    getLocalWeatherData(latitude, longitude);
}

function fail(fail) {
    console.log(fail);
    $('#weather').text('Enable geolocation')
}

// Saves search info to local storage and gets TrueWay API info
function handleSearchRequest(city) {
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
        cityName: city,
        city_latitude: latitude,
        city_longitude: longitude,
        placeType: getActivities(),
        searchRadius: 10000
    };

    //The object is added to the previous searches array
    var savedList = JSON.parse(localStorage.getItem("previousSearches"));
    var cityExist = false;
    if (savedList != null) {
        for (var index = 0; index < savedList.length; index++) {
            //const element = array[index];
            if (savedList[index].cityName.toLowerCase() == searchValues.cityName.toLowerCase()) {
                cityExist = true;
            }
        }
    }

    if (!cityExist) {
        previousSearches.push(searchValues);
    }

    //The array is stored locally in JSON
    localStorage.setItem('previousSearches', JSON.stringify(previousSearches));
    /*****************************************/

    /*****************************************/
    //Fetch the TrueWay API

    //Setup URL request
    var trueWayURL = "https://trueway-places.p.rapidapi.com/FindPlacesNearby?location="
        + searchValues.city_latitude + "%2C" + searchValues.city_longitude +
        "&radius=" + searchValues.searchRadius + "&language=en" + "&type=" + searchValues.placeType;


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
            response = response.json();
            return response;
        })
        .then(function (response) {
            trueWayPlaces = response.results;
            renderResults();
        })
        .catch(err => {
            console.error(err);
        });
}
/*****************************************/

// Fetch Weather API
function getWeatherData(city) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=75cb326e22036d2782293ee5a922582b";
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data != null && data.cod == 200) {
                cityWeatherData = data;
                latitude = data.coord.lat;
                longitude = data.coord.lon;

                // Fetch Weather API
                function getWeatherData(city) {
                    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=75cb326e22036d2782293ee5a922582b";
                    fetch(url)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            if (data != null && data.cod == 200) {
                                cityWeatherData = data;
                                latitude = data.coord.lat;
                                longitude = data.coord.lon;

                                //Stores search info in local storage and gets TrueWay API info
                                handleSearchRequest(city);

                                loadSavedCities();
                                //Render the results elements into the main content section
                                //renderResults();


                            }
                            else {
                                console.log("Error from API");
                            }
                        });
                };
            }
            else {console.log('error')}; 
        });

}

function getActivities() {
    var time = moment(new Date(cityWeatherData.dt * 1000)).format("h");
    var cod = Number(String(cityWeatherData.weather[0].id).charAt(0));

    if (Number(time) > 18) {
        return evening[Math.floor(Math.random() * evening.length)];
    }

    switch (cod) {
        case 8:
            return outDoor[Math.floor(Math.random() * outDoor.length)];

        case 5:
            return "Library";

        case 6:
        case 3:
            return indoor[Math.floor(Math.random() * indoor.length)];

        default:
            return "";
    }
};

// TODO : Show section of activities
function renderResults() {

    rulesInfo.hide();

    //Assign jQuery references to results elements
    //var heroSection = $('.hero-section');

    //var cards = $('#cards');

    for (let i = 1; i <= 8; i++) {               //This loop populates the card info
        var cardActivityID = `#card-${i}-activity-name`;
        var cardActivity = $(cardActivityID);

        var cardAddressID = `#card-${i}-activity-address`;
        var cardAddress = $(cardAddressID);

        var cardPhoneNumberID = `#card-${i}-activity-phonenumber`;
        var cardPhoneNumber = $(cardPhoneNumberID);

        var cardWebsiteID = `#card-${i}-activity-website`;
        var cardWebsite = $(cardWebsite);

        cardActivity.text(trueWayPlaces[i - 1].name);
        cardAddress.text(trueWayPlaces[i - 1].address);
        //cardPhoneNumber.text(trueWayPlaces[i-1].address);
        cardWebsite.text(trueWayPlaces[i - 1].website);
        cardWebsite.attr('href', '#' + trueWayPlaces[i - 1].website);
    }

    resultsSection.show();
};

function loadSavedCities() {
    searchedCities = [];
    searchedCitiesListEl.empty();

    var savedCitylist = localStorage.getItem("previousSearches");
    if (savedCitylist != null && savedCitylist != "") {
        searchedCities = JSON.parse(savedCitylist);
        searchedCities.forEach(element => {
            var buttonliEl = $('<li></li>');
            var searchedCityBtn = $('<a class="button searchedCity">' + element.cityName + '</a>')
            buttonliEl.append(searchedCityBtn);
            searchedCitiesListEl.append(buttonliEl);
        });
        var searchedCityBtnEl = $('.searchedCity');
        searchedCityBtnEl.on("click", onSearchBtnClick);
    }
};

function onSearchBtnClick(event) {

    event.preventDefault();

    console.log(event);
    //Gets the city weather data and forwards that information to the handleSearchRequest function
    //var cityName = event.target
    getWeatherData(searchInput.val() != '' ? searchInput.val() : event.target.innerHTML);

}




// Load the saved city information from local storage and display to screen.
loadSavedCities();

// Get user coordinates 
var userCoordinates = navigator.geolocation.getCurrentPosition(success, fail);

//Sets an event listener on the search button
btnsearchEl.on('click', onSearchBtnClick);

var outDoor = ["art_gallery", "tourist_attraction", "park"];
var indoor = ["Library", "art_gallery"];
var evening = ["cafe", "night_club", "bar"];


