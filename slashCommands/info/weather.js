const weather = require('weather-js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "weather",
    description: "Checks a weather forecast",
    options: [
        {
            name: "location",
            description: "Enter a location",
            type: "STRING",
            required: true
        }
    ],
    run: async (client, interaction, args) => {
    const loc = interaction.options.getString("location");

    weather.find({search: loc, degreeType: "C"}, function(error, result){
        const errEmbed = new MessageEmbed()
        .setColor("#FF0000")
        .setDescription("**⛔ You didn't specify a valid location**")

        if (result === undefined || result.length === 0) return interaction.reply({embeds: [errEmbed]});
        if (error) console.log(error);
        const current = result[0].current
        const location = result[0].location
        
      const embed = new MessageEmbed()
      .setTitle(`Showing the Weather Info for ${current.observationpoint}`)
      .setDescription(current.skytext)
      .setThumbnail(current.imageUrl)
      .setColor("#FF0000")
      .setTimestamp()
      .addField("Temperature: ", current.temperature + "°C", true)
      .addField("Wind Speed: ", current.winddisplay, true)
      .addField("Humidity: ", `${current.humidity}%`, true)
      .addField("Timezone: ", `UTC${location.timezone}`, true)
      .setFooter({text: "ARBOTIX DEVLOPMENT" })

      interaction.followUp({embeds: [embed]})
    })

    }
        }