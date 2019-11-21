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


function music() {
    console.log(argOne)

    const spotify = new Spotify(keys.spotify);

    spotify.search({
        type: 'track',
        query: argTwo
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
        console.log(data.tracks.items);
    });
};