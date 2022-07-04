let { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
let { Client, Message, MessageEmbed } = require("discord.js");
let { getAudioUrl } = require("google-tts-api");

module.exports = {
    name: 'tts',
    description: '📣 Speak in voice channel',
  category: "Fun",
    /**
     * @param { Client } client 
     * @param { Message } message 
     * @param { String } args
     */
    run: async (client, message, args) => {
        let string = args.join(" ");
        let voiceChannel = message.member.voice.channel;

        if (!string) return message.channel.send("Please type something to speak!");
        if (string.length > 500) return message.channel.send("I can only speak 500 words!");
        if (!voiceChannel) return message.channel.send("Please join a voice channel to use this command!");

        let audioUrl = await getAudioUrl(string, {
            lang: "en",
            slow: false,
            host: 'https://translate.google.com',
            timeout: 20000,
        });

        let player = createAudioPlayer();
        let resource = createAudioResource(audioUrl);

        let connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.channel.guild.id,
            adapterCreator: message.channel.guild.voiceAdapterCreator,
        });

        player.play(resource);
        connection.subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => {
            connection.disconnect();
        });
    },
};