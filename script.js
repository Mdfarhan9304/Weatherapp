// const startTab = document.querySelector('[dta-user-weather]');
// const searchtab = document.querySelector('[data-search-weather]');
// const userContainer = document.getElementsByClassName('weather-container');
// const grantAccessContainer = document.querySelector(".grant-location-container");
// const searchForm = document.querySelector('[data-search-form]');
// const loading = document.querySelector(".loading-container");
// const userinfoContainer=document.querySelector('.user-info-conatiner');

// let currentTab = startTab;
// const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
// currentTab.classList.add("current-tab");
// geoLocation();

// function switchTab(clickedtab){
// if(clickedtab!=currentTab){
//     currentTab.classList.remove("current-tab");
//     currentTab= clickedtab;
//     currentTab.classList.add("current-tab");

//     if (!searchForm.classList.contains("active")){
//         userinfoContainer.classList.remove("active");
//         grantAccessContainer.classList.remove("active");
//         searchForm.classList.add("active"); 
//     }
//     else{
//         searchForm.classList.remove("active");
//         userinfoContainer.classList.remove("active");
//         getfromSessionstorage();
//     }
// }
// }

// startTab.addEventListener('click', ()=>{
//     switchTab(startTab)
// });
// searchtab.addEventListener('click', ()=>{
//     switchTab(searchtab)
// });

// function getfromSessionstorage(){
//     const localCoordinates = sessionStorage.getItem("user-coordinates");
//     if(!localCoordinates){
//     grantAccessContainer.classList.add("active");
//     } else{
//         const coordinates= JSON.parse(localCoordinates);
//         fetchUserweatherinfo(coordinates);
//     }
// }

// async function fetchUserweatherinfo(coordinates){
//     const {lat, lon} = coordinates;
//     grantAccessContainer.classList.remove("active");
//     loading.classList.add("active");
//     // API CALL

//     try{
//         const res= await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
//         );
//         const data = res.json();
//         loading.classList.remove('active');
//         userinfoContainer.classList.add('active');
//         renderWeatherinfo(data);

//     }
//     catch(err){
//         // do it later
        
//     }

// }
// function renderWeatherinfo(weatherInfo){
//     const cityName = document.querySelector("[data-city-name]");
//     const countryIcon = document.querySelector("[data-country-icon]");
//     const desc = document.querySelector("[data-Weatherdesc]");
//     const weatherIcon = document.querySelector("[data-weather-icon]");
//     const temp = document.querySelector("[data-temp]");
//     const windspeed = document.querySelector("[data-windspeed]");
//     const humidity = document.querySelector("[data-humidity]");
//     const cloud = document.querySelector("[data-cloud]");
    
//     cityName.innerText=weatherInfo?.name; 
//     countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
//     desc.innerText = weatherInfo?.weather?.[0]?.description;
//     weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
//     temp.innerText = `${weatherInfo?.main?.temp} °C`;
//     windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
//     humidity.innerText = `${weatherInfo?.main?.humidity}%`;
//     cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;

// }

// function geoLocation(){
// if(navigator.geolocation){
//  navigator.geolocation.getCurrentPosition(showPosition)
// }
// else{
//     alert('no geolocation support available');
// }
// }

// function showPosition(position){
//     const userCordinates = {
//         lat: position.coords.latitude,
//         lon: position.coords.longitude,
//     }
//     sessionStorage.setItem("user-coordinates", JSON.stringify(userCordinates));
//     fetchUserweatherinfo(userCordinates)
// }

// const grantAccessButton = document.querySelector('[data-grantAccess]');
// grantAccessButton.addEventListener('click', geoLocation);

// const searchInput = document.querySelector('[data-search-Input]');

// searchInput.addEventListener("submit", (e)=>{
//     e.preventDefault();

//     let cityName= searchInput.ariaValueMax;

//     if (cityName===" "){
//         return;
//     }
//     else{
//         fetchSearchweatherinfo(cityName)

//     }
// })

// async function fetchSearchweatherinfo(city){
//     loading.classList.add('active');
//     userinfoContainer.classList.remove('active');
//     grantAccessButton.classList.remove('active');

//  try{
//     const res= await fetch(
//         'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&appid=${API_KEY}&units=metric'
//     );
//     const data=  await res.json();
//     loading.classList.remove('active');
//     userinfoContainer.classList.add('active');
//     renderWeatherinfo(data);
    

//  }
//  catch(err){
// // hw
//  }

// }



const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

//initially vairables need????

let oldTab = userTab;
const API_KEY = "eb07590d01719df7f643f6bcf987a0d1";
oldTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(newTab) {
    if(newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")) {
            //kya search form wala container is invisible, if yes then make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            //main pehle search wale tab pr tha, ab your weather tab visible karna h 
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
            //for coordinates, if we haved saved them there.
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(searchTab);
});

//check if cordinates are already present in session storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates) {
        //agar local coordinates nahi mile
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }

}

async function fetchUserWeatherInfo(coordinates) {
    const {lat, lon} = coordinates;
    // make grantcontainer invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    //API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const  data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        loadingScreen.classList.remove("active");
        //HW

    }

}

function renderWeatherInfo(weatherInfo) {
    //fistly, we have to fethc the elements 

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    console.log(weatherInfo);

    //fetch values from weatherINfo object and put it UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;


}

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        //HW - show an alert for no gelolocation support available
    }
}

function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else 
        fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        //hW
    }
}