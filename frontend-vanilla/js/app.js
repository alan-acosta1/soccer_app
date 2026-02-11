// Backend API URL
const API_URL = 'http://localhost:8000';

// Fetch live matches from backend
const fetchLiveMatches = async () => {
    try {
        const response = await fetch(`${API_URL}/api/matches/live`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching matches:', error);
        return [];
    }
};

// Display matches on the page
const displayMatches = (matches) => {
    const container = document.getElementById('matches-container');

    // If no matches, show message
    if (matches.length === 0) {
        container.innerHTML = '<p>No live matches right now. Check back later!</p>';
        return;
    }

    // Build HTML for each match
    container.innerHTML = matches.map(match => `
        <div class="match-card">
            <div class="match-status">${match.fixture.status.long}</div>
            <div class="match-teams">
                <span class="team">${match.teams.home.name}</span>
                <span class="score">${match.goals.home} - ${match.goals.away}</span>
                <span class="team">${match.teams.away.name}</span>
            </div>
            <div class="match-info">
                ${match.league.name} - ${match.league.country}
            </div>
        </div>
    `).join('');
};

// Initialize the app
const init = async () => {
    const matches = await fetchLiveMatches();
    displayMatches(matches);
};

// Auto-refresh every 60 seconds
setInterval(init, 60000);

// Start the app
init();