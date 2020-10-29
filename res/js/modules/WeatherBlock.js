

class WeatherBlock {
    constructor(weatherCities, wheatherIcons) {
        this.weatherCities = weatherCities;
        this.weatherIcons = wheatherIcons;
    }

    renderCityPopUp() {
        this.parentEl = document.querySelector(".app-content");
        this.blockScr = document.querySelector(".popup-block-screen");
        this.htm = `<div></div>`
        this.popUpHTML = `<div class = "popup-window cities-popup">
                            <div class="popup-close"><button class="close-popup-btn"></button></div>
                                <div class="popup-content">
                                    <h2>Выберите город для отображения прогноза погоды</h2>
                                    <div class = "search-wrapper">
                                        <input type = "text" id = "input-city"/>
                                        <span class = "search-icon"></span>
                                    </div>
                                    <ul class = "city-list-container">

                                    </ul>
                                </div>
                                <div class="popup-btns">
                                    <button class="popup-cancel-btn">Закрыть</button>
                                </div>
                            </div>`;
        this.blockScr.classList.add("show-el");
        this.parentEl.insertAdjacentHTML('afterbegin', this.popUpHTML);
        this.searchCityInput = document.getElementById("input-city");
        this.searchCity(this.searchCityInput);
        this.changeActiveCity();
        this.searchCityInput.addEventListener("keyup", ()=> {this.searchCity(this.searchCityInput)});
        
    }

    searchCity(searchInput) {
        if(!localStorage.getItem("WEATHER-DATA")) {
            this.setWeatherDataToLocalStorage(this.weatherCities);
        }
        const getCities = this.getWeatherDataFromLocalStorage();
        const listCont = document.querySelector(".city-list-container");
        let searchInputValue = searchInput.value.toLowerCase();
        let foundCitiesArr = getCities.filter((el)=> {
            const caseTrans = el.cyrName.toLowerCase();
            // if(key!='') {
            //     return caseTrans.indexOf(key) !== -1;
            // }
            return caseTrans.indexOf(searchInputValue) !== -1;
            
        })
        
        // console.log(foundCitiesArr);    
        listCont.innerHTML = "";
        foundCitiesArr.forEach(el => {
        
            const result = document.createElement('li');
            result.setAttribute("class", "city");
            if(el.isActive) {
                const activeCityHTML =`<li class="city active-city"><span class = "active-city-icon"></span>${el.cyrName}</li>`;
                listCont.insertAdjacentHTML('afterbegin', activeCityHTML);
            }
            const actCity = document.querySelector(".active-city");
            if(actCity && el.cyrName === actCity.textContent) {
                result.remove();
            }
            else {
                result.textContent = el.cyrName;
                listCont.appendChild(result);
            }
            
                    
        });
        
    }

    changeActiveCity() {
        this.citiesData = this.getWeatherDataFromLocalStorage();
        this.cityCont = document.querySelector(".city-list-container");
        this.cityCont.addEventListener("click", (ev)=>{
            if(ev.target.classList.contains("city")) {
                const selectedCity = ev.target.textContent;
            this.citiesData.forEach(el => {
                if(el.cyrName === selectedCity) {
                    el.isActive = true;
                }
                else {
                    el.isActive = false;
                }
            })
            this.searchCityInput = document.getElementById("input-city");
            this.searchCityInput.value = selectedCity;
            this.setWeatherDataToLocalStorage(this.citiesData);
            this.searchCity(this.searchCityInput);
            this.renderWeatherData(selectedCity);
            }
            
        
        })
        
    }

    getActiveCity() {
        let citiesData = [];
        let activeCity = '';
        if(localStorage.getItem("WEATHER-DATA")) {
            citiesData = this.getWeatherDataFromLocalStorage();
            activeCity = citiesData.find(el => el.isActive === true);
            return activeCity.cyrName;
        }
        else {
            citiesData = this.weatherCities;
            activeCity = citiesData.find(el => el.isActive === true);
            console.log(activeCity);
            this.setWeatherDataToLocalStorage(this.weatherCities);
            return activeCity.cyrName;
            console.log(activeCity);
        }
        
    }

    renderWeatherData(activeCity) {
        this.cityNameBlock = document.querySelector(".city");
        this.tempValueBlock = document.querySelector(".temp");
        this.weatherIconBlock = document.querySelector(".weather-icon");
        this.cityNameBlock.textContent = activeCity;
        this.cityList = this.getWeatherDataFromLocalStorage();
        const cityEl = this.cityList.find(el => el.cyrName === activeCity);
        const cityId = cityEl.id;
        fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=32efaa158ae7df320c4702c6122cda73`)
            .then((resp)=>{return resp.json()})
            .then((data) => {
                // console.log(data);
                const tempValue = Math.round((data.main.temp)-273);
                this.tempValueBlock.innerHTML = tempValue>0 ? `+${tempValue}&deg;C` : `${tempValue}&deg;C`;
                const getIcon = this.weatherIcons.find(el => el.icon === data.weather[0].icon);
                this.weatherIconBlock.setAttribute("src", `${getIcon.path}`);
                return data;
            })
        .catch(() => {
            console.log('connection error');
            return false;
        })

        
        

    }

    getWeatherByAPI(cityId) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=32efaa158ae7df320c4702c6122cda73`)
            .then((resp)=>{return resp.json()})
            .then((data) => {
                console.log(data);
                return data;
            })
        .catch(() => {
            console.log('connection error');
            return false;
        })
    }

    //LOCAL STORAGE
    setWeatherDataToLocalStorage(weatherData) {
        localStorage.setItem("WEATHER-DATA", JSON.stringify(weatherData));
        console.log('saved to LS');
    }

    getWeatherDataFromLocalStorage() {
        const weatherData = localStorage.getItem("WEATHER-DATA");
        let weatherDataArr = [];
        if(weatherData) {
            weatherDataArr = JSON.parse(weatherData);
            return weatherDataArr;
        }
        else {
            return [];
        }
    }
    
    // removeCityPopUp() {
    //     this.blockScr = document.querySelector(".popup-block-screen");
    //     const popUp = document.querySelector(".popup-window");
    //     this.blockScr.classList.remove("show-el");
    //     popUp.remove();
    // }
}

export {WeatherBlock};