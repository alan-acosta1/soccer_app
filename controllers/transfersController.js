const soccerClient = require('../config/api.js');
const myCache = require('../config/cache.js');

exports.getLatestTransfers = async(req,res) =>{
    try{
        const leagueId = req.query.leagueId;
        const cacheKey = leagueId ? `latest-transfers-${leagueId}` : 'latest-transfers';
        const cacheData = myCache.get(cacheKey);
        if(cacheData){
            res.json(cacheData);
            return;
        }
        const params = leagueId ? { league: leagueId } : {};
        const response = await soccerClient.get('/transfers',{params:params});
        const latestTransfers = response.data.response;
        myCache.set(cacheKey,latestTransfers,1800);
        res.json(latestTransfers);
    }catch(error){
        console.error('Can not fetch latest transfer',error.message);
        res.status(500).json({error:'Can not fetch latest transfer'});

    }
}
exports.getPlayerTransfers = async(req,res) => {
    try{
        const playerId = req.params.playerId;
        const cacheKey = `player-transfer-${playerId}`;
        const cacheData = myCache.get(cacheKey);
        if(cacheData){
            res.json(cacheData);
            return;
        }
        const response = await soccerClient.get('/transfers',{params:{player:playerId}});
        const playerTransfer = response.data.response;
        myCache.set(cacheKey,playerTransfer,3600);
        res.json(playerTransfer);

    }catch(error){
        console.error('Can not fetch player transfer history',error.message);
        res.status(500).json({error:'Can not fetch player transfer history'})

    }
}