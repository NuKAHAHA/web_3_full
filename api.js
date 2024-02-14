const axios = require('axios');
const OPENWEATHER_KEY = "79429e941903ab8242cdd151cf7e1994";
const YOUR_RAPIDAPI_KEY = "68915ed042msh2b157ff89f4020dp14b020jsn76fe01fb6da0";
const FTBLNEW_KEY = "9ca3a28ed1msh04c032d4660f787p14d241jsne5e26423507f";


async function getWeatherByCity(city) {
    let response, responseData = null;
    try {
        response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=en&appid=${OPENWEATHER_KEY}`);
        responseData = response?.data;
    } catch {
        return null;
    }

    if (!responseData) {
        return null;
    }
    
    if (responseData.cod !== 200) {
        return null;
    }

    return {
        "latitude": responseData.coord.lat,
        "longitude": responseData.coord.lon,
        "description": responseData.weather[0].description,
        "temperature": Math.floor(responseData.main.temp),
        "feels_like": responseData.main.feels_like,
        "pressure": responseData.main.pressure,
        "maximum_temperature": Math.floor(responseData.main.temp_max),
        "minimum_temperature": Math.floor(responseData.main.temp_min),
        "humidity": responseData.main.humidity,
        "wind_speed": responseData.wind.speed,
        "wind_deg": responseData.wind.deg,
        "cloudiness": responseData.clouds.all,
        "sunrise": new Date(responseData.sys.sunrise * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        "sunset": new Date(responseData.sys.sunset * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        "name"  : responseData.name,
        "country" : responseData.sys.country
    };
}

async function getLaLigaNews() {

    const options = {
        method: 'GET',
        url: 'https://football-news-aggregator-live.p.rapidapi.com/news/fourfourtwo/laliga',
        headers: {
            'X-RapidAPI-Key': '9ca3a28ed1msh04c032d4660f787p14d241jsne5e26423507f',
            'X-RapidAPI-Host': 'football-news-aggregator-live.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const responseData = response.data;

        // Проверяем, является ли responseData массивом
        if (Array.isArray(responseData)) {
            // Мы можем просто вернуть данные
            return responseData;
        } else {
            // Если responseData не является массивом, вернем null
            console.error('Received unexpected response format:', responseData);
            return null;
        }
    } catch (error) {
        console.error('Error fetching La Liga news:', error);
        return null;
    }
}


async function getTeamInfo(teamName) {
    const options = {
        method: 'GET',
        url: 'https://heisenbug-la-liga-live-scores-v1.p.rapidapi.com/api/laliga/team',
        params: { name: teamName },
        headers: {
            'X-RapidAPI-Key': YOUR_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'heisenbug-la-liga-live-scores-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error('Error fetching team info:', error);
        return null;
    }
}




module.exports = {
    getWeatherByCity, getTeamInfo, getLaLigaNews
};