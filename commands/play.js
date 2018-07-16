const ytdl = require('ytdl-core');

exports.run = async (client, message, args, ops) =>{
    if (!message.member.voiceChannel) return message.channel.send('Please connect to a voice');
   

    if (!args[0]) return message.channel.send('Soory, please input a url following the command.');

    let validate = await ytdl.validateURL(args[0]);

    if (!validate) return message.channel.send('Soory, Please input a **valid** URL following the command.');

    let info = await ytdl.getInfo(args[0]);

    let data = ops.active.get(message.guild.id) || {};

    if(!data.connection) data.connection = await message.member.voiceChannel.join();
    if(!data.queue) data.queue = [];
    data.guildID = message.guild.id;

    data.queue.push({
songTitle: info.title,
requester: message.author.tag,
url:args[0],
announceChannel:message.channel.id
    });

    if (!data.dispatcher) play();
    else{
       message.channel.send(`Added to Queue: ${info.title} | requested By: ${message.author.id}`);
    
    }
    ops.active.set(message.guild.id, data);
}
async function play(client, ops, data){
    client.channels.get(data.queue[0].announceChannel).send(`now PLaying: ${data.queue[0].songTitle} | requested By: ${data.queue[0].requester}`);
    data.dispatcher = await data.connection.play(ytdl(data.queue[0].url,{ filter: 'audioonly'}));
    data.dispatcher.guildID = data.guildID;
    data.dispatcher.once('end',function(){
        finish(client, ops, this);
    });
}
function finish(client, ops, dispatcher){
    let fetched =ops.active.get(dispatcher.guildID);

    fetched.queue.shift();

    if(fetched.queue.length > 0 ){
        ops.active.set(dispatcher.guildID, fetched);

        play(client, ops, fetched);

    }else{
        ops.active.delete(dispatcher.guildID);

        let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;
        if (vc) vc.leave();

    }
}