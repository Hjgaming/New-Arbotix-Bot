const {
    Client,
    CommandInteraction,
    MessageAttachment
} = require("discord.js");
const {
    Canvas
} = require("canvacord");

module.exports = {
    name: "beautiful",
    description: "beautiful image",
    
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

        const image = await Canvas.beautiful(avatar);
        const attachment = new MessageAttachment(image, "beautiful.png");

        interaction.followUp({
            files: [attachment]
        }).catch(() => {});
    },
};