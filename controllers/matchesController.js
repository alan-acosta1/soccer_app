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
        console.log('API Response:', response.data);
        const matches = response.data.response // extracts the matches from api response

        myCache.set('live-matches',matches) // stores in cache for 60 seconds

        res.json(matches) // sends the data back to user
        

    } catch(error){
        console.error('Error:', error.message);
        res.status(500).json({error: error.message});
    }
};
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
// Fetches the next 10 upcoming matches
exports.getUpcomingMatches = async(req,res) =>{
    try{
        const cacheData = myCache.get('upcoming-matches');
        if(cacheData){
            res.json(cacheData);
            return;
        }
        const response = await soccerClient.get('/fixtures',{params:{next:10}});
        const matches = response.data.response;
        myCache.set('upcoming-matches',matches);
        res.json(matches)

    }
    catch(error){
        console.error("Can not fetch upcoming matches",error.message);
        res.status(500).json({error:'Can not fetch upcoming matches'})
    }

}
// Fetches the teams lineup for a match
exports.getFixtureLineup = async(req,res) => {
    try{
        const fixtureId = req.params.fixtureId;
        const cacheKey = `lineup-${fixtureId}`;
        const cacheData = myCache.get(cacheKey);
        if(cacheData){
            res.json(cacheData);
            return;
        }
        const response = await soccerClient.get('/fixtures/lineups',{params:{fixture:fixtureId}});
        const lineup = response.data.response;
        myCache.set(cacheKey,lineup, 300);
        res.json(lineup);


    }catch(error){
        console.error('Can not fetch lineups',error.message);
        res.status(500).json({error:'Can not fetch lineups'})

    }
}
// Fetches real time events of a match
exports.getFixtureEvents = async(req,res) => {
    try{
        const fixtureId = req.params.fixtureId;
        const cacheKey = `events-${fixtureId}`;
        const cacheData = myCache.get(cacheKey);
        if(cacheData){
            res.json(cacheData);
            return;
        }
        const response = await soccerClient.get('/fixtures/events',{params:{fixture:fixtureId}});
        const events = response.data.response;
        myCache.set(cacheKey,events,60);
        res.json(events);

    }catch(error){
        console.error('Can not fetch events',error.message);
        res.status(500).json({error:'Can not fetch events'});

    }
}
// fetches real time statistics during a match
exports.getFixtureStats = async(req,res) => {
    try{
        const fixtureId = req.params.fixtureId;
        const cacheKey = `stats-${fixtureId}`;
        const cacheData = myCache.get(cacheKey);
        if(cacheData){
            res.json(cacheData);
            return;
        }
        const response = await soccerClient.get('/fixtures/statistics',{params:{fixture:fixtureId}});
        const stats = response.data.response;
        myCache.set(cacheKey,stats,60);
        res.json(stats);
    }catch(error){
        console.error('Can not fetch match stats',error.message);
        res.status(500).json({error:'Can not fetch match stats'});

    }

}