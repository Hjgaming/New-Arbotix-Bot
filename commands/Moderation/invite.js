const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");


module.exports = {
    name: "invite",
    description: "To invite the bot to your servers.",
    aliases: ["inv"],
    usage: "",
    categoery: "🤖 Information Commands",

    run: async (client, message, args) => {
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

    
     
  
    message.channel.send({embeds: [ Embed2 ], components: [Buttons]});

  },
};