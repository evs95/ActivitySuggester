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
var currentWeather =$('#current-weather');
var resultsSection = $('#results-section');
var rulesInfo = $('#rules-info');
var btnsearchEl = $('#btnsearch');
var currentDate = $(); // TODO : ID of curretn date in header
var tempEl = $(); // TODO : ID of temparature in header


// Hide results section
var activitySection = $('#activities');
activitySection.hide();
resultsSection.hide();

//If the geolocation succeeds
function success(position) {
    longitude = position.coords.longitude;
    latitude  = position.coords.latitude;
   
      //Render Weather
      function getLocalWeatherData(latitude, longitude){
        var url = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=imperial&appid=75cb326e22036d2782293ee5a922582b";
        fetch(url)
            .then(function (response) {
            return response.json();
        })
        .then(function(data){
            if(data !=null && data.cod == 200){
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
            else{
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
        city_latitude: latitude,
        city_longitude: longitude,
        placeType: '',
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
<<<<<<< HEAD
    
    
=======


>>>>>>> 74ddb9e0babf41f91e736ad411ae34b9d275645f
    fetch(trueWayURL, trueWayOptions)

    .then(response => {
	 console.log(response);
     //Save the place results to a global variable
     response = response.json();  
     return response;     
    })
    .then(function(response){
        trueWayPlaces = response;
    })
    .catch(err => {
	console.error(err);
    });
<<<<<<< HEAD


    fetch(trueWayURL, trueWayOptions)
        .then(response => {
            console.log(response);
            //Save the place results to a global variable
            trueWayPlaces = response;
        })
        .catch(err => {
            console.error(err);
        });
=======
>>>>>>> 74ddb9e0babf41f91e736ad411ae34b9d275645f

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
              
                //Stores search info in local storage and gets TrueWay API info
                handleSearchRequest();

                // TODO : Show section of activities
                function renderResults(){
    
                  rulesInfo.hide();

                   //Assign jQuery references to results elements
                   //var heroSection = $('.hero-section');
        
                   //var cards = $('#cards');

                   for(let i = 1; i <= 8 ; i++){               //This loop populates the card info
                     var cardActivityID = `#card-${i}-activity-name`;
                     var cardActivity = $(cardActivityID);
    
                     var cardAddressID = `#card-${i}-activity-address`;
                     var cardAddress = $(cardAddressID);

                     var cardPhoneNumberID = `#card-${i}-activity-phonenumber`;
                     var cardPhoneNumber = $(cardPhoneNumberID);

                     var cardWebsiteID = `#card-${i}-activity-website`;
                     var cardWebsite = $(cardWebsite);

                     cardActivity.text('Empty Search');
                     cardAddress.text('Empty Search');
                     cardPhoneNumber.text('Empty Search');
                     cardWebsite.text('Empty Search');
                     cardWebsite.attr('href', '#');
                   }

               resultsSection.show();
              }
   

             //Render the results elements into the main content section
             renderResults();
              
              
            }
            else {
                console.log("Error from API");
            }
        });
};



// Get user coordinates 
var userCoordinates = navigator.geolocation.getCurrentPosition(success, fail);

function onSearchBtnClick(event) {
    event.preventDefault();

    //Gets the city weather data and forwards that information to the handleSearchRequest function
    getWeatherData(searchInput.val());

}

//Sets an event listener on the search button
btnsearchEl.on('click', onSearchBtnClick);

