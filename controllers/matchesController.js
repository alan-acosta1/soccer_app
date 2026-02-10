const soccerClient = require('../config/api.js');
const myCache = require('../config/cache.js');

exports.getLiveMatches = async(req, res) =>{
    try{
        // checks if live matches data is in cache
        const cacheData = myCache.get('live-matches')
        // returns the data if the cached data exists.basically saving the api call
        if(cacheData){
            res.json(cacheData)
            return;
        }
        // fetches the live matches from the API if no cache is found
        const response = await soccerClient.get('/fixtures', {params:{live: 'all'}});

        const matches = response.data.response // extracts the matches from api response

        myCache.set('live-matches',matches) // stores in cache for 60 seconds

        res.json(matches) // sends the data back to user
        

    } catch(err){
        console.error("Can not fetch live matches",error.message)
        res.status(500).json({error:'Failed to fetch live matches'})
    };
}
exports.getMatchesByDate = async(req,res) =>{
    try{
        // Extracts the date feom the URL parameters
        const date = req.params.date;

        // created a unique key for the date
        const cacheKey = `matches-${date}`

        // checks if the matches for this date are in cache
        const cacheData = myCache.get(cacheKey)
        if (cacheData){
          res.json(cacheData)
          return;  
        }
        // gets maches for this date if the cache is not found
        const response = await soccerClient.get('/fixtures',{params:{date:date}})
        const matches = response.data.response // extracts the matches from api response
        myCache.set(cacheKey,matches) // adds it to cache
        res.json(matches) // return the data to user

    }catch(error){
        console.error("Can not fetch date",error.message)
        res.status(500).json({error:'Failed to fetch date'})
     }

}
exports.getMatchesByLeague = async(req,res) =>{
    try{
        // Extract the league ID from the url parameters 
        const leagueId = req.params.leagueId

        // Create a unique cache key 
        const cacheKey = `league-${leagueId}`

        // Check if matches for this leauge are in the cache
        const cacheData = myCache.get(cacheKey)

        // if cache data exists, return it
        if(cacheData){
            res.json(cacheData)
            return;
        }
        // Fetch matches for the league if no cache found
        const response = await soccerClient.get('/fixtures',{params:{league: leagueId}})

        // extracts the matches array from the API response
        const matches = response.data.response

        //Stores matches in cache
        myCache.set(cacheKey,matches)
        res.json(matches)
    
     // error logging   
    }catch(error){
        console.error("Can not fetch league",error.message)
        res.status(500).json({error:'Failed to fetch league'})

    }

}