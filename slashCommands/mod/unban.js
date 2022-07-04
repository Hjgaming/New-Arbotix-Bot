const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "unban",
    description: "Unban a user from the guild",
    userPermissions: ["BAN_MEMBERS"],
    options: [
        {
            name: "user-id",
            description: "User ID to unban",
            required: true,
            type: "STRING",
        },
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const userid = interaction.options.getString("user-id");
        const e1 = new MessageEmbed()
            .setTitle("Unban Confirmation")
            .setDescription(`Unban <@${userid}> from this server?`)
            .setColor("BLURPLE")
            .setFooter({
                text: "Unban Confirmation System"
            });
            const r1 = new MessageActionRow().addComponents(
                new MessageButton()
                .setLabel("Yes")
                .setEmoji("✅")
                .setStyle("DANGER")
                .setCustomId("yes"),
                new MessageButton()
                .setLabel("No")
                .setEmoji("❌")
                .setStyle("SUCCESS")
                .setCustomId("no")
            );
            interaction.followUp({
                embeds: [e1],
                components: [r1],
            });
            const filter = i => i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({
                 filter, 
                 time: 60000 
                });
            collector.on("collect", async i => {
                if(i.customId === "no") {
                    const r2 = new MessageActionRow().addComponents(
                        new MessageButton()
                        .setLabel("Yes")
                        .setEmoji("✅")
                        .setStyle("DANGER")
                        .setCustomId("yes")
                        .setDisabled(true),
                        new MessageButton()
                        .setLabel("No")
                        .setEmoji("❌")
                        .setStyle("SUCCESS")
                        .setCustomId("no")
                        .setDisabled(true)
                    );
                    i.update({
                        components: [r2]
                    });
                }
                if(i.customId === "yes") {
            interaction.guild.members.unban(userid).then((user) => {
                const e2 = new MessageEmbed()
            .setTitle("Unban Confirmation")
            .setDescription(`Unbanned <@${userid}> from this server!`)
            .setColor("BLURPLE")
            .setFooter({
                text: "Unban Confirmation System"
            });
            i.update({
                embeds: [e2],
                components: []
            });
            }).catch(() => {
                const errlol = new MessageEmbed()
            .setTitle("Unban Confirmation")
            .setDescription(`The user-id: ${userid} is not valid or it was already unbanned!`)
            .setColor("BLURPLE")
            .setFooter({
                text: "Unban Confirmation System"
            });
                i.update({
                    embeds: [errlol],
                    components: []
                });
            });
                }
            });
    },
};