const express = require('express');
const redis = require('redis');

const { getMovieDetails, getMovies } = require('./controller');
const app = express();
const port = process.env.PORT || 5000;

//setting up redis connection
// redisClient = redis.createClient();
  
// (async () => {
//     await redisClient.connect();
// })();
  
// console.log("Connecting to the Redis");
  
// redisClient.on("ready", () => {
//     console.log("Connected!");
//     global
// });
  
// redisClient.on("error", (err) => {
//     console.log("Error in the Connection");
// });

app.get('/api/getMovies', getMovies);
app.get('/api/getMovieDetails', getMovieDetails);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
