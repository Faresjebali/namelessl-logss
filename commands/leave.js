exports.run = async (client, message, args, ops) =>{
    if (!message.member.voiceChannel) return message.channel.send('Please Connect to a voice channel.');
	
	
	
	message.guild.me.voiceChannel.leave();
	
	message.channel.send('leaving Channel...');

}