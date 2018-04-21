// Declaring variables and requirements
  require("dotenv").config();  
  var keys = require('./keys.js');
  var request = require("request");
  var Twitter = require('twitter');
  var Spotify = require('node-spotify-api');
  var fs = require("fs");
  
  var userCmd = process.argv;
  var movieName = "";
  var songName ="";  
  var finalUserCmd = "";

// ======================================================================================

//logic to respond to user command
  function liriStrong(){
    switch (userCmd[2]) {
      case 'my-tweets':
        recentTweets();
        append(userCmd[2]);
        break;
      case 'spotify-this-song':
        spoti();
        append(userCmd[2],songName);
        break;
      case 'movie-this':
        movieFind();
        append(userCmd[2],movieName);
        break;
      case 'do-what-it-says':
        doIt();
        append(userCmd[2],);
        break;
      case undefined:
        console.log('Hey! Welcome to LIRI, I am here to help so try a phrase like "my-tweets", "spotify-this-song", "movie-this", or "do-what-it-says". Bye for now');
        append(userCmd[2]);
        break;
      default:
        console.log('Hey! Welcome to LIRI, I am here to help so try a phrase like "my-tweets", "spotify-this-song", "movie-this", or "do-what-it-says". Bye for now');
        append(userCmd[2]);
    }
  }
  liriStrong();
//

//twitter api call and function. this will show your last 20 tweets and when they were created at in your terminal/bash window.
  function recentTweets() {
    var client = new Twitter({
      consumer_key: keys.twitter.consumer_key,
      consumer_secret: keys.twitter.consumer_secret,
      access_token_key: keys.twitter.access_token_key,
      access_token_secret: keys.twitter.access_token_secret
    });
 
    client.get('statuses/user_timeline', function(error, tweets, response) {
      if (!error) {
        console.log(error);
      }
      console.log('You have accessed the Twitter Module.')
      console.log('Here are your last ' + tweets.length +' tweets')
      for (i=0; i<tweets.length;i++) {
        console.log(tweets[i].text + ' created at ' + (tweets[i].created_at));
      }
   });   
  }
//=============================================================================================

//spotify this song
  function spoti() {
    for (i=3; i < userCmd.length; i++){
      songName += " " + userCmd[i]
    } // loop through user commands and create the string of the song name
    var spotify = new Spotify({
      id: keys.spotify2.id,
      secret: keys.spotify2.secret
    }); 

    if (songName === "") {
      console.log(songName);
      songName = "the sign ace of base";
    }else {
     
    }
    spotify.search({ type: 'track', query: songName }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    // console.log(data.tracks.items[0]);
    console.log('<=========================================================>')
    console.log('Track Name:' + data.tracks.items[0].name);
    console.log('Track Artist:' + data.tracks.items[0].artists[0].name);
    console.log('Track URL:' + data.tracks.items[0].preview_url);
    console.log('<=========================================================>')
    });
  }
//=============================================================================================

//omdb api call and function
  function movieFind() {
    if (userCmd.length > 3){
      for (var i = 3; i < userCmd.length; i++) {
        if (i >= 4 && i < userCmd.length) {
          movieName += "+"+ userCmd[i] ;
        } else {
          movieName += userCmd[i];
        }
      }
    }else {
      movieName = 'Mr. Nobody'
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=e2f03466";
    console.log(queryUrl)
    
    request(queryUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log('You have accessed the OMDB API')
        console.log("===============================================================");
        console.log("Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value    
         + "\nRotten Toms Rating: " + JSON.parse(body).Ratings[1].Value+ "\nCountry where the Movie Was Produced: " + JSON.parse(body).Country        
         + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors);
         console.log("===============================================================");
      }
    });
  }
//=============================================================================================

//do what it says
  function doIt(){
    fs.readFile("random.txt", "utf8", function(error, data) {

      if (error) {
        return console.log(error);
      }
      // Then split it by commas (to make it more readable)
      var dataArr = data.split(",");
      userCmd[2] = dataArr[0];
      songName = dataArr[1];
      // We will then re-display the content as an array for later use.
      liriStrong();
    
    });
  }
//=============================================================================================

//append to text file
  function append(appnd,appnd2){
    fs.appendFile("log.txt", appnd + " "+ appnd2 + "\n", function(err) {

      if (err) {
        console.log(err);
      }
      else {
      }

    });
  }

//=============================================================================================