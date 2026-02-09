// Import axios for http request
const axios = require('axios');

// axios instance for API-Football
// Includes base url and authentication headers 
const soccerClient = axios.create({
    baseURL:'https://v3.football.api-sports.io',
    headers:{
        'x-rapidapi-key': process.env.API_KEY,
        'x-rapidapi-host': process.env.API_HOST

    }
})
module.exports = soccerClient
