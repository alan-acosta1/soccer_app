import { useEffect, useState } from "react";
import { getMatchesByDate} from '../services/api'
import './TodayMatches.css'

function TodayMatches(){
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
    const fetchMathces = async () => {
        try{
        const today = new Date().toISOString().split('T')[0];
        const data = await getMatchesByDate(today);
        console.log('API Response:',data);
        console.log('First Match:',data[0])
        setMatches(data);
        setLoading(false);
        }catch(error){
            console.error('Error fetching matches',error);
            setMatches([]);
            setLoading(false);
        }
    }
    fetchMathces();
}, []);

    if (loading){ 

        return <div>Loading matches...</div>;
    }

    return (
        <div className="today-matches">
            <h2>Today's Matches</h2>
        {matches.length === 0 ? (
            <p>No matches today</p>

            ) : (
                <div className="matches-grid">
                    {matches.map(match => (
                        <div key={match.fixture.id} className="match-card">
                            <div className="match-status">{match.fixture.status.long}</div>
                            <div className="match-teams">
                                <div className="team">
                                    <span>{match.teams.home.name}</span>
                                </div>
                                <div className="score">
                                    <span>{match.goals.home} - {match.goals.away}</span>
                                </div>
                                <div className="team">
                                    <span>{match.teams.away.name}</span>
                                </div>
                            </div>
                            <div className="match-league">{match.league.name}</div>
            
                        </div>
                    ))}
                    </div>
            )}
        </div>
    );
}
export default TodayMatches;