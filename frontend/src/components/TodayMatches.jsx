import { useEffect, useState } from "react";
import {getMatchesByDate} from '../services/api'

function TodayMatches(){
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMatches = async () =>{
            try{
                //const today = new Date().toLocaleDateString('en-CA');
                const today = '2026-03-12';
                const data = await getMatchesByDate(today);
                console.log('Date:', today);
                console.log('Data received:', data);
                console.log('Number of matches:', data?.length);
                setMatches(data || []);
                setLoading(false);
            }catch (error){
                console.error('Error:',error);
                setMatches([]);
                setLoading(false);
            }
        }
        fetchMatches();
    },[])
    
    if(loading){
        return <div className="text-center p-8">Loading</div>;
    }
    
    const topLeagueIds = [39, 140, 135, 78, 61, 2, 3];


    const groupedMatches = matches.reduce((acc, match) => {
        const leagueId = match.league.id;
        if (!acc[leagueId]) {
            acc[leagueId] = {
                league: match.league,
                matches: []
            };
        }
        acc[leagueId].matches.push(match);
        return acc;
    }, {});


    const topLeagues = [];
    const otherLeagues = [];

    Object.values(groupedMatches).forEach(group => {
        if (topLeagueIds.includes(group.league.id)) {
            topLeagues.push(group);
        } else {
            otherLeagues.push(group);
        }
    });


    topLeagues.sort((a, b) => {
        return topLeagueIds.indexOf(a.league.id) - topLeagueIds.indexOf(b.league.id);
    });


    const sortedLeagues = [...topLeagues, ...otherLeagues];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Today's Matches</h2>
            {matches.length === 0 ? (
                <p className="text-center text-gray-500">No matches today</p>
            ) : (
                <div className="space-y-8">
                    {sortedLeagues.map(group => (
                        <div key={group.league.id}>
                            {/* League Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <img 
                                    src={group.league.logo} 
                                    alt={group.league.name}
                                    className="w-8 h-8 object-contain"
                                />
                                <h3 className="text-xl font-bold">{group.league.name}</h3>
                                
                            </div>
                        
                            {/* Matches Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {group.matches.map(match => (
                                    <div key={match.fixture.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
                                        <div className="bg-blue-500 text-white text-center py-2 px-4 text-sm font-semibold">
                                        {match.fixture.status.long}
                                    </div>
                                    
                                    <div className="p-6">
                                        <div className="flex justify-between items-center gap-4">
                                            <div className="flex-1 text-center">
                                                <p className="font-bold text-gray-800">{match.teams.home.name}</p>
                                            </div>
                                            
                                            <div className="text-3xl font-bold text-gray-900">
                                                {match.goals.home} - {match.goals.away}
                                            </div>
                                            
                                            <div className="flex-1 text-center">
                                                <p className="font-bold text-gray-800">{match.teams.away.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
    );
}
export default TodayMatches;
    