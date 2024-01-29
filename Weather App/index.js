const API_KEY = "d1668b6218fd3cf3156a8618523a47b3"
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userinfoContainer = document.querySelector(".weather-InfoContainer");
const grantLocationContainer = document.querySelector(".grant-Location-Container");
const searchForm = document.querySelector("[data-searchform]");
const LoadingScreen = document.querySelector("[loading-screen-conainer]");

const weatherinfo = document.querySelector(".show-weather-info")
let currentTab = userTab;
currentTab.classList.add("current-tab");

// FetchWeatherDetails();
// //create function to display the weather
// async function FetchWeatherDetails(){

//     try {
//         let city = 'goa'
//     const response =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
//     //convert the response into json
//     const data = await response.json();
//     console.log("weather data" , data);
//     //add response in paragraph
//     //create paragraph
//     let newpara = document.createElement('p');
//     newpara.textContent = `${data?.main?.temp.toFixed(2)} °C`;
//     //add this into document
//     document.body.appendChild(newpara);
//     } catch (error) {
//         console.log("Something went wrong" ,error);
//     }
// }

function switchedTab(clickedTab){
    // apiErrorContainer.classList.remove("active");
    if(currentTab !== clickedTab){
        //remove tab
        currentTab.classList.remove('current-tab');
        //change tab
        currentTab = clickedTab;
        //add
        currentTab.classList.add("current-tab")
        // performing Switch from Your weather to Search Weather so remove properties from your weather classlist and add to searchweather
        if(!searchForm.classList.contains("active")){
            //remove 
            userinfoContainer.classList.remove("active");
            grantLocationContainer.classList.remove("active");
            //add   
            searchForm.classList.add("active");
        }else{
            //switching from searchweather to your weather
            searchForm.classList.remove("active");
            userinfoContainer.classList.remove("active");
            // retriving co-ordinates of user using localStorge.
            getFromSessionStorage();
        }
    }
}
userTab.addEventListener("click" , ()=>{
    switchedTab(userTab);
    // trying to debug

    // console.log("userTab");
})

searchTab.addEventListener("click" , ()=>{
    switchedTab(searchTab);
    //trying to debug 
    // console.log("switchedtab");
})
// check for co-ordinates from session storage
function getFromSessionStorage(){
    const localCoordinate = sessionStorage.getItem("user-coordinates");
    if(!localCoordinate){
        // if no local coordinates are present then ask for coordinates
        grantLocationContainer.classList.add("active");
    }else{
        //if local coordinates are present then display weather
        const coordinates = JSON.parse();
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat , longi} = coordinates;
    //remove grantcontainer
    grantLocationContainer.remove("active");
    //make loader visible
    LoadingScreen.classList.add("active");
    //make api call
    try{

        const response =await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longi}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        //remove loader
        LoadingScreen.classList.remove("active");
        //display data
        userinfoContainer.classList.add("active");
        renderWeatherinfo(data);
    }catch(e){
        LoadingScreen.remove("active");
        console.error("Wrong coordinates");
    }
}

function renderWeatherinfo(data){
    //data to be displayed
    // city name , flag(country code) , desc , weather icon , temp , windspeed , humidity , clouds
    //city name
    const cityNamme = document.querySelector("[data-city-name]");
    //flag 
    const Country = document.querySelector("[data-country-icon]");
    //desc
    const desc = document.querySelector("[data-weatherdesc]");

    const weatherIcon = document.querySelector("[data-weather-icon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const clouds = document.querySelector("[data-cloud]");

    //fetch values from weatherinfo object and put it in ui element
    
}
