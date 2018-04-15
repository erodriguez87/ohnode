// Declaring variables and requirements
  require("dotenv").config();  
  var keys = require('./keys.js');
  var request = require("request");
  var Twitter = require('twitter');
  var fs = require("fs");
  
  var userCmd = process.argv;
  var spotify = keys.spotify;
  var tweeted = keys.twitter;

// ======================================================================================

//logic to respond to user command
  switch (userCmd[2]) {
    case 'my-tweets':
        recentTweets();
        break;
    case 'spotify-this-song':
        spoti();
        break;
    case 'movie-this':
        movieFind();
        break;
    case 'do-what-it-says':
        doIt();
        break;
  }
//

//twitter api call and function. this will show your last 20 tweets and when they were created at in your terminal/bash window.
  function recentTweets() {
    var client = new Twitter({
      consumer_key: tweeted.consumer_key,
      consumer_secret: tweeted.consumer_secret,
      access_token_key: tweeted.access_token_key,
      access_token_secret: tweeted.access_token_secret
    });
 
    client.get('statuses/user_timeline', function(error, tweets, response) {
      if (!error) {
        console.log(error);
      }
      console.log('here are your last ' + tweets.length +' tweets')
      for (i=0; i<tweets.length;i++) {
        console.log(tweets[i].text + ' created at ' + (tweets[i].created_at));
      }
   });   
  }
//=============================================================================================

//spotify this song
function spoti() {
  var client = new Twitter({
    consumer_key: tweeted.consumer_key,
    consumer_secret: tweeted.consumer_secret,
    access_token_key: tweeted.access_token_key,
    access_token_secret: tweeted.access_token_secret
  });

  client.get('statuses/user_timeline', function(error, tweets, response) {
    if (!error) {
      console.log(error);
    }
    console.log('here are your last ' + tweets.length +' tweets')
    for (i=0; i<tweets.length;i++) {
      console.log(tweets[i].text + ' created at ' + (tweets[i].created_at));
    }
 });   
}
//=============================================================================================

//omdb api call and function
  function movieFind() {
    // Include the request npm package (Don't forget to run "npm install request" in this folder first!)
      var request = require("request");
      console.log('inside movie find')

      // Then run a request to the OMDB API with the movie specified
      request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
          console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        }
      });
  }
//