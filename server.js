// Imported required dependencies
const express = require('express');
const app = express();
const port = 5000;

//import middleware and route handlers
const cors = require('cors'); // enables cros-origin requests(a way to connect to the frontend)
const matchesRouter = require('./routes/matches'); //routes matches endpoint
const leaguesRouter = require('./routes/leagues'); //routes leagues endpoint

// Loads enviroment variables from .env
const dotenv = require('dotenv'); 
dotenv.config();

//Middleware setup
app.use(cors());
app.use(express.json());

//Connecting route handlers to API endpoints
app.use('/api/matches',matchesRouter);
app.use('/api/leagues',leaguesRouter);

// Test route
app.get('/',(req,res) => {
    res.json({message: 'Soccer Live API is running'});
});

// Start the server
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})