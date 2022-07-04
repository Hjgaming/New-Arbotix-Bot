module.exports = {
    name: "shutdown",
    aliases: ["turnoff"],
    description: "Shuts down the bot !!",
    category: "☠️ owner",
    example: `a!shutdown`,

    run: async(client, message, args) => {
        
        if (message.author.id !== "589154804601716838") {
            return message.channel.send({ content: `:crossed_swords: **${message.member.user.username}** Only Bot Owner Use This Command`, });
        }
        
        await message.channel.send(`✅ Thank You For Letting Me Rest!`)
        process.exit()
    }
}