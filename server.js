// Loads enviroment variables from .env
const dotenv = require('dotenv'); 
dotenv.config();

// Imported required dependencies
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

//import middleware and route handlers
const cors = require('cors'); // enables cros-origin requests(a way to connect to the frontend)
const matchesRouter = require('./routes/matches'); //routes matches endpoint
const leaguesRouter = require('./routes/leagues'); //routes leagues endpoint
const teamsRouter = require('./routes/teams'); // routes teams endpoint
const playersRouter = require('./routes/players'); // routes players endpoints
const transfersRouter = require('./routes/transfer'); // routes transfers endpoints

//Middleware setup
app.use(cors());
app.use(express.json());

//Connecting route handlers to API endpoints
app.use('/api/matches',matchesRouter);
app.use('/api/leagues',leaguesRouter);
app.use('/api/teams',teamsRouter);
app.use('/api/players', playersRouter);
app.use('/api/transfers', transfersRouter);

// Test route
app.get('/',(req,res) => {
    res.json({message: 'Soccer Live API is running'});
});

// Start the server
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})