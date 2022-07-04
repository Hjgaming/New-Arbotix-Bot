const {
	MessageEmbed,
	MessageActionRow,
	MessageButton,
  MessageSelectMenu,
	Permissions,
  
} = require("discord.js");

module.exports = {
    name: "allbots",
    description: "all bots",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
    
    let checked = '🌕';
    let unchecked = '🌑';


    const allbots = interaction.guild.members.cache.filter(m => m.user.bot).map((m) => m).map((m) => `${m.user.flags ? checked : unchecked} ${m.user.tag} (${m.id})`).join('\n');

    const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`${interaction.user.tag}`)
    .setDescription(allbots)
  
    .setTimestamp();
    interaction.followUp({ embeds: [embed]})
  }
};