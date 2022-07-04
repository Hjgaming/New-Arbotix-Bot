const Discord = require("discord.js");
const ec = require("../../settings/embed.json");

module.exports = {
    name: "poll",
    description: "Create a new Poll",
    userPermissions: ["ADMINISTRATOR"],
    options: [
         {
             name: 'query',
             description: 'write a query',
             type: 'STRING',
             required: true
         },
          {
             name: 'one',
             description: 'Write the first option of the survey',
             type: 'STRING',
             required: true
         },
          {
             name: 'two',
             description: 'Write the second option of the survey',
             type: 'STRING',
             required: true
         },
          {
             name: 'three',
             description: 'Write the third option of the survey',
             type: 'STRING',
             required: false
         },
           {
             name: 'four',
             description: 'Write the fourth option of the survey',
             type: 'STRING',
             required: false
         },
           {
             name: 'five',
             description: 'Write the fifth option of the survey',
             type: 'STRING',
             required: false
         },
         
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {


      let e = interaction.options.getString('query')

      let o1 = interaction.options.getString('one')

      let o2 = interaction.options.getString('two')

      let o3 = interaction.options.getString('three')

      let o4 = interaction.options.getString('four')

      let o5 = interaction.options.getString('five')

      let embed = new Discord.MessageEmbed()
      .setColor(ec.color)
      .setTitle("📊 `|` New Poll `|` 📊")
      .setDescription("**" + e + "**")
      .addField(":one:", "**" + o1 + "**")
      .addField(":two:", "**" + o2 + "**")
    
      if(o5) {
        embed.addField(":three:", "**"+ o3 + "**")
        embed.addField(":four:", "**"+ o4 + "**")
        embed.addField(":five:", "**"+ o5 + "**")
        interaction.followUp({embeds: [embed]}).then(m => {
        m.react("1️⃣")
        m.react("2️⃣")
        m.react("3️⃣")
        m.react("4️⃣")
        m.react("5️⃣")
      })
      return
      }

      if(o4) {
        embed.addField(":three:", "**"+ o3 + "**")
        embed.addField(":four:", "**"+ o4 + "**")
        interaction.followUp({embeds: [embed]}).then(m => {
        m.react("1️⃣")
        m.react("2️⃣")
        m.react("3️⃣")
        m.react("4️⃣")
      })
      return
      }

      if(o3) {
        embed.addField(":three:", "**"+ o3 + "**")
        interaction.followUp({embeds: [embed]}).then(m => {
        m.react("1️⃣")
        m.react("2️⃣")
        m.react("3️⃣")
      })
      return
      }

     interaction.followUp({embeds: [embed]}).then(m => {
        m.react("1️⃣")
        m.react("2️⃣")
      })
    }}