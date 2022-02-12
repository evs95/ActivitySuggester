//------------------------------------------Categorized Weather Type Codes------------------------OpenWeatherAPI
const goodWeatherConditions = [codeClear, codeClouds];
console.log(goodWeatherConditions);
const badWeatherConditions = [codeThunderstorm, codeDrizzle, codeRain, codeSnow, codeAtmosphere];
console.log(badWeatherConditions);
//---------------------------------------------Listing Weather Codes-----------------------------------------------OpenWeatherAPI
//~~~~~~~~~~~~~~~~~~~~~~~~~~~Bad Weather~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const codeThunderstorm = [200,201,202,210,211,212,221,230,231,232]; //Have a striking moment, careful its lightning!
console.log(codeThunderstorm);
const codeDrizzle = [300,301,302,310,311,312,313,314,321];//its Drizzling my dude!
console.log(codeDrizzle);
const codeRain = [500,501,502,503,504,511,520,521,522,531];//MAIN: Light Rain, Moderate Rain, Heavy Intensity Rain, Very Heavy Rain, DONT GO OUTSIDE[503-531]
console.log(codeRain);
const codeSnow = [600,601,602,611,612,613,615,616,620,621,622];//MAIN: Snow
console.log(codeSnow);
const codeAtmosphere = [701,711,721,741,771]; //MAIN: Mist, Smoke, Haze, Fog, Squall
console.log(codeAtmosphere);
var badDay = badWeatherConditions;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~Good Weather~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~OpenWeatherAPI
const codeClear = [800]; //MAIN: Clear
console.log(codeClear);
const codeClouds = [801,802,803,804];// MAIN: Clouds (11-25%),Clouds (25-50%), Clouds (51-84%), Clouds (85-100%),
console.log(codeClouds);
var goodDay = goodWeatherConditions;
var 
//! JAVASCRIPT METHODS: toString(converts array to string), join(joins all array elems.), pop(pop out last array value), push(add new element to end of array),
//! shift(removes first element and relists new array shifted index), unshift(adds new element to start of array), ARRAY[INDEX POSITION]
//! concat(creates a new array my merging existing arrays), splice(adds new item to array), slice(slice out peice of an array)//The first parameter (2) defines the position where new elements should be added (spliced in)
//! toString(converts array to comma seperated string), 
//-------------------------------Activity Types-----------------------------------------------------------------RapidAPI[Trueway-Places]
const goodWeatherActivities = [amusement_park,aquarium,bicycle_store,campground,park,stadium,tourist_attraction,zoo];
var outsideThings = goodWeatherActivities;
const badWeatherActivities = [art_gallery,bakery,bar,beauty_salon,book_store,bowling,cafe,casino,cinema,clothing_store,department_store,library,liquor_store,museum,night_club,restaurant,shoe_store,shopping_center,spa,store,gym,home_goods_store];
var insideThings =badWeatherActivities;
//! COMPARISONS, BOOLEANS, CONDITIONS, STATEMENTS[SWITCH], LOOPS[FOR, FOR IN, FOR OF++[ITERABLES]++ ,WHILE], SETS.add(), Map()
//--A---Logic for comparing array output
function compareWeatherConditions(){//!START OF FN////|||||
// IF-ELSEIF-ELSE compare weather conditions using booleans    
var liveData= 
var measuredData=;
if (goodDay == true) {
    let good= {
    }
    alert('goodWeatherActivities');   
}
else if(badDay == true) {
    insideThings;
    alert('badWeatherActivities');
}
else {
    alert('Houston we have a problem!');
};
return;
};//!END OF FN////////////////////////////////////////||||
//--B-1--Logic based on types based on weather

//--B-2--Find City

//--B-3--Find Weather for City

//--C---Activity Type Value