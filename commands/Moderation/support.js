
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "support",
    description: "Join My Support Server",
    aliases: ["inv"],
    usage: "",
    category: "🤖 Information Commands",

    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle(`${client.user.username} || Support server`)
        .setDescription(`Join My support server? Then [click here](https://discord.gg/JCNj58X28A) to Join my support server`)
        .setColor(`BLURPLE`)
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();

 

        message.channel.send({ embeds: [embed] })

    }
};

