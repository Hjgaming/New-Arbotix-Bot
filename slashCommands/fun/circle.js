const {
    Client,
    CommandInteraction,
    MessageAttachment
} = require("discord.js");
const {
    Canvas
} = require("canvacord");

module.exports = {
    name: "circle",
    description: "circle image",

    options: [{
        name: "target",
        description: "select a target",
        type: "USER",
        required: false
    }],

run: async (client, interaction) => {

        const user = interaction.options.getUser('target') || interaction.member;
        const avatar = user.displayAvatarURL({
            format: "png"
        })

        const image = await Canvas.circle(avatar);
        const attachment = new MessageAttachment(image, "circle.png");

        interaction.followUp({
            content: `_ _`,
            files: [attachment],
            ephemeral: true
        }).catch((e) => {interaction.followUp(`Try again later!`)});
    },
};