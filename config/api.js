// Import axios for http request
const axios = require('axios');

// axios instance for API-Football
// Includes base url and authentication headers 
const soccerClient = axios.create({
    baseURL: process.env.API_BASE_URL,
    headers:{
        'x-apisports-key': process.env.API_KEY,
        //'x-rapidapi-host': process.env.API_HOST

    }
})
module.exports = soccerClient
