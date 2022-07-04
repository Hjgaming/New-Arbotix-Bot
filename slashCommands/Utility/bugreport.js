const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'bugreport',
    description: '❗ Report an issue or bug or someone to the owners.',
    category: 'Info',
    userPermissions: [],
    type: 'CHAT_INPUT',
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'The bug',
            name: 'bug',
            required: true,
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const member = interaction.guild.members.cache.get(args[0]) || interaction.member;
        const reportCh = client.channels.cache.get('989898040280252416');
        const query = args.join(" ");
        if (!query) return interaction.followUp({ content: "Specify a **bug**" });
        const reportEmbed = new MessageEmbed()
            .setTitle('__**Bug Report**__')
            .setDescription(`**Author :**\n> ${member.user.username} \n**Report :**\n > ${query}`)
            .setFooter({ text: `Author ID: ${member.user.id}` })
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor("RANDOM")
        interaction.followUp({ content: "Report has been sent to the report channel!" })
        reportCh.send({ embeds: [reportEmbed] });
    },
};