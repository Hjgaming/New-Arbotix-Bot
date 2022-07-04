const { CommandInteraction, MessageEmbed, Guild } = require("discord.js");


module.exports = {
    name: "ban",
    description: "Ban a member.",
    category: "moderation",
    cooldown: 0,
    userPermissions: "ADMINISTRATOR",
    botPermissions: "ADMINISTRATOR",
    ownerOnly: false,
    toggleOff: false,
    options: [
        {
            name: "target",
            description: "Select the target.",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "Select a reason.",
            type: "STRING",
            required: true
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
   run: async (client, interaction, args, message) => {
        const target = interaction.options.getMember("target");
        const reason = interaction.options.getString("reason");
        await target.user.fetch();
      if (interaction.guild.me.roles.highest.position <= target.roles.highest.position) return interaction.reply({
        embeds: [new MessageEmbed()
          .setColor(`RED`)
          .setDescription(`I cannot ban this user as his role is the same or higher then mine.`)
        ]
      });
             if (!target.bannable) return interaction.editReply({ embeds:[new MessageEmbed()
        .setColor(`RED`)
        .setDescription(`I cannot ban that member.`)]});

        const response = new MessageEmbed()
            .setTitle( " __**Succesfully banned the target!**__")
            .setColor("GREEN")
            .setThumbnail(target.user.avatarURL({ dynamic: true }))
            .setImage(target.user.bannerURL({ dynamic: true, size: 512 }) || "")
            .addFields(
                { name: "ID", value: target.user.id },
                { name: "Ban Reason", value: reason },
                { name: "Joined Server", value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, inline: true },
                { name: "Account Created", value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, inline: true },
            );

        interaction.editReply({ embeds: [response]});
           await target.send({ embeds:[new MessageEmbed()
        .setTitle(`You have been banned from ${interaction.guild.name}`)
        .setDescription(`**Reason for being banned:**\n${reason}`)
        .setColor(`RED`)
        .setFooter(`by ${interaction.user.tag}`)
        .setTimestamp()]}).catch(err => console.log('I was unable to message the member.'));
        target.ban({ days: 0, reason: reason});
    }
}