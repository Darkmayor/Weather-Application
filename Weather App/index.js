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
        if(!searchForm.classList.contains("active")){
            userinfoContainer.classList.remove("active");
            grantLocationContainer.classList.remove("active");
            searchForm.classList.add("active");
        }else{
            searchForm.classList.remove("active");
            userinfoContainer.classList.remove("active");
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

