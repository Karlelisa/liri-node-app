require("dotenv").config();
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const axios = require('axios');
const moment = require('moment');
let fs = require('fs');


console.log(process.argv)

let argOne = process.argv[2];
let argTwo = process.argv[3];
let argThree = process.argv[4];

console.log(argOne);
console.log(argTwo);

if (argOne === "concert-this") {
    console.log(argOne)
    concert();
} else if (argOne === "spotify-this-song") {
    console.log(argOne)
    music();
} else if (argOne === "movie-this") {
    console.log(argOne)
    movie();


    // Bands In Town - concert-this
    function concert() {
        let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        console.log(queryURL);

        axios.get(queryURL).then(
            function (bandResponse) {
                console.log("Venue: " + bandResponse.data[0].venue.name);
                console.log("City: " + bandResponse.data[0].venue.city);
                console.log(moment(bandResponse.data[0].datetime).format("MM/DD/YYYY"));
            }
        );
    };

    // function music() {
    //     console.log(argOne)

    //     const spotify = new Spotify(keys.spotify);

    //     spotify.search({
    //         type: 'track',
    //         query: argTwo
    //     }, function (err, data) {
    //         if (err) {
    //             return console.log('Error occurred: ' + err);
    //         }

    //         console.log(data);
    //         console.log(data.tracks.items);
    //     });
    // };

    // Spotify - "spotify-this-song"
    function music() {
        console.log(argOne)

        const spotify = new Spotify(keys.spotify);
        // https://www.npmjs.com/package/node-spotify-api
        spotify.search({
            type: 'track',
            query: argTwo,
            limit: 1
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            } else if (data) {
                for (let i = 0; i < data.tracks.items.length; i++) {
                    let songData = data.tracks.items[i];
                    //Artist(s) name
                    console.log("Artist(s): " + songData.artists[0].name);
                    //The song name
                    console.log("Song: " + songData.name);
                    //A preview link of the song from Spotify
                    console.log("Preview URL: " + songData.preview_url);
                    //The album that the song is from
                    console.log("Album: " + songData.album.name);
                    console.log("-----------------------");
                }
            } else {
                //******NOT WORKING. Must Fix******/
                spotifyThisSong("The Sign");
            }

            // console.log(data);
            // console.log(data.tracks.items);
        });

        // let text = process.argv[3]
        // fs.appendFile("random.txt", text, function (err) {
        //     (JSON.stringify(data, null, 2));
        // });
    };

    /* 
    let text = process.argv[3]
    fs.appendFile("log.txt", text, function (err) { */

    // If an error was experienced we will log it.
    /*   if (err) {
            console.log(err);
        }
     */
    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
    /*    else {
            console.log("Content Added!");
        }

    }); */



    fs.appendFile("log.txt", "Artist(s): " + songData.artists[0].name + "\nSong: " + songData.name + "\nPreview URL: " + songData.preview_url + "\nAlbum: " + songData.album.name, function (err) {


        // If an error was experienced we will log it.
        if (err) {
            console.log(err);
        }

        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
            console.log("Content Added!");
        }

    });


    //OMDB - Movies - node liri.js movie-this '<movie name here>'
    // Cited: https://harvard.bootcampcontent.com/Harvard-Coding-Boot-Camp/hu-cam-fsf-pt-09-2019-u-c/blob/master/Week_10/01-Activities/18-OMDB_Axios_Students/Solved/levelOneOmdbInteractive.js
    function movie() {
        var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + OMDB_API_KEY;

        axios.get(queryURL).then(
            function (movieResponse) {
                //* Title of the movie.
                console.log("Title: " + movieResponse.data.Title);
                //* Year the movie came out.
                console.log("Year: " + movieResponse.data.Year);
                // * IMDB Rating of the movie.
                console.log("Rated: " + movieResponse.data.imdbRating);
                // * Rotten Tomatoes Rating of the movie.
                console.log("Rotten Tomatoes: " + movieResponse.data.Ratings[1].Value);
                //* Country where the movie was produced.
                console.log("Country: " + movieResponse.data.Country);
                //* Language of the movie.
                console.log("Language: " + movieResponse.data.Language);
                // * Plot of the movie.
                console.log("Plot: " + movieResponse.data.Plot);
                // * Actors in the movie.
                console.log("Actors: " + movieResponse.data.Actors);
            }

            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });

            if (movie === "Mr. Nobody") {
                console.log("-----------------------");
                console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                console.log("It's on Netflix!");

            };


        };