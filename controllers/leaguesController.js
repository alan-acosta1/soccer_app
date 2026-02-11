const soccerClient = require('../config/api.js');
const myCache = require('../config/cache.js');

// Fetches top 7 popular leagues from API-Football
// Checks the cache first if the data exists if not then we fetch from the API
exports.getPopularLeagues = async(req,res) => {
    try{
        const cacheData = myCache.get('popular-leagues');
        if(cacheData){
            res.json(cacheData)
            return;
        }
        const popularLeagueId = [39,140,135,78,61,2,3];
        const leaguesData = [];
        for (const leagueID of popularLeagueId){
            const response = await soccerClient.get('/leagues',{params:{id:leagueID}});
            const league = response.data.response[0];
            leaguesData.push(league) 
        }

        myCache.set('popular-leagues',leaguesData);
        res.json(leaguesData);

    }catch(error){
        console.error('Can not fetch league',error.message);
        res.status(500).json({error:'Failed to fetch leagues'});
    }

}
//Fetches league standings for a specific league using the leagueID
// Checks cache first, fetches from API
exports.getLeagueStandings = async(req,res) =>{
    try{
        const leagueId = req.params.leagueId
        const cacheKey = `standings-${leagueId}`;
        const cacheData = myCache.get(cacheKey);
        if(cacheData){
            res.json(cacheData);
            return;
        }
        const response = await soccerClient.get('/standings',{params:{league: leagueId}});
        const league = response.data.response
        myCache.set(cacheKey,league);
        res.json(league);

    }
    catch(error){
        console.error('Can not fetch league standings',error.message);
        res.status(500).json({error:'Can not fetch league standings'})
    }
}
// Fetches all leagues to add a leagues page in the web app
exports.getAllLeagues = async(req,res) =>{
    try{
        const cacheData = myCache.get('all-leagues');
        if(cacheData){
            res.json(cacheData);
            return;
        }
        const response = await soccerClient.get('/leagues');
        const league = response.data.response;
        myCache.set('all-leagues',league,3600);
        res.json(league);



    }catch(error){
        console.error('Can not fecth all leagues',error.message)
        res.status(500).json({error:'Can not fetch all leagues'})

    }
}