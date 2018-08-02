// dependencies 
require("dotenv").config();



var Spotify = require("node-spotify-api");

var request = require("request");

var keys = require("./keys");

var fs = require("fs");



var spotify = new Spotify(keys.spotify);



//functions
var getArtistNames = function(artist){
	return artist.name;
};

//function for running a spotify search
var getMeSpotify = function(songName){
	if(songName === undefined){
		songName = "living on a prayer"
	}

	spotify.search(
		{
			type: "track",
			query: songName
		},
		function(error, data){
			if(error){
				console.log("An error has occured: " + error);
				return;
			}
			var songs = data.tracks.items;
			
			for (var i = 0; i < songs.length; i++) {
        	console.log(i);
        	console.log("artist(s): " + songs[i].artists.map(getArtistNames));
        	console.log("song name: " + songs[i].name);
        	console.log("preview song: " + songs[i].preview_url);
        	console.log("album: " + songs[i].album.name);
        	console.log("-----------------------------------");
   		}
	}
 );
};

var getMeMovie = function(movieName){
	if(movieName === undefined){
		movieName = "The Matrix";
	}
	var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

	request(urlHit, function(error, response, body){
		if (!error && response.statusCode === 200){
			var jsonData = JSON.parse(body)
			console.log("Title: " + jsonData.Title);
		    console.log("Year: " + jsonData.Year);
		    console.log("Rated: " + jsonData.Rated);
		    console.log("IMDB Rating: " + jsonData.imdbRating);
		    console.log("Country: " + jsonData.Country);
		    console.log("Language: " + jsonData.Language);
		    console.log("Plot: " + jsonData.Plot);
		    console.log("Actors: " + jsonData.Actors);
		    console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
		}
	})
}