var keys = require("./keys.js"); 

//console.log(keys); 



var request = require('request');
var Twitter = require('twitter');
var colors = require('colors');


if(process.argv[2]=="movie-this"){

var title = process.argv[3];

	request('http://www.omdbapi.com/?t=' +title+ '&y=&plot=short&r=json', function (error, response, body) {
	 if (!error && response.statusCode == 200) {
	   var json = JSON.parse(body);
	   console.log("Title: " +json.Title);
	   console.log("Year: " +json.Year); 
	   console.log("IMDB Rating: " +json.imdbRating); 
	   console.log("Country: " +json.Country); 
	   console.log("Language: " +json.Language); 
	   console.log("Plot: " +json.Plot);
	   console.log("Actors: " +json.Actors);  
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
			    	console.log("TWEET #".red +[i] + ":".red + tweets[i].created_at.red)
			    	console.log(tweets[i].text.blue);
			    }
			  }
			});

};
