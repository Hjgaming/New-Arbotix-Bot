const { CommandInteraction, MessageEmbed } = require("discord.js");

const { create } = require("sourcebin")

module.exports = {
    name: 'sourcebin',
    description: '"📊 Uploads Code To Sourcebin, And Returns A Link!',
    category: 'Utility',
    userPermissions: [],
    ownerOnly: false,
    options: [{
        name: "title",
        description: "What Do You Want To Title This Sourcebin?",
        type: "STRING",
        required: true
    }, 
    {
        name: "description",
        description: "What Do You Want The Description Of This Sourcebin To Say?",
        type: "STRING",
        required: true
    },
    {
        name: "code",
        description: "Paste Or Write Your Code You Want On This Sourcebin.",
        type: "STRING",
        required: true
    }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
     run: async (client, interaction, args) => {
        const options = interaction.options
        const title = options.getString("title");
        const description = options.getString("description");
        const content = options.getString("code");

        create([
            {
                name:  title,
                content,
            },
        ],
            {
                title: title,
                description: description
            }
        ).then((value) => {
            return interaction.followUp({
            embeds: [new MessageEmbed().setTimestamp().setColor("RED").setTitle(`**Here Is Your Sourcebin Link!**`).setURL(value.url).setFooter({ text: "©️Arbotix" }).setTimestamp()
                .addFields({
                name: "User:",
                value: `\`\`\`${interaction.user.username}\`\`\``
            }, {
                name: "Sourcebin Link:",
                value: `\`\`\`${value.url}\`\`\``
            },
            )
            ],
            })
        })
       
    },
}