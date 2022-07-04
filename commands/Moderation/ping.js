const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "ping",
    description: "returns websocket ping",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.channel.send({ content: `${client.ws.ping}ms!` });
    },
};