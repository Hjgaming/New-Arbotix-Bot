const Discord = require('discord.js');

module.exports = {
    name: "uptime",
    description: "bot uptime",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;

    const embed = new Discord.MessageEmbed()
    .setTitle("UpTime")
    .setDescription("arbotix uptime")
    .addField("**__UPTIME:__**", `\`${days}d\`-\`${hours}h\`-\`${minutes}m\`-\`${seconds}s\``)
    .setColor("BLUE")
    .setFooter("©️ Arbotix ")
    .setTimestamp();
    
   interaction.followUp({ embeds: [embed]});
  }
  
}