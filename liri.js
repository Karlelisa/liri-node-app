require("dotenv").config();
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const axios = require('axios');
const moment = require('moment');
let omdbKey = keys.omdb.api_key;
//let omdb = require('omdb');
let fs = require('fs');


console.log(process.argv)

let argOne = process.argv[2];
let argTwo = process.argv[3];
//let argThree = process.argv[4];

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
} else if (argOne === "do-what-it-says") {
    console.log(argOne)
    doWhatItSays();
};


// 1.) Bands In Town: node liri.js concert-this <artist/band name here>
function concert(artist) {


    //slet artist = userInput;
    //console.log(artist);
    let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    console.log(queryURL);

    axios.get(queryURL).then(
            function (response) {
                // let results = response.data

                // for (let i = 0; i < results.length; i++) {
                // console.log("Venue Name: " + results.venue.name);
                // console.log("Venue Location: " + results.venue.city);
                // let eventDate = moment(results.datetime).format('MM/DD/YYYY');
                // console.log("Date of the Event:", eventDate);

                console.log("Venue Name: ", response.data[0].venue.name);
                console.log("Venue Location: ", response.data[0].venue.city);
                let eventDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
                console.log("Date of the Event:", eventDate);
                // console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));
                // }

            })

        .catch(function (error) {
            console.log(error);
        });
}



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

// 2.) Spotify: "spotify-this-song"
function music() {
    console.log(argOne)

    let divider = "\n------------------------------------------------------------\n\n";

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

                fs.appendFile("log.txt", "\nArtist(s): " + songData.artists[0].name + "\nSong: " + songData.name + "\nPreview URL: " + songData.preview_url + "\nAlbum: " + songData.album.name + divider, function (err) {


                    //If an error was experienced we will log it.
                    if (err) {
                        console.log(err);
                    }

                    //If no error is experienced, we'll log the phrase "Content Added" to our node console.
                    else {
                        console.log("Content Added!");
                    }

                });
            }
        } else if (songName === "") {
            songName = "I Saw the Sign";
        }


    });

};


// fs.appendFile("log.txt", "Artist(s): " + songData.artists[0].name + "\nSong: " + songData.name + "\nPreview URL: " + songData.preview_url + "\nAlbum: " + songData.album.name, function (err) {


// If an error was experienced we will log it.
// if (err) {
//     console.log(err);
// }

// If no error is experienced, we'll log the phrase "Content Added" to our node console.
//     else {
//         console.log("Content Added!");
//     }

// });


// 3.) OMDB - Movies - node liri.js movie-this '<movie name here>'
// Cited: https://harvard.bootcampcontent.com/Harvard-Coding-Boot-Camp/hu-cam-fsf-pt-09-2019-u-c/blob/master/Week_10/01-Activities/18-OMDB_Axios_Students/Solved/levelOneOmdbInteractive.js
function movie() {


    let movieName = "";

    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (let i = 2; i < argOne.length; i++) {

        if (i > 2 && i < argOne.length) {
            movieName = movieName + "+" + argOne[i];
        } else {
            movieName += argOne[i];

        }
    }


    let queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + omdbKey;
    //let queryURL = "http://www.omdbapi.com/?i=" + movieName + "&apikey=" + omdbKey;
    //let queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    //let queryURL = "http://www.omdbapi.com/?i=tt3896198&apikey=717ab1cf=" + movieName


    console.log(queryURL);


    axios.get(queryURL).then(
            function (response) {
                //console.log("Release Year: " + response.data.Year);
                //* Title of the movie.
                console.log("Title: " + response.data.Title);
                //* Year the movie came out.
                console.log("Year: " + response.data.Year);
                // * IMDB Rating of the movie.
                console.log("Rated: " + response.data.Rated);
                //* Country where the movie was produced.
                console.log("Country: " + response.data.Country);
                //* Language of the movie.
                console.log("Language: " + response.data.Language);
                // * Plot of the movie.
                console.log("Plot: " + response.data.Plot);
                // * Actors in the movie.
                console.log("Actors: " + response.data.Actors);
                // * Rotten Tomatoes Rating of the movie.
                console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);

            })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                //that falls out of the range of 2xx
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
                //Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);


            if (movieName === "Mr. Nobody") {
                console.log("-----------------------");
                console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                console.log("It's on Netflix!");

            }
        });

};


// 4.) node liri.js do-what-it-says
function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        let output = data.split(",");
        for (let i = 0; i < output.length; i++) {
            console.log(output[i]);
        }
    });
};