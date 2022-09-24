const { EmbedBuilder } = require('discord.js');
const config = require('../../../config.json');

exports.run = async function(client, con, interaction) {
    let user = interaction.options.getUser('user');
    con.query(`INSERT INTO user_data (username, discordId) VALUES ('${user.username}', '${user.id}')`, (err, result) => {
        const embed = new EmbedBuilder();
        if (err) {
            embed.setTitle('Error :x:')
            embed.setColor("#ED4245")
            embed.setDescription(`An error occured while trying to add the user to the database. Please try again.`)
        } else {
            embed.setTitle('Success :white_check_mark:')
            embed.setColor("#57F287")
            embed.setDescription(`Successfully added the user to the database.`)
        }
            interaction.reply({ embeds: [embed], ephemeral: true });
        });
    
};

exports.info = {
    name: 'whitelist',
    description: 'Whitelist a user from the bot.',
    options: [
        {
            "name": "user",
            "description": "The user to whitelist.",
            "required": true,
            "type": 6
        }
      ]
}