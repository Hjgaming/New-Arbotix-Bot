const {
	MessageEmbed,
	MessageActionRow,
	MessageButton,
  MessageSelectMenu,
	Permissions,
  
} = require("discord.js");

module.exports = {
    name: "help",
    description: "all commands",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
		const commands = interaction.client.slashCommands;
		

		const embed = new MessageEmbed()
                  .setFooter("©Arbotix | hjgaming")
                .setTitle("Arbotix Help Command")
          
.setTitle(`Information about the __**${client.user.username}**__`)
        
.setTitle(`**${client.user.username}**`)
        .addField("**__My Features__**",
`>>> **__Help Menu__**, 
✅ ... Overview



🔰 ... Information
🎊 ... Fun Related
⛔ ... Moderation Related
⚜️ ... Utilty Related
💬 ... Suggestion Related`)
        
      .addField(`**__Bot Creator Information__**`,`>>> 💯 This Bot has been made by:\n[**HJ GAMING**](https://discord.com/users/589154804601716838)・[**Discord**](https://discord.gg/7wmb5x7qp4)・[**Click here**](https://discord.gg/7wmb5x7qp4)`)
        .setTimestamp()
        .setFooter(`Requested by ${interaction.user.username} | Arbotix Devlopment`, interaction.user.displayAvatarURL());
        
          const giveaway = new MessageEmbed()
          .setTitle("Categories » INFORMATION")
          .setColor('#2F3136')
          .setDescription("```yaml\nHere are the information commands:```")
          .addFields({ name: 'INFORMATION COMMAND'  , value: `help , invite , ping , uptime , servers , status , weather , date , allbots , mc `, inline: true }, )
          .setTimestamp()
          .setFooter(`Requested by ${interaction.user.username} | Arbotix Devlopment`, interaction.user.displayAvatarURL());
        
        
          const general = new MessageEmbed()
          .setTitle("Categories » FUN")
          .setColor('#2F3136')
          .setDescription("```yaml\nHere are the fun commands:```")
          .addFields({ name: 'FUN COMMAND'  , value: `affect , beautiful , blur , bonk , brightness , burn , circle , clyde , colourfy , darkness , delete , gayrate , screenshot , ship`, inline: true },)
          .setTimestamp()
          .setFooter(`Requested by ${interaction.user.username} | Arbotix Development`, interaction.user.displayAvatarURL());

          const emote = new MessageEmbed()
          .setTitle("Categories » MODERATION")
          .setColor('#2F3136')
          .setDescription("```yaml\nHere are the Moderation bot commands:```")
          .addFields({ name: 'MODERATION COMMAND'  , value: `mute , ban , clear , poll , kick , listbans , role , seticon , timeout on , timeout off , transcript , unban , unmute , userinfo , warn add , warn check , warn remove , announce`, inline: true },)
          .setTimestamp()
          .setFooter(`Requested by ${interaction.user.username} | Arbotix Development`, interaction.user.displayAvatarURL());

                const mod = new MessageEmbed()
          .setTitle("Categories » INFORMATION")
          .setColor('#2F3136')
          .setDescription("```yaml\nHere are the Utilty bot commands:```")
          .addFields({ name: 'UTILTY COMMAND'  , value: `bugreport , multimoji , panel-addrole , panel-removerole , panel , sourcebin`, inline: true },)
          .setTimestamp()
          .setFooter(`Requested by ${interaction.user.username} | Arbotix Development`, interaction.user.displayAvatarURL());

        
          const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId("help-menu")
                .setPlaceholder("Please Select a Category")
                .setDisabled(state)
                .addOptions([{
                        label: `INFO COMMANDS`,
                        value: `giveaway`,
                        description: `View all the Information based commands!`,
                        emoji: `🔰`
                    },
                    {
                        label: `FUN COMMANDS`,
                        value: `general`,
                        description: `View all the Fun bot commands!`,
                        emoji: `🎊`
                    },
                    {
                        label: `UTILTY COMMANDS`,
                        value: `mod`,
                        description: `View all the Utilty bot commands!`,
                        emoji: `⚜️`
                    },
                    {
                        label: `MODERATION COMMANDS`,
                        value: `emote`,
                        description: `View all the MODERATION bot commands!`,
                        emoji: `⛔`
                    }


                ])
            ),
        ];
        
        const initialMessage = await interaction.editReply({ embeds: [embed], components: components(false) });
        
        const filter = (interaction) => interaction.user.id === interaction.member.id;
        
                const collector = interaction.channel.createMessageComponentCollector(
                    {
                        filter,
                        componentType: "SELECT_MENU",
                        time: 300000
                    });
        
                collector.on('collect', (interaction) => {
                    if (interaction.values[0] === "giveaway") {
                        interaction.update({ embeds: [giveaway], components: components(false) });
                    } else if (interaction.values[0] === "general") {
                        interaction.update({ embeds: [general], components: components(false) });
                    } else if
(interaction.values[0] === "emote") {
                        interaction.update({ embeds: [emote], components: components(false) });
                } else if
(interaction.values[0] === "mod") {
                        interaction.update({ embeds: [mod], components: components(false) });
}
                collector.on('end', () => {
                  initialMessage.edit({ components: components(true) });
              }
              )
    },
)
}}