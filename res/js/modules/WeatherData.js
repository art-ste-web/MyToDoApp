
class WeatherData {
    constructor() {

    }
    getCitiesList() {
        this.weatherCities = [
            {   
                id: '689558',
                name: 'Vinnytsia',
                cyrName: 'Винница',
                isActive: false
            },
            {
                id: '709930',
                name: 'Dnipro',
                cyrName: 'Днепр',
                isActive: true
            },
            {
                id: '709717',
                name: 'Donetsk',
                cyrName: 'Донецк',
                isActive: false
            },
            {
                id: '686967',
                name: 'Zhytomyr',
                cyrName: 'Житомир',
                isActive: false
            },
            {
                id: '687700',
                name: 'Zaporizhia',
                cyrName: 'Запорожье',
                isActive: false
            },
            {
                id: '707471',
                name: 'Ivano-Frankivsk',
                cyrName: 'Ивано-Франковск',
                isActive: false
            },
            {
                id: '703448',
                name: 'Kyiv',
                cyrName: 'Киев',
                isActive: false
            },
            {
                id: '705812',
                name: 'Kropyvnytskyi',
                cyrName: 'Кропивницкий',
                isActive: false
            },
            {
                id: '702658',
                name: 'Luhansk',
                cyrName: 'Луганск',
                isActive: false
            },
            {
                id: '702569',
                name: 'Lutsk',
                cyrName: 'Луцк',
                isActive: false
            },
            {
                id: '702550',
                name: 'Lviv',
                cyrName: 'Львов',
                isActive: false
            },
            {
                id: '700568',
                name: 'Mykolaiv',
                cyrName: 'Николаев',
                isActive: false
            },
            {
                id: '698740',
                name: 'Odessa',
                cyrName: 'Одесса',
                isActive: false
            },
            {
                id: '696643',
                name: 'Poltava',
                cyrName: 'Полтава',
                isActive: false
            },
            {
                id: '695365',
                name: 'Rivne',
                cyrName: 'Ровно',
                isActive: false
            },
            {
                id: '693805',
                name: 'Simferopol',
                cyrName: 'Симферополь',
                isActive: false
            },
            {
                id: '692194',
                name: 'Sumy',
                cyrName: 'Сумы',
                isActive: false
            },
            {
                id: '691650',
                name: 'Ternopil',
                cyrName: 'Тернополь',
                isActive: false
            },
            {
                id: '690548',
                name: 'Uzhgorod',
                cyrName: 'Ужгород',
                isActive: false
            },
            {
                id: '706483',
                name: 'Kharkiv',
                cyrName: 'Харьков',
                isActive: false
            },
            {
                id: '706448',
                name: 'Kherson',
                cyrName: 'Херсон',
                isActive: false
            },
            {
                id: '706369',
                name: 'Khmelnytskyi',
                cyrName: 'Хмельницкий',
                isActive: false
            },
            {
                id: '710791',
                name: 'Cherkasy',
                cyrName: 'Черкассы',
                isActive: false
            },
            {
                id: '710735',
                name: 'Chernihiv',
                cyrName: 'Чернигов',
                isActive: false
            },
            {
                id: '710741',
                name: 'Chernivtsi',
                cyrName: 'Черновцы',
                isActive: false
            },
        ];
        return this.weatherCities;
    }

    getWeatherIcons() {
        this.wheatherIcons = [
            {
                description: 'clear sky day',
                icon: '01d',
                path: '../img/wheather-icons/clear-sky-day.svg'
            },
            {
                description: 'clear sky night',
                icon: '01n',
                path: '../img/wheather-icons/clear-sky-night.svg'
            },
            {
                description: 'few clouds day',
                icon: '02d',
                path: '../img/wheather-icons/few-clouds-day.svg'
            },
            {
                description: 'few clouds night',
                icon: '02n',
                path: '../img/wheather-icons/few-clouds-night.svg'
            },
            {
                description: 'scattered clouds day',
                icon: '03d',
                path: '../img/wheather-icons/scattered-clouds.svg'
            },
            {
                description: 'scattered clouds night',
                icon: '03n',
                path: '../img/wheather-icons/scattered-clouds.svg'
            },
            {
                description: 'broken clouds day',
                icon: '04d',
                path: '../img/wheather-icons/broken-clouds.svg'
            },
            {
                description: 'broken clouds night',
                icon: '04n',
                path: '../img/wheather-icons/broken-clouds.svg'
            },
            {
                description: 'shower rain day',
                icon: '09d',
                path: '../img/wheather-icons/shower-rain.svg'
            },
            {
                description: 'shower rain night',
                icon: '09n',
                path: '../img/wheather-icons/shower-rain.svg'
            },
            {
                description: 'rain day',
                icon: '10d',
                path: '../img/wheather-icons/rain-day.svg'
            },
            {
                description: 'rain night',
                icon: '10n',
                path: '../img/wheather-icons/rain-night.svg'
            },
            {
                description: 'thundershtorm day',
                icon: '11d',
                path: '../img/wheather-icons/thundershtorm.svg'
            },
            {
                description: 'thundershtorm night',
                icon: '11n',
                path: '../img/wheather-icons/thundershtorm.svg'
            },
            {
                description: 'snow day',
                icon: '13d',
                path: '../img/wheather-icons/snow.svg'
            },
            {
                description: 'snow night',
                icon: '13n',
                path: '../img/wheather-icons/snow.svg'
            },
            {
                description: 'mist day',
                icon: '50d',
                path: '../img/wheather-icons/mist.svg'
            },
            {
                description: 'mist night',
                icon: '50n',
                path: '../img/wheather-icons/mist.svg'
            }
        
        ]

        return this.wheatherIcons;
    }
}




export {WeatherData};