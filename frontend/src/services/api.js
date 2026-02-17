const API_URL = 'http://localhost:8000';

export const getLiveMatches = async() => {
    const response = await fetch(`${API_URL}/api/matches/live`);
    const data = await response.json();
    return data;
}

export const getMatchesByDate = async(date) => {
    const response = await fetch(`${API_URL}/api/matches/date/${date}`);
    return response.json();
}

export const getUpcomingMatches = async() => {
    const response = await fetch(`${API_URL}/api/matches/upcoming`);
    return response.json()
}
export const getPopularLeagues = async() => {
    const response = await fetch(`${API_URL}/api/leagues/popular`);
    return response.json();
}
export const getTopScorers = async(leagueId,season) => {
    const response = await fetch(`${API_URL}/api/players/topscorers/${leagueId}?season=${season}`);
    return response.json();
}