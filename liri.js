var keys = require("./keys.js"); 

var request = require('request');
var Twitter = require('twitter');
var colors = require('colors');
var spotify = require('spotify');
var fs = require('fs');



if(process.argv[2]=="movie-this"){

	if(process.argv[3] === undefined){
		var title = "Mr. Nobody";
	}
	else{
		var title = process.argv[3];
	} 

	request('http://www.omdbapi.com/?t=' +title+ '&y=&plot=short&r=json', function (error, response, body) {
	 if (!error && response.statusCode == 200) {
	   var json = JSON.parse(body);
	   console.log("Title: ".red +json.Title);
	   console.log("Year: ".red +json.Year); 
	   console.log("IMDB Rating: ".red +json.imdbRating); 
	   console.log("Country: ".red +json.Country); 
	   console.log("Language: ".red +json.Language); 
	   console.log("Plot: ".red +json.Plot);
	   console.log("Actors: ".red +json.Actors);  
	 }
	});

}
else if(process.argv[2]=="my-tweets"){

	var client = new Twitter({
	  consumer_key: keys.twitterKeys.consumer_key,
	  consumer_secret: keys.twitterKeys.consumer_secret,
	  access_token_key: keys.twitterKeys.access_token_key,
	  access_token_secret: keys.twitterKeys.access_token_secret
	});
	 
	var params = {screen_name: 'TheKarl91'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
	  if (!error) {
	    for(i=1;i<tweets.length;i++){
	    	console.log("At ".red + tweets[i].created_at.red)
	    	console.log("Aaron Tweeted: " + tweets[i].text.blue);
	    }
	  }
	});

}
else if(process.argv[2]=="spotify-this-song"){

		if(process.argv[3] === undefined){
			var song = "What's my age again?";
		}
		else{
			var song = process.argv[3];
		} 
 
		spotify.search({ type: 'track', query: song }, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    }
		 	
		    console.log("Album: ".red + data.tracks.items[0].album.name);
		    console.log("Artist: ".red + data.tracks.items[0].artists[0].name);
		    console.log("Song: ".red + data.tracks.items[0].name);
		    console.log("Preview Link: ".red + data.tracks.items[0].preview_url);
		});
}

else{

		fs.readFile('random.txt', function (err, data) {
	   		if (err) {
	       return console.error(err);
	   		}

	   		var query = data.toString();

	   		console.log(query);	
	});
}
