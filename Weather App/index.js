const API_KEY = "d1668b6218fd3cf3156a8618523a47b3"
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userinfoContainer = document.querySelector(".weather-InfoContainer");
const grantLocationContainer = document.querySelector(".grant-Location-Container");
const searchForm = document.querySelector("[data-searchform]");
const LoadingScreen = document.querySelector(".loading-screen-container");
const grantAccess = document.querySelector("[data-grantAccess]");

const weatherinfo = document.querySelector(".show-weather-info")
let currentTab = userTab;
currentTab.classList.add("current-tab");
getFromSessionStorage();

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
        const coordinates = JSON.parse(localCoordinate);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat , lon} = coordinates;
    //remove grantcontainer
    grantLocationContainer.remove("active");
    //make loader visible
    LoadingScreen.classList.add("active");
    //make api call https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        //remove loader
        LoadingScreen.classList.remove("active");
        //display data
        userinfoContainer.classList.add("active");
        renderWeatherinfo(data);
    }catch(e){
        LoadingScreen.remove("active");
        console.error("Wrong coordinates ",e);
    }
}

function renderWeatherinfo(weatherinfo){
    //data to be displayed
    // city name , flag(country code) , desc , weather icon , temp , windspeed , humidity , clouds
    //city name
    const cityName = document.querySelector("[data-city-name]");
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
    cityName.innerText = weatherinfo?.name; 
    Country.src = `https://flagcdn.com/144x108/${weatherinfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherinfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherinfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherinfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherinfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherinfo?.main?.humidity}%`;
    clouds.innerText = `${weatherinfo?.clouds?.all}%`;
}
function showposition(position){
    const usercoordinates = {
        lat : position.coords.latitude ,
        lon : position.coords.longitude
    };
    sessionStorage.setItem("user-coordinates" , JSON.stringify(usercoordinates));
    fetchUserWeatherInfo(usercoordinates);
}
function getLocation(){
    //if browser support geolocation then directly fetch location
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showposition);
    }else{
        //alert no geolocation support available
        alert("Browser doesn't support api calls");
    }
}

grantAccess.addEventListener('click' , getLocation);

let searchInput = document.querySelector("[data-searchInput]")
searchForm.addEventListener("submit" , (e)=> {
    e.preventDefault();
    let cityName = searchInput.value;
    //if input field is empty then simply return;
    if(cityName === ""){
        return;
    }
    fetchSearchWeatherInfo(cityName);
});

async function fetchSearchWeatherInfo(city){ 
    //invoke loading screen
    LoadingScreen.classList.add("active");
    userinfoContainer.classList.remove("active");
    grantLocationContainer.classList.add("active");

    try{
        //get data
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        // convert it to json
        const data = await response.json();
        //now remove loader
        LoadingScreen.classList.remove("active");
        //make user container visible
        userinfoContainer.classList.add("active");
        // render data in ui
        renderWeatherinfo(data);
    }catch(error){
        console.error("something went wrong check city name and try again");
        
    }
}