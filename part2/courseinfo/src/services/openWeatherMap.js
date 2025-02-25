import axios from 'axios'
const API_KEY = '9c33658b96dda8fe98b530a12753e7e2'

const getWeather = (city) => {
    console.log(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
}

export default { getWeather }