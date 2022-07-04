const { CommandInteraction, MessageEmbed, Guild } = require("discord.js");


module.exports = {
    name: "kick",
    description: "kick a member.",
    userPermissions: ['ADMINISTRATOR'],
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
    run: async (client, interaction, args) => {
        const target = interaction.options.getMember("target");
        const reason = interaction.options.getString("reason");
        await target.user.fetch();

        

        const response = new MessageEmbed()
            .setTitle("__**Succesfully kicked the target!**__")
            .setColor("RANDOM")
            .setThumbnail(target.user.avatarURL({ dynamic: true }))
            .setImage(target.user.bannerURL({ dynamic: true, size: 512 }) || "")
            .addFields(
                { name: "ID", value: target.user.id },
                { name: "Kick Reason", value: reason },
                { name: "Joined Server", value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, inline: true },
                { name: "Account Created", value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, inline: true },
            );

        interaction.followUp({ embeds: [response], ephemeral: true });
        target.kick({ days: 0, reason: reason});
    }
} 
