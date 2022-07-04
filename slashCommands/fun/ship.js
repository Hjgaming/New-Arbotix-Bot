const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const block = "⬛";
const heart = ":red_square:";

module.exports = {
    name: 'ship',
    description: '❤️ Find a user and see how much you love eachother by rate.',
    category: 'Fun',
    aliases: ['rs'],
    userPermissions: [],
    type: 'CHAT_INPUT',
    ownerOnly: false,
    options: [
        {
            name: "one",
            description: "The first user",
            type: "USER",
            required: true
        },
        {
            name: "two",
            description: "The second user",
            type: "USER",
            required: true
        }
    ],

    async run(client, interaction, args) {
        const user1 = interaction.options.getUser("one"),
            user2 = interaction.options.getUser("two")
        const embed = new MessageEmbed()
            .setAuthor(`${user1.tag} AND ${user2.tag}`)
            .setColor("RANDOM")
            .setTitle('Searching for your lover...')
            .setDescription(`Shipped ****${user1.tag}**** and ****${user2.tag}****!`)
            .setImage(`https://api.popcat.xyz/ship?user1=${user1.displayAvatarURL({ dynamic: false, format: "png" })}&user2=${user2.displayAvatarURL({ dynamic: false, format: "png" })}`)
            .addField(`**Relationship Meter**`, ship());
        try {
            await interaction.followUp({ embeds: [embed] })
        } catch (error) {
            await interaction.followUp({ content: "An Error Occured" })
        }
        function ship() {
            const hearts = Math.floor(Math.random() * 110) + 0;
            const hearte = (hearts / 10)

            const str = `${heart.repeat(hearte)}${block.repeat(11 - hearte)} ${hearts}%`;
            return str;
        }
    }
}