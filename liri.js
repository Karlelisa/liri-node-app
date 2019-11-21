require("dotenv").config();
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");


console.log(process.argv)

let argOne = process.argv[2];
let argTwo = process.argv[3];

console.log(argOne);
console.log(argTwo);

if (argOne === "concert-this") {
    console.log(argOne)
} else if (argOne === "spotify-this-song") {
    console.log(argOne)
    music();
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
                console.log("Artist: " + songData.artists[0].name);
                //The song name
                console.log("Song: " + songData.name);
                //A preview link of the song from Spotify
                console.log("Preview URL: " + songData.preview_url);
                //The album that the song is from
                console.log("Album: " + songData.album.name);
                console.log("-----------------------");
            }
        } else {

            spotifyThisSong("The Sign");
        }



        // console.log(data);
        // console.log(data.tracks.items);
    });
};