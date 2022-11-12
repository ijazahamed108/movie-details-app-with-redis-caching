const axios = require('axios');

// const getCacheData = async (key) =>{
//     return await new Promise((resolve, reject) => {
//         redisClient.get(key, (error, data) => {
//             error ? reject(error) : resolve(data);
//         });
//     }).then(data => {
//         return JSON.parse(data);
//     }).catch(err => {
//         console.error(err);
//     });
// }

// const setCache = async (key, value) => {
//     await new Promise((resolve, reject) => {
//         redisClient.set(key, JSON.stringify(value), (err, data) => {
//             error ? reject(error) : resolve(data);
//         });
//     }).then(data => {
//         return data;
//     }).catch(error => {
//         console.error(error);
//     });
// };

const getMovies = async (req, res) => {
    try {
        let response;
        const searchValue = req?.query?.value;
        //const cacheResults = await getCacheData(searchValue);
        // if(cacheResults){
        //     console.log("fetchec data from Cache");
        //     return  res.json(JSON.parse(cacheResults))
        // }
        // else {
            
        // }
        response = await axios.get(
            `https://www.omdbapi.com/?s=${searchValue}&apikey=33c89a65`
          );
        //  if(response){
        //     await setCache(searchValue, response.data.Search);
        //  }
          console.log("fetched data from API");
         return res.json(response.data.Search)
        
    } catch (error) {
        console.log(error);
    }
}

const getMovieDetails = async(req, res) => {
    try {
        const movieId = req?.query?.movieId;
        const response = await axios.get(
            `https://www.omdbapi.com/?i=${movieId}&apikey=33c89a65`
          );
          res.json(response.data);
    } catch(error){
        console.log(error);
    }
}

module.exports = {
    getMovies,
    getMovieDetails
}