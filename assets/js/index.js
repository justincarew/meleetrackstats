//START IN TERMINAL WITH "npm run dev" NOT with "node index.js"
// LOOK ABOVE TO START


path = require('path');
const sqlite3 = require('sqlite3');
const express = require('express');
const fs = require('fs');
const countries = require("i18n-iso-countries");
const app = express(); //express is the framework we will use to facilitate communication between the frontend (HTML) and backend (Node JS)
const port = 5500;

function getMainCharacterFromString(row){
      if((typeof row !== 'undefined' && row.length != 2)){
        if(row.charAt(15) !== '\\'){
          let indexOfMaxNum = 0;
          let mostPlayedCharacter = "";
          let max=0;
        for(let i=0; row.charAt(i) != "}"; i++){
          //entire loop's purpose is to iterate through the string, find the most times a character has been played, and return the most played character name
          if((!isNaN(parseInt(row.charAt(i))))){ //if the character at index i is a number
            let indexOfNumStart = i;
            let indexOfNumEnd = i+1;
            let tempString = "";
            while(!isNaN(parseInt(row.charAt(indexOfNumEnd)))){ //finds last index of the number
              indexOfNumEnd=indexOfNumEnd+1;
            }
            for(; indexOfNumStart<indexOfNumEnd; indexOfNumStart++){
              tempString = tempString + row.charAt(indexOfNumStart);
            }
            if (parseInt(tempString)>max){
              max = parseInt(tempString);
              indexOfMaxNum = i;
            }
          }
          //console.log(row.charAt(i));
        }
        while(row.charAt(indexOfMaxNum) != "/"){
          if(row.charAt(indexOfMaxNum).match(/[a-z]/i)){
          mostPlayedCharacter =  row.charAt(indexOfMaxNum) + mostPlayedCharacter;
          }
          indexOfMaxNum = indexOfMaxNum - 1;
        }
        return mostPlayedCharacter;
      }
        }
        //if the characters value is defined and not empty
        
    else{
      return "none";
    }
}

//app.set('view engine', 'ejs');
app.use(express.static('public')); //will deliver communications through the public folder in the directory, anything in here should be wholly available to the user
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => { // '/:dynamic' will make it so that the space after url/___ is a parameter where a variable can be passed, this can be the player's unique player_id to prevent duplicates, but the search on the frontend would be searching for their tag which would have duplicates and would be disambiguated with other information like location/mains
  res.status(200).json({info: 'received'});
});

app.get('/stats/', (req, res) => { // '/:dynamic' will make it so that the space after url/___ is a parameter where a variable can be passed, this can be the player's unique player_id to prevent duplicates, but the search on the frontend would be searching for their tag which would have duplicates and would be disambiguated with other information like location/mains
  res.status(200).json({info: 'received'});
});

app.post('/', (req, res) => { // '/:dynamic' will make it so that the space after url/___ is a parameter where a variable can be passed, this can be the player's unique player_id to prevent duplicates, but the search on the frontend would be searching for their tag which would have duplicates and would be disambiguated with other information like location/mains
  const { parcel } = req.body;
  if (!parcel){
    return res.status(400).send({status: 'failed'})
  }
  //res.status(200).send({status: 'received'});
  let query = JSON.stringify(parcel+"%");
  var searchSuggestionTags = [];
  var searchSuggestionIDs = [];
  sql = "SELECT player_id, characters, tag FROM players WHERE tag LIKE "+query+" AND tag IS NOT player_id LIMIT "+5;
  //console.log(sql);
  console.log(parcel);
    db.each(sql, [], (err, row) => { 
      if (err) return console.error(err.message);
      var max = 0;
      var tempString = "";
      // console.table(row);
      //console.log(row);
      searchSuggestionTags.push(row);
    //console.log("");
    //console.log(""+(JSON.stringify(searchSuggestionTags)));
    }, () => {
      /*res.status(200).json({
        status: 'received',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          searchSuggestions: JSON.stringify(searchSuggestionTags)
        }
      });*/
      let searchSuggestionsTagsArray = [];
      for(let i=0; i<=4; i++){
        if (typeof searchSuggestionTags[i] != 'undefined'){
          searchSuggestionsTagsArray.push(searchSuggestionTags[i].tag);
          searchSuggestionsTagsArray.push(getMainCharacterFromString(searchSuggestionTags[i].characters));
          searchSuggestionsTagsArray.push(searchSuggestionTags[i].player_id);
          // an array is sent where each player result occupies three elements: tag, main, player_id.
          // example for searching Mang0: 
          // ["Mang0","falco","1000","Mang0jr","none","154619","mang0_fan420","marth","2197430","Mang0 but skinny & ugly","kirby","2449736","Mang0 fan","none","1340702"]
        }
        else{
          searchSuggestionsTagsArray[(i+1)*3-1] = '';
        }
      }
      console.log(JSON.stringify(searchSuggestionsTagsArray));
      res.write(JSON.stringify(searchSuggestionsTagsArray));
      res.end();
    });
    
  });


app.get('/stats/:playerID', (req, res) => { // '/:dynamic' will make it so that the space after url/___ is a parameter where a variable can be passed, this can be the player's unique player_id to prevent duplicates, but the search on the frontend would be searching for their tag which would have duplicates and would be disambiguated with other information like location/mains
  const { parcel } = req.body;
  res.sendFile(path.join(__dirname, '../../public/stats.html'), null, function(err){
    if (err){
      res.writeHead(404);
      res.send('Page not found');
    }
  });
});
  
app.post('/stats/:playerID', (req, res) => { // '/:dynamic' will make it so that the space after url/___ is a parameter where a variable can be passed, this can be the player's unique player_id to prevent duplicates, but the search on the frontend would be searching for their tag which would have duplicates and would be disambiguated with other information like location/mains
  const { parcel } = req.body;
  console.log(parcel);
  const specialNote = {1556238: "The creator of this website. Follow my socials!", 
  53498: "Best friend of the creator by day, expert Rutgers Fox by night.", 
  768215: "Best friend of the creator by day, professional beatmania IIDX player by night.",
  893942: "Best friend of the creator by day, Godscokingscochadscofortnitescochungusmangod by night.",
  542693: "The straightest man of all time.",
  65777: "RIP 🕊️🐔",
  893866: "Big chungus.",
  881842: "Former Rutgers Melee father who loves undercooked pork. Don't be afraid to ask about his tattoo!",
  55591: "Former father of Rutgers Melee. Not to be confused with Future Trunks.",
  267849: "wordle 233 4/6. idk how u guys make the blocks mad fast LOL took me forever to type that.",
  245096: "Greatest G&W to touch the sticks.",
  2497869: "Named a Lvl 1 CPU and entered with them in a doubles bracket.",
  286021: "Infamous love-maker.",
  1195681: "Convinced Cody Schwab to come to Scarlet Classic.",
  1664914: "USA🇺🇸! USA🇺🇸! USA🇺🇸!",
  2699479: "Current father of Rutgers Melee.",
  6544: "woo magi",
  16250: "The God of Rutgers Melee.",
  519221: "Hey big spender!",
  45444: "Big Kazington.",
  233850: "And when we needed him most, he vanished.",
  15634: "Doctor 🤓",
  709843: "Honorary Guyanese, defeated a crew by himself (at least) once.",
  1003: "Has probably DM'd you about his Metafy.",
  1016: "Add his game, Kinetic Break All Limits, to your Steam wishlist!",
  1000: "The Kid, The GOAT, The Buster.",
  1004: "A god amongst men. Enter Coinbox!",
  6189: "A former god.",
  1002: "A former god.",
  4465: "Godslayer and master of 25 games.",
  16342: "The first Pikachu to win a supermajor.",
  1021: "The first Yoshi to win a supermajor.",
  16105: "Greatest Starbucks employee to ever play the game.",
  19554: "HE QUIT LAW SCHOOL FOR THIS!",
  371053: "You can probably find him at the Clam kicking it with Peter and Quag.",
  1726678: "Fastest Falcon in the West. (or... East)",
  50259 : "Probably the best player to play the game. Also 7ft tall.",
  2566899: "hey is there a limit to how much tuna you can eat?",
  5080: "I'm moking I'm doking!",
  3201665: "A dad, with a thuggish past?",
  519779: "Cool Sheik cat enjoyer.",
  26153: "Melee Illuminati member sent from NJ SSBM.",
  159216: "One tall phobbed out man.",
  213039: "Ultimate player.",
  508804: "Humongous delicious behind the camera.",
  27491: "Shadow leader of RU weeklies, defeater of Zain."
  }
  sql = "SELECT * FROM players WHERE player_id IS "+req.params.playerID;
  playerInformation = "";
  playerInformation.sets= new Array(1);
    db.get(sql, [], (err, row) => {
      if (err){
        res.writeHead(404);
        res.write('User not found');
        res.end();
        return;
      } 
      playerInformation = row;
      if(playerInformation.country != null && playerInformation.country.length > 2){
        playerInformation.countryCode=countries.getAlpha2Code(playerInformation.country, "en"); // converts country information to an image of its respective flag
      }
      else{
        playerInformation.countryCode = playerInformation.country;
      }
      db.get("SELECT COUNT(*) FROM sets WHERE p1_id IS "+req.params.playerID+" OR p2_id IS "+req.params.playerID, [], (err, setsPlayed) => {
        if (err) return console.error(err.message);
        setsPlayed = Object.values(setsPlayed);
        playerInformation.setsPlayedCount = parseInt(setsPlayed[0]);
        onlineTournamentsQuery = "SELECT COUNT(*) FROM tournament_info WHERE ";
        totalTournamentsQuery = "SELECT COUNT(*) FROM tournament_info WHERE ";

        var i = 0;
        while(JSON.parse(row.placings)[i] != undefined || JSON.parse(row.placings)[i] != null){
          if(JSON.parse(row.placings)[i+1] != undefined){
            onlineTournamentsQuery+="(key LIKE '%"+JSON.parse(row.placings)[i].key+"%' AND online IS 1) OR ";
           }
           else{
            onlineTournamentsQuery+="(key LIKE '%"+JSON.parse(row.placings)[i].key+"%' AND online IS 1)";
           }
           i=i+1;
        }
        i=0;
        while(JSON.parse(row.placings)[i] != undefined || JSON.parse(row.placings)[i] != null){
          if(JSON.parse(row.placings)[i+1] != undefined){
            totalTournamentsQuery+="(key LIKE '%"+JSON.parse(row.placings)[i].key+"%') OR ";
           }
           else{
            totalTournamentsQuery+="(key LIKE '%"+JSON.parse(row.placings)[i].key+"%')";
           }
           i=i+1;
        }
        db.get("SELECT COUNT(*) FROM sets WHERE winner_id IS "+req.params.playerID, [], (err, setsWon) => {
          if (err) return console.error(err.message);
          db.get(onlineTournamentsQuery, [], (err, onlineTournaments) => {
            if (err) return console.error(err.message);
            db.get(totalTournamentsQuery, [], (err, totalTournaments) => {
              if (err) return console.error(err.message);
              if (playerInformation.player_id != undefined && specialNote[playerInformation.player_id] !== undefined){
                console.log("********Special person!*********")
                playerInformation.special = specialNote[playerInformation.player_id];
              }
                setsWon = Object.values(setsWon);
                onlineTournaments = Object.values(onlineTournaments);
                totalTournaments = Object.values(totalTournaments);
                playerInformation.onlineTournamentsCount = parseInt(onlineTournaments[0]);
                playerInformation.totalTournamentsCount = parseInt(totalTournaments[0]);
                playerInformation.onlineTournamentsRate = (playerInformation.onlineTournamentsCount*100.00/playerInformation.totalTournamentsCount).toFixed(2);
                playerInformation.setsWonCount = parseInt(setsWon[0]);
                playerInformation.setsWinRate = (playerInformation.setsWonCount*100.00/playerInformation.setsPlayedCount).toFixed(2);
                console.log(playerInformation);
                res.write(JSON.stringify(playerInformation));
                res.end();
            });
          });
        });        
      });
      // playerInformation = JSON.stringify(row);
      // console.log(JSON.stringify(row));
    });
  });

  app.get('/search/:searchText', (req, res) => { // '/:dynamic' will make it so that the space after url/___ is a parameter where a variable can be passed, this can be the player's unique player_id to prevent duplicates, but the search on the frontend would be searching for their tag which would have duplicates and would be disambiguated with other information like location/mains
    res.sendFile(path.join(__dirname, '../../public/search.html'), null, function(err){
      if (err){
        res.writeHead(404);
        res.send('Page not found');
      }
    });
  });

  app.post('/search/:searchText', (req, res) => { // '/:dynamic' will make it so that the space after url/___ is a parameter where a variable can be passed, this can be the player's unique player_id to prevent duplicates, but the search on the frontend would be searching for their tag which would have duplicates and would be disambiguated with other information like location/mains
    const { parcel } = req.body;
    if (!parcel){
      return res.status(400).send({status: 'failed'})
    }
    let query = req.params.searchText;
    searchResults = {};
    searchResults.tag = [];
    searchResults.playerID = [];
    searchResults.characters = [];
    db.each("SELECT player_id, characters, tag FROM players WHERE tag LIKE '"+query+"%' AND tag IS NOT player_id LIMIT "+100, [], (err, row) => { 
      if (err) return console.error(err.message);
      var max = 0;
      var tempString = "";
      searchResults.tag.push(row.tag);
      searchResults.playerID.push(row.player_id);
      searchResults.characters.push(row.characters);
    }, () => {
      res.write(JSON.stringify(searchResults));
      res.end();
    });
  });

  // res.writeHead(200, {'Content-Type': 'text/html'})
  // fs.readFile(path.join(__dirname, '../../public/stats.html'), null, function(err, data){
  //   if(err){
  //     res.writeHead(404);
  //     res.write('File not found');
  //   }
  //   else{
      
  //   }
  // });

app.listen(port, () => console.log(`Server started on Port: ${port}`));

//import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(path.join(__dirname, '../../database/melee_player_database.db'), (err) => {
// ../ goes up a folder, should work anywhere without needing absolute path
var tag="";
if (err) {
    console.error(err.message);
  }
  else
  console.log('Connected to database.');
});

