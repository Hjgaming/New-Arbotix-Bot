const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
        name: "credits",
        aliases: [''],
        category: 'info',
        description: 'Shows A Arbotix credits',
  category: "🤖 Information Commands",
        usage: '',
        accessableby: 'everyone',

    run: async (bot, message, args) => {
            const embed = new MessageEmbed()
                .setTitle(`Arbotix Credits`)
                .setColor("GREEN")
                .setDescription(`**arbotix** bot created by **HJ GAMING AND PARAS** and **Arbotix Devlopment** we provide all copyrights and add license to our application!`)

              const Buttons = new MessageActionRow();
    Buttons.addComponents(
      new MessageButton()
      .setStyle('LINK')
    .setLabel("ARBOTIX DEVLOPMENT")
      .setURL(`https://discord.gg/7wmb5x7qp4`)
      .setEmoji("➕"),
      
      
    )
                
            message.channel.send({ embeds:[embed], components: [Buttons] })
    }
};
