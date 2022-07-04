const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'gayrate',
    description: '😝 Rate a user on how gay are they.',
    category: 'Fun',
    aliases: ['gy'],
    userPermissions: [],
    type: 'CHAT_INPUT',
    ownerOnly: false,
         options: [
             {
                 name: "user",
                 description: "User",
                 type: "USER",
                 required: true
             },
         ],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const human = interaction.options.getUser("user")
        const rate = Math.floor(Math.random() * (100 - 1 + 1) + 1);

        if(human == interaction.author) {
            const Embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle('***Your Gayrate***')
            .setDescription(`You are **${rate}%** Gay `)
            .setFooter({ text: "©️Arbotix" })
            interaction.followUp({ embeds: [Embed] })
        } else {
            const Embed2 = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`***${human.username}'s Gayrate***`)
            .setDescription(`${human} is **${rate}%** Gay `)
            .setFooter({ text: "©️Arbotix" })
            interaction.followUp({ embeds: [Embed2]})
        }

    }
}