const { inspect } = require('util');
const { Client, CommandInteraction, DiscordAPIError , MessageEmbed} = require("discord.js");

module.exports = {
    name: "eval",
    description: "good command",
    ownerOnly: true,

options :[
    {
name : `evall`,
description : `type the eval`,
required : true,
type : `STRING`
    },
],
    run: async (client, interaction, args) => {
        const devss = [`589154804601716838`]
        if(!devss.includes(interaction.user.id)) return interaction.followUp({content : `not for you kid.`})
      var [evall] = args


      try {
        let input = evall
        let output = eval(input);


        if(typeof output !== "string") output = inspect(output);

        if(output.size > 1950) output = output.substr(0, 1950);

       interaction.followUp({content : `\n\`\`\`js\n${output}\n\`\`\``})
      } catch (error) {
          console.log(error)
      }

},
}; 
