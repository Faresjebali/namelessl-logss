const Discord = require("discord.js");
const client = new Discord.Client;

const prefix = '-';
const ownerID = '315848387947790336';
const active = new Map();
client.on('ready',() =>{
	console.log("Nameless Is on and ready To log Namless SUPPORT server")
client.user.setGame("https://discord.gg/mNRzSyX");

});
client.on('message', message =>{
//

//
let args = message.content.slice(prefix.length).trim().split(' ');
let cmd = args.shift().toLowerCase();


if (message.author.bot) return;
if (!message.content.startsWith(prefix)) return;

try{

 let ops = {
     ownerID: ownerID,
     active: active,
	 prefix:prefix,
 }
    let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(client, message, args, ops);

}catch (e) {
    console.log(e.stack);
}

});




client.login("Process.env.BOT_TOKEN")
