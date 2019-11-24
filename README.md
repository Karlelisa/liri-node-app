# liri-node-app
LIRI BOT
In this homework assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

To retrieve the data that will power this app, you'll need to send requests using the axios package to the Bands in Town, Spotify and OMDB APIs. You'll find these Node packages crucial for your assignment.
Node-Spotify-API
Axios
You'll use Axios to grab data from the OMDB API and the Bands In Town API
Moment
DotEnv


Expected Outcomes
The LIRI Bot was designed to produce search results based on the following commands:

node liri.js concert-this
node liri.js spotify-this-song
node liri.js movie-this
node liri.js do-what-it-says

Each command produces different search results as listed below:

node liri.js concert-this “artist/band name”
Name of venue
Venue location
Date of the event in MM/DD/YYYY format
Output the data to a .txt file called log.txt.

node liri.js spotify-this-song “song/track name”
Artist
Song
Spotify song preview url
Album
Output the data to a .txt file called log.txt.

node liri.js movie-this “movie title”
Title of the movie
Year the movie came out
IMDB Rating of the movie
Country where the movie was produced
Language of the movie
Plot of the movie
Actors in the movie
Rotten Tomatoes Rating of the movie
Output the data to a .txt file called log.txt.

node liri.js do-what-it-says
Print the spotify results for “I want it that way” stored in the random.txt file

My spotify-this-song terminal screenshot:

![spotify-this-song screenshot](/images/spotify-this-song.png)


My do-what-it-says terminal screenshot:

![do-what-it-says screenshot](/images/do-what-it-says.png)