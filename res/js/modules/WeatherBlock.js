

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
                                    <input type = "text" id = "input-city"/>
                                    <ul class = "city-list-container">

                                    </ul>
                                </div>
                            </div>`;
        this.blockScr.classList.add("show-el");
        this.parentEl.insertAdjacentHTML('afterbegin', this.popUpHTML);
        this.searchCityInput = document.getElementById("input-city");
        this.searchCityInput.addEventListener("keyup", ()=>{
            const listCont = document.querySelector(".city-list-container");
            
            let foundCitiesArr = this.weatherCities.filter((el)=> {
                const caseTrans = el.cyrName.toLowerCase();
                // if(key!='') {
                //     return caseTrans.indexOf(key) !== -1;
                // }
                return caseTrans.indexOf(key) !== -1;
                
            })
            
            listCont.innerHTML = "";
            foundCitiesArr.forEach(el => {
        
                const result = document.createElement('li');
                result.textContent = el.cyrName;
                listCont.appendChild(result);
        
        
            });
        })
        // console.log(this.weatherCities);
    }

        

    getWeather(cityId) {
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

    
    
    // removeCityPopUp() {
    //     this.blockScr = document.querySelector(".popup-block-screen");
    //     const popUp = document.querySelector(".popup-window");
    //     this.blockScr.classList.remove("show-el");
    //     popUp.remove();
    // }
}

export {WeatherBlock};