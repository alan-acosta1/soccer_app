const soccerClient = require('../config/api.js');
const myCache = require('../config/cache.js');

// Fetches the top scorers of a league
exports.getTopScorers = async(req,res) => {
    try{
        const leagueId = req.params.leagueId;
        const currentYear = new Date().getFullYear();
        const season = req.query.season || currentYear;
        const cacheKey = `top-scorers-${leagueId}-${season}`;
        const cacheData = myCache.get(cacheKey);
        if(cacheData){
            res.json(cacheData);
            return;
        }
        const response = await soccerClient.get('/players/topscorers',{params:{league:leagueId,season:season}});
        const topScorer = response.data.response;
        myCache.set(cacheKey,topScorer,1800);
        res.json(topScorer);
    }catch(error){
        console.error('Can not fetch top scorer',error.message);
        res.status(500).json({error:'Can not fetch top scorer'});

    }
}
// Fetches top assits of each league
exports.getTopAssists = async(req,res) => {

    try{
        const leagueId = req.params.leagueId;
        const currentYear = new Date().getFullYear();
        const season = req.query.season || currentYear;
        const cacheKey = `top-assists-${leagueId}-${season}`;
        const cacheData = myCache.get(cacheKey);
        if(cacheData){
            res.json(cacheData);
            return;
        }
        const response = await soccerClient.get('/players/topassists',{params:{league: leagueId, season:season}});
        const topAssist = response.data.response;
        myCache.set(cacheKey,topAssist,1800);
        res.json(topAssist);
    }catch(error){
        console.error('Can not fetch top assist');
        res.status(500).json({error:'Can not fetch top assist'});
    }
    
}
// fetches indivdual. player stats
exports.getPlayerStats = async(req,res) => {
    try{
        const playerId = req.params.playerId;
        const currentYear = new Date().getFullYear();
        const season = req.query.season || currentYear;
        const cacheKey = `player-stats-${playerId}-${season}`;
        const cacheData = myCache.get(cacheKey);
        if (cacheData){
            res.json(cacheData);
            return;
        }
        const response = await soccerClient.get('/players',{params:{id: playerId,season:season}});
        const playerStats = response.data.response;
        myCache.set(cacheKey,playerStats,600);
        res.json(playerStats);
    }catch(error){
        console.error('Can not fetch player stats',error.message);
        res.status(500).json({error:'Cannot fethc player stats'});

    }
}
// Fetches player stats from a match
exports.getFixturePlayers = async(req,res) => {
    try{
        const fixtureId = req.params.fixtureId;
        const cacheKey = `fixture-players-${fixtureId}`;
        const cacheData = myCache.get(cacheKey);
        if(cacheData){
            res.json(cacheData);
            return;
        }
        const response = await soccerClient.get('/fixtures/players',{params:{fixture: fixtureId}})
        const fixturePlayer = response.data.response;
        myCache.set(cacheKey,fixturePlayer,60);
        res.json(fixturePlayer);
    }catch(error){
        console.error('Can not fetch live player stats.',error.message);
        res.status(500).json({error:'Cannot fetch live player stats'});

    }
}