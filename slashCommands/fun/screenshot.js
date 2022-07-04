const { Client, CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");


module.exports = {
    name: "screenshot",
    description: "📷 Take's screenshot from the site you send",
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'url',
            description: 'The url you want to take screenshot from',
            required: true,
            type: `STRING`
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let url = interaction.options.getString('url')

            if (url.length < 8)
            return interaction.followUp(`"https is too short to reach - 8 limit"`)

            const site = /^(https?:\/\/)/i.test(url) ? url : `http://${url}`

            const { body } = await fetch(`https://image.thum.io/get/width/1950/crop/700/noanimate/${site}`)


            interaction.followUp({
                embeds: [
                    new MessageEmbed()
                    .addField(`Screenshotted!`, `[The site](${site})`)
                    .setImage(`attachment://screenshot.png`)
                ],
                files: [ body ]
            })
                                 }
  }