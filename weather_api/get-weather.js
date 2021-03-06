const citiesArr = [
    {   
        id: '689558',
        name: 'Vinnytsia',
        cyrName: 'Винница'
    },
    {
        id: '709930',
        name: 'Dnipro',
        cyrName: 'Днепр'
    },
    {
        id: '709717',
        name: 'Donetsk',
        cyrName: 'Донецк'
    },
    {
        id: '686967',
        name: 'Zhytomyr',
        cyrName: 'Житомир'
    },
    {
        id: '687700',
        name: 'Zaporizhia',
        cyrName: 'Запорожье'
    },
    {
        id: '707471',
        name: 'Ivano-Frankivsk',
        cyrName: 'Ивано-Франковск'
    },
    {
        id: '703448',
        name: 'Kyiv',
        cyrName: 'Киев'
    },
    {
        id: '705812',
        name: 'Kropyvnytskyi',
        cyrName: 'Кропивницкий'
    },
    {
        id: '702658',
        name: 'Luhansk',
        cyrName: 'Луганск'
    },
    {
        id: '702569',
        name: 'Lutsk',
        cyrName: 'Луцк'
    },
    {
        id: '702550',
        name: 'Lviv',
        cyrName: 'Львов'
    },
    {
        id: '700568',
        name: 'Mykolaiv',
        cyrName: 'Николаев'
    },
    {
        id: '698740',
        name: 'Odessa',
        cyrName: 'Одесса'
    },
    {
        id: '696643',
        name: 'Poltava',
        cyrName: 'Полтава'
    },
    {
        id: '695365',
        name: 'Rivne',
        cyrName: 'Ровно'
    },
    {
        id: '693805',
        name: 'Simferopol',
        cyrName: 'Симферополь'
    },
    {
        id: '692194',
        name: 'Sumy',
        cyrName: 'Сумы'
    },
    {
        id: '691650',
        name: 'Ternopil',
        cyrName: 'Тернополь'
    },
    {
        id: '690548',
        name: 'Uzhgorod',
        cyrName: 'Ужгород'
    },
    {
        id: '706483',
        name: 'Kharkiv',
        cyrName: 'Харьков'
    },
    {
        id: '706448',
        name: 'Kherson',
        cyrName: 'Херсон'
    },
    {
        id: '706369',
        name: 'Khmelnytskyi',
        cyrName: 'Хмельницкий'
    },
    {
        id: '710791',
        name: 'Cherkasy',
        cyrName: 'Черкассы'
    },
    {
        id: '710735',
        name: 'Chernihiv',
        cyrName: 'Чернигов'
    },
    {
        id: '710741',
        name: 'Chernivtsi',
        cyrName: 'Черновцы'
    },
];

const wheatherIcons = [
    {
        description: 'clear sky day',
        icon: '01d',
        path: 'wheather-icons/clear-sky-day.svg'
    },
    {
        description: 'clear sky night',
        icon: '01n',
        path: 'wheather-icons/clear-sky-night.svg'
    },
    {
        description: 'few clouds day',
        icon: '02d',
        path: 'wheather-icons/few-clouds-day.svg'
    },
    {
        description: 'few clouds night',
        icon: '02n',
        path: 'wheather-icons/few-clouds-night.svg'
    },
    {
        description: 'scattered clouds day',
        icon: '03d',
        path: 'wheather-icons/scattered-clouds.svg'
    },
    {
        description: 'scattered clouds night',
        icon: '03n',
        path: 'wheather-icons/scattered-clouds.svg'
    },
    {
        description: 'broken clouds day',
        icon: '04d',
        path: 'wheather-icons/broken-clouds.svg'
    },
    {
        description: 'broken clouds night',
        icon: '04n',
        path: 'wheather-icons/broken-clouds.svg'
    },
    {
        description: 'shower rain day',
        icon: '09d',
        path: 'wheather-icons/shower-rain.svg'
    },
    {
        description: 'shower rain night',
        icon: '09n',
        path: 'wheather-icons/shower-rain.svg'
    },
    {
        description: 'rain day',
        icon: '10d',
        path: 'wheather-icons/rain-day.svg'
    },
    {
        description: 'rain night',
        icon: '10n',
        path: 'wheather-icons/rain-night.svg'
    },
    {
        description: 'thundershtorm day',
        icon: '11d',
        path: 'wheather-icons/thundershtorm.svg'
    },
    {
        description: 'thundershtorm night',
        icon: '11n',
        path: 'wheather-icons/thundershtorm.svg'
    },
    {
        description: 'snow day',
        icon: '13d',
        path: 'wheather-icons/snow.svg'
    },
    {
        description: 'snow night',
        icon: '13n',
        path: 'wheather-icons/snow.svg'
    },
    {
        description: 'mist day',
        icon: '50d',
        path: 'wheather-icons/mist.svg'
    },
    {
        description: 'mist night',
        icon: '50n',
        path: 'wheather-icons/mist.svg'
    }

]

const cityId = '703448';
fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=32efaa158ae7df320c4702c6122cda73`)
    .then((resp)=>{return resp.json()})
    .then((data) => {console.log(data)})
.catch(() => {
    console.log('error');
})