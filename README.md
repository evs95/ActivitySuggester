## Sunshine
A web application that allows a user to pick a desired destination city or use local coordinates in order to find appropriate activities based on ambient conditions at that destination and user intent.

1. [ User Experience and Use Cases](#user-experience)
2. [ UI Screenshots](#page-screen-shots)
3. [ Third-party APIs ](#third-party-apis)
4. [Pseudo-code](#pseudocode)

<a name="user-experience"> </a>
## User Experience

    AS A social enthusiast
    I WANT an app that allows me to search within the radius of a city and find ambient conditions and types of activities that are appropriate for those conditions.
    SO THAT social enthusiasts can meet up locally and be present at activities together.


## Use Cases

    WHEN I open the app 
    THEN I am presented with a well-polished layout including a search form. 

    WHEN I look at the search form 
    THEN I can enter a city name and select my intent (shopping, eating, or recreation). I can click a submit button. 

    WHEN I want to choose my search radius 
    THEN I find a submit button that accesses user coordinates to make a search for places nearby.  

    WHEN I click the submit button 
    THEN the app loads local weather, time, and activities. These activities are appropriate to the weather and time conditions, the user intent, and the geographical coordinates of the city or user. 

    WHEN I look at the results 
    THEN the layout is well-polished and resembles the image in the mockup.

<a name ="screen-shots"></a>
## Page Screen Shots
#### The User Interface Wireframe Design
-------------------------------------
![UI Project](https://user-images.githubusercontent.com/94703967/153086599-6148502b-30ad-4869-b092-00f573922355.jpg)

#### The User Experience Wireframe Design
-------------------------------------
![UX Design Template](https://user-images.githubusercontent.com/94703967/153086393-625028d7-e498-47af-a1c7-84f351cd66f7.png)

<a name="third-party-apis"></a>
## Third-party APIs

[Open Weather API – to find current weather conditions"](https://openweathermap.org/)

[TrueWay Places API – to find local places and place types"](https://rapidapi.com/trueway/api/trueway-places/) 

[Moment API - to find local time](https://momentjs.com/)

[Foundation API - to style page elements](https://get.foundation/)

<a name="pseudocode"></a>
## Pseudocode

### HTML:
1. Create Landing page with files of css, js, html 
2. Create search form for user to input criteria
city <br>
    a. city name input <br>
    b. user intent dropdown (shopping, eating, recreation)<br>
    c. search button<br>
    d. search nearby button
3. Create semantic elements for weather and places 
4. Define card structure for these outputs 
### JS
1. Search button functionality
2. Weather api call
3. logic to determine which places to show
4. Trueway api call for places. - - -  Cody
5. Place user input in local storage
### CSS
1. Add foundation classes to HTML elements using JS
2. Define custom foundation styles