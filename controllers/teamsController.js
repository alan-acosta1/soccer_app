const soccerClient = require('../config/api.js');
const myCache = require('../config/cache.js');
// Fetchs updated squads of a team
exports.getTeamSquad = async(req,res) => {
    
    try{
        const teamId = req.params.teamId;
        const cacheKey = `squad-${teamId}`;
        const cacheData = myCache.get(cacheKey);
        if(cacheData){
            res.json(cacheData);
            return;
        }
        const response = await soccerClient.get('/players/squads',{params:{team:teamId}});
        const squads = response.data.response;
        myCache.set(cacheKey,squads,3600);
        res.json(squads);
    }
    catch(error){
        console.error('Can not fetch team squad',error.message);
        res.status(500).json({error:'Can not fetch team squads'});

    }
}
exports.getTeamFixtures =async(req,res) => {
    try{
        const teamId = req.params.teamId;
        const currentYear = new Date().getFullYear(); //updates default season
        const season = req.query.season || currentYear; // grabs season with the current season being the default
        const cacheKey = `team-fixtures-${teamId}-${season}`;
        const cacheData = myCache.get(cacheKey);
        if(cacheData){
            res.json(cacheData);
            return;
        }
        const response = await soccerClient.get('/fixtures',{params:{team:teamId,season:season}});
        const fixtures = response.data.response;
        myCache.set(cacheKey,fixtures, 3600);
        res.json(fixtures);

    }catch(error){
        console.error("Can not fetch team's fixtures",error.message);
        res.status(500).json({error:"Can not fetch team's fixtures"});

    }
}
exports.getTeamStats = async(req,res) => {
    try{
        const teamId = req.params.teamId;
        const league = req.query.league;
        const season = req.query.season;
        const cacheKey = `team-stats-${teamId}-${league}-${season}`;
        const cacheData = myCache.get(cacheKey);
        if(cacheData){
            res.json(cacheData);
            return;
        }
        const response = await soccerClient.get('/teams/statistics',{params:{team:teamId, league:league, season:season}});
        const teamStats = response.data.response;
        myCache.set(cacheKey,teamStats,3600);
        res.json(teamStats);
    }catch(error){
        console.error('Can not fetch team stats',error.message);
        res.status(500).json({error:'Can not fetch team stats'})

    }
}
exports.getHeadtoHead = async(req,res) => {
    try{
        const teamId = req.params.teamId;
        const opponentId = req.params.opponentId;
        const cacheKey = `h2h-${teamId}-${opponentId}`;
        const cacheData = myCache.get(cacheKey);
        if(cacheData){
            res.json(cacheData);
            return;
        }
        const response = await soccerClient.get('/fixtures/headtohead',{params:{h2h:`${teamId}-${opponentId}`}});
        const headtohead = response.data.response;
        myCache.set(cacheKey,headtohead,3600);
        res.json(headtohead);
    }catch(error){
        console.error('Can not fetch headtohead',error.message);
        res.status(500).json({error:'Can not fetch headtohead'});
        

    }
}