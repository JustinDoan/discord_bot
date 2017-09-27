// Load up the discord.js library
const Discord = require("discord.js");
var mysql = require("mysql");
var base64 = require('base-64');
var wikipedia = require("wikipedia-js");
var htmlToText = require('html-to-text');
var http = require('http');
var fs = require('fs');
const download = require('download');
var badWords = require('badwords-list');
var swearjar = require('swearjar');
var underscore = require('underscore');
var Sentencer = require('sentencer');
var request = require("request");

var game = require('./game');
var player = require("./player");
var gameMap = require("./map");
var inventory = require("./inv");
var type = require("./type")
var tile = require("./tile")
var multi = require("./multi")
var GameFiles = [];

//this varible is for controlling the player while he plays the text game.

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: 'points'
});




function getpoints(con,member){
    console.log(member);
    member = String(member);
    var sqlQuery = "SELECT * FROM `points`;"
    
    con.query(sqlQuery, function (err, result, fields) {
        if (err) throw err;
        return result;
        });
    
}


function addPoint(user){
    
    con.query("UPDATE points SET points = points + 1 WHERE name = '"+user+"'", function (err, result, fields) {
        if (err) throw err;
        console.log(user + " point added");
        
        });
    
}

function getTop(callback){
   
    con.query("select * from points ORDER BY points DESC", function (err, result, fields) {
        if (err) {
            callback(err,null);
        }
        else{
            callback(null, result);
        }
            
    });

    
    
}

function addUsers(user){
    
        con.query("INSERT INTO points (name, points) VALUES ('"+user+"', 0)", function (err, result, fields) {
        if (err) throw err;
        console.log(user + " record inserted");
        
        });
    }

function removeBrackets(input) {
    return input
        .replace(/{.*?}/g, "")
        .replace(/\[.*?\]/g, "")
        .replace(/<.*?>/g, "")
        .replace(/\(.*?\)/g, "");
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


async function sendRandImages(message,query,idArray,counter,times,m){
    var id = makeid();
    idArray.push(id);  
    var query = "http://i.imgur.com/" + id + ".jpg";
    if(counter != times){
        download(query, './').then(() => {
        counter = counter + 1;
            
        m.edit("Downloading ("+counter+"/"+times+")");
        sendRandImages(message,query,idArray,counter,times,m)
            
            });
    }else if (counter == times){
         for(i=0; i<idArray.length; i++){
             number = i + 1;
                await message.channel.send(number.toString()+"/"+times,{
                files: [
                    "./"+idArray[i]+".jpg"    
                ]
                });
             fs.unlinkSync("./"+idArray[i]+".jpg");
        }
    return;
    }

}
//for making eval mentions not happen
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setGame(`on ${client.guilds.size} servers`);
    
    
    
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});


client.on("message", async message => {
    
    
    
    
    
  //I spent 3 hours wondering why i kept getting errors, need to block bot messages    
  if(message.author.bot) return;  
    //skip reading the message if it doesn't contain any > symbol  
  if(message.content.indexOf(">") !== 0) return;
    
  var userID = message.author.toString();
  var filename = userID+"_File";
  //the filename of the specific game object is userID+"_file";
  //This is so we can have multiple games at the same time.
    //console.log(GameFiles[filename].gameState)
  try{
      if (GameFiles[filename].gameState === false) return;
  }catch(err){
      return;
  }
  
    
  //console.log(GameFiles[filename]);
  
  
  var gameArgs = message.content.slice(config.prefix.length).trim().split(/ +/g);
  var gameCommand = gameArgs.shift().toLowerCase();
  var direction = null;
  //console.log(gameArgs)
  if (gameArgs.length >= 1){
      direction = gameArgs[0].toLowerCase();
      //console.log(direction)
  }
  
  var switchCommand = gameCommand.toLowerCase();
  switch(switchCommand){
      case "?":
      case "help":
          message.channel.send("Here are all commands \n"+
                              ">inv/inventory\n"+
                              ">move\n"+
                              ">attack\n"+
                              ">quit")
          
          
          break;
      case "people":
          
          
          
          
          var onlineUsers = 0;
          
          for( var gameobj in GameFiles){
              if(GameFiles[gameobj].gameState === true){
                  onlineUsers = onlineUsers + 1;
              }
          }
                      
          
          
          
         
          
          var onlineUsersSameLocation = 0;
          
          for( var gameobj in GameFiles){
              //console.log(GameFiles[gameobj].gameMap.mapLocation, GameFiles[filename].gameMap.mapLocation)
//had to use a package to compare these arrays together, better than json comparing              
 if(underscore.isEqual(GameFiles[gameobj].gameMap.mapLocation,GameFiles[filename].gameMap.mapLocation)){
                  onlineUsersSameLocation = onlineUsersSameLocation + 1;
              }
          }
          
          
          
          
          
          message.channel.send(Object.keys(GameFiles).length + " currently has a game save file." + "\n" +
          onlineUsers + " currently is in game." +"\n" +
          onlineUsersSameLocation + " is in your location. (Including yourself)");
          
          break;
      case "inv":     
      case "inventory":
          message.channel.send("```\n" +
                               "UserId: " + GameFiles[filename].player.getName()+"\n"+
                               "Health: " + GameFiles[filename].player.health+"\n"+
                               "Mana: " + GameFiles[filename].player.mana+"\n"+
                               "Items: " + GameFiles[filename].inventory.getItems() + "\n"+
                               "Gold: " + GameFiles[filename].inventory.getGold()+"\n"+
                               ""+
                               "```");
          break;
      case "move":
          GameFiles[filename].gameMap.move(direction);
          
          
          message.channel.send(GameFiles[filename].player.getName() + " moved "+ direction)
          break;
      case "map":
          //this returns the coordinates.
          //message.channel.send("```" + GameFiles[filename].gameMap.mapLocation + "```");
          message.channel.send("```javascript\n" + GameFiles[filename].gameMap.displayMap() +"\n```")
          break;
      case "attack":
          message.channel.send(GameFiles[filename].player.getName() + " swings at the air with... wait, "+GameFiles[filename].player.getName()+ " doesn't have arms.")
          break;
      case "quit":
          GameFiles[filename].setGameState(false);
          message.channel.send(message.author +" has quit the game.");
          break;
      case "debug":
          console.log(GameFiles[filename])
      case "look":
          message.channel.send(GameFiles[filename].gameMap.getTileDescription());
          break;
      default:
          message.channel.send("That command does not exist.");
          break;
          
  }
    
    
    
});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.member.roles.some(r=>["Bot"].includes(r.name)) ) return;
  
  //this is a cuss filter. Has some problems with blocking words like assert.
    
   /* 
    var substrings = badWords.array;
    var length = substrings.length;
    while(length--) {
        var cussFilter = message.content;
        cussFilter = cussFilter.toLowerCase();
        if (cussFilter.indexOf(substrings[length])!=-1) {
        console.log("Bad Word!")
        message.delete().catch(O_o=>{});
      
        message.channel.send(message.author + " Watch your filthy mouth!")
        }
    } */
    
    //Bot answer
    






    
    //Cuss Filter +++++++++++++++++++++++++++++++++++++++++
    filteredMessage = swearjar.censor(message.content);
    console.log
    
    if (filteredMessage === message.content){
        //console.log("no swears")
    }else {
        console.log("a swear!")
        message.delete().catch(O_o=>{});
        message.channel.send(message.author + " You mean to say:\n\n" + filteredMessage);
    }
    
  

  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
    
  if(message.content.indexOf(config.prefix) !== 0) return; 
    
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
    
  if (command === "top"){
      
      
      getTop(function(err,data){
        if (err) {
            // error handling code goes here
            message.channel.send("I'm sorry but I returned an error, Please don't hurt me.");            
        } else {            
            // code to execute on data retrieval
            
            var topMessage = "";
            for (var i = 0, len = data.length; i < len; i++) {
                 topMessage =  topMessage + String(data[i].name) +": "+ String(data[i].points) + " pts \n"
                
            }
            message.delete().catch(O_o=>{});
            message.channel.send(topMessage);
            
               
        }    

      });
      
      
      
      
  }
    if(command == "eval"){
        
        if(!message.member.roles.some(r=>["Admin","Bot"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
        
        try {
      var code = args.join(" ");
        code = code.replace("console.log", "message.channel.send");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
        
        
    }
    if(command === "download"){
        
        
        
        
        var query = args.join(" ");
        
        
        if(query === " "){
            query = (message.attachments).array();
            console.log(query);
            query = query[0].url;
            console.log(query);
        }
        
        
        
        //i.imgur.com/6wYNqHk.jpg
        var extension = query.substr(query.lastIndexOf("."));
        //console.log(extension);
        message.delete().catch(O_o=>{});
       download(query, './',{
           filename: "1" + extension
       }).then(() => {
    message.channel.send({
    files: [
      "./1"+extension
    ]
  });
           
       });
        
        
};
    
    if(command === "randomimage"){ 
        
        times  = args.join("");
        times = parseInt(times);
        if(times > 100){
            message.channel.send("Too many images")
            return;
        }
        var counter = 0;
        var idArray = [];
        const m = await message.channel.send("Downloading");
        
       sendRandImages(message,null,idArray,counter,times,m)
        
}  
    
  if (command === "add"){
      if(!message.member.roles.some(r=>["Admin"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
      let member = message.mentions.members.first();
      if (member === "undefined"){
          return;
      }
      member = String(member)
      //console.log(member)
      addUsers(member)
      message.delete().catch(O_o=>{});
      message.channel.send(member + " was successfully added.")
  }
  if(command === "point") {
      
      if(!message.member.roles.some(r=>["Admin","Bot"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
      
      let member = message.mentions.members.first();
      
      if (member === "undefined"){
          return;
      }
      
      member = String(member)
      addPoint(member)
      
      message.delete().catch(O_o=>{});
      message.channel.send(member + " got 1 point.")
      
  }
    
  if(command === "load"){
      var loadMsg = "";
       const m = await message.channel.send("");
      for (i = 0; i < 10; i++) { 
          loadMsg = loadMsg + "\|"
    m.edit(loadMsg);
}
   m.edit("Bot has been loaded")     
      
      
  }
  if(command === "wiki"){
      var query = args.join(" ");
      
      if(query.toLowerCase() === "david howell"){
           message.channel.send("David Howell, a student currently enrolled at Carroll Community College. \nHe's considered by most to be a pleb. He's struggling through learning python, and well, pretty much any kind of programming.");
           return;
      }
      if(query.toLowerCase() === "ben marlatt"){
           message.channel.send("ben marlatt is the muffin man, the banana bandana.");
           return;
      }
  // if you want to retrieve a full article set summaryOnly to false. 
  // Full article retrieval and parsing is still beta 
  var options = {query: query, format: "html", summaryOnly: false};
  wikipedia.searchArticle(options, function(err, htmlWikiText){
    if(err){
      console.log("An error occurred[query=%s, error=%s]", query, err);
      return;
    }
      
      var s = htmlWikiText;
      try{
      s = s.substring(0, s.indexOf('</p>'));
      }
      catch(err) {
          message.channel.send("Could not find that.");
          return;
      }
      
      s = s.replace(/<sp(.*?)f\>/g,'')
        
      var text = htmlToText.fromString(s, {
        wordwrap: false,
          ignoreHref: true
        });
        text = text.replace(/\([^()]*\)/g, '')
      text = removeBrackets(text);
    message.channel.send(text);
      
    //message.channel.send(s);
    })
  };
      
    
  if(command === "clap"){
      
      const sayMessage = args.join(" ");
      
      // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
      message.delete().catch(O_o=>{});
      
      var newMessage = sayMessage.trim().split(' ').join(':clap:')
      // And we get the bot to say the thing: 
      message.delete().catch(O_o=>{});
      message.channel.send(newMessage);
      
      
      
  }
    
    
  
    
  if(command === "base64"){
      
      if (args[0].toLowerCase() === "encode"){
          console.log("caught encode");
          args.splice(0, 1);
          const sayMessage = args.join(" ");
          console.log(args);
          var ciphertext = sayMessage; //myString
          var encoded = base64.encode(ciphertext);
          message.channel.send("Here is your encoded base64 string: " + encoded);
          return;
          
      } else if (args[0].toLowerCase() === "decode"){
          console.log("caught decode");
          args.splice(0, 1);
          console.log(args);
          const sayMessage = args.join(" ");
          
          var ciphertext = sayMessage; //myString
          var encoded = base64.decode(ciphertext);
          message.channel.send("Here is your decoded base64 string: " + encoded);
          return;
          
      } else {
          message.channel.send("You need to specify if encode or decode.");
          return;
      }
      
      
  }  
    
  if(command === "startgame"){
      
      var userID = message.author.toString();
      var filename = userID+"_File";
      
      //we need the player's ID both for the name of the character, and as the name of the main gamefile.
      //we check if there isn't already a game file first, if not, then we create a new one.
      if(typeof GameFiles[filename] != "undefined"){
          GameFiles[filename].gameState = true;
          message.channel.send(message.author + " has rejoined the Game.");
      }else{
          GameFiles[filename] = new game(userID,true);
      }

      message.channel.send(message.author + " has joined the Game.");
                       
             
      

          
          
          
      }  
    
  
  if(command === "help"){
      
      
      message.channel.send("```css\nHere are the current commands available for CarrollBot: \n\n" +
                           
                           "+help                         \n\n" +
                           "+clap  [message]           \n\n" +
                           "+ooh                          \n\n" +
                           "+say   [message]           \n\n" +
                           "+top                          \n\n" +
                           "+eval  [code]              \n\n" +
                           "+wiki  [message]           \n\n" +
                           "+base64      [en/decode] [text]  \n\n" +
                           "+download    [link/attach]       \n\n" +
                           "+ping                         \n\n" +
                           "+randomimage [numer of images]\n\n" +
                           "```");
      
      
      //\" This is what you are viewing now! \"\n\n"
      //\" Fancy clap meme \"\n\n
      //\" Send an ohh gif\"\n\n
       //\" Have the bot say whatever you want \"\n\n
      // \" View the Point leaderboard \"\n\n
       //\" Run Javascript code \"\n\n
       //\" Look something up on wikipedia \"\n\n
      // \" Check your ping with the bot \"\n\n
       //\" Check your ping with the bot \"\n\n
      // \" Check your ping with the bot \"\n\n
      
  }
  if(command === "raugh") {
      message.delete().catch(O_o=>{});
      message.channel.send({
    files: [
      "./raugh.jpg"
    ]
  });
};
  if(command === "ooh") {
      message.delete().catch(O_o=>{});
      message.channel.send({
    files: [
      "./ooh.gif"
    ]
  });
};
  
    
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{});
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention!
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the kick!");
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ban!");
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});

client.login(config.token);