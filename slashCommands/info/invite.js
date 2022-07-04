const {
  MessageEmbed,
  CommandInteraction,
  MessageActionRow,
  MessageButton
} = require("discord.js")

module.exports = {
  name: "invite",
  description: "invite now",
  permission: "ADMINISTRATOR",
   /**
  *@param {CommandInteraction} interaction
  */
 run: async(client, interaction, args) => {

    
     
    const Embed2 = new MessageEmbed()
    .setTitle("Invite me")
    
    .setColor("RANDOM");

    const Buttons = new MessageActionRow();
    Buttons.addComponents(
      new MessageButton()
      .setStyle('LINK')
    .setLabel("Invite")
      .setURL(`https://discord.com/oauth2/authorize?client_id=984159878123765761&permissions=8&scope=applications.commands%20bot`)
      .setEmoji("🎉"),
      
      
    );

    
     
  
    interaction.followUp({embeds: [ Embed2 ], components: [Buttons]});

  },
};