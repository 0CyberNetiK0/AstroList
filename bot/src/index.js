const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');
const config = require('../config.json');
const mysql = require('mysql');

class BreadClient extends Client {
    constructor(options = {}) {
        super(options);
        this.commands = new Collection();
    }
}

const client = new BreadClient({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates], partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.Role, Partials.GuildMember, Partials.User, Partials.GuildInvites, Partials.ManageGuild], allowedMentions: { parse: ['users', 'roles', 'everyone'], repliedUser: true } });

const con = mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
});

con.getConnection((err, connection) => {
    if (connection) {
        console.log("Connected to MySQL database.");
    } else {
        console.log("Error connecting to MySQL database.");
    }
});

global.__basedir = __dirname;

const events = readdirSync(join(__dirname, `./`, `events`));
events.forEach(function(e) {
    const name = e.split('.')[0];
    const event = require(`./events/${e}`);
    client.on(name, event.bind(null, client, con));
    delete require.cache[require.resolve(`./events/${e}`)];
});

client.login(config.token);