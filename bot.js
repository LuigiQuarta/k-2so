const Discord = require('discord.io');
const dotenv = require('dotenv');

const BOT_TRIGGER_CHARACTER = '!';

dotenv.config();

// BOT definition
const bot = new Discord.Client({
   token: process.env.DISCORD_AUTH_TOKEN,
   autorun: true
});

// BOT startup
bot.on('ready', function (evt) {
    console.log('Connected');
    console.log('Logged in as: ');
    console.log(bot.username + ' - (' + bot.id + ')');
});

// BOT message handling
bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == BOT_TRIGGER_CHARACTER) {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);

        switch(cmd) {
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            case 'slap':
                bot.sendMessage({
                    to: channelID,
                    message: bot.username + ' slaps ' + 'Ayeye' + ' with a troute!' 
                });
                break;
            case '8ball':
                var message = getMagic8BallResponse();
                bot.sendMessage({
                    to: channelID,
                    message: message
                });
                break;
            case 'leave':
                var message = 'Goodbye!';
                bot.sendMessage({
                    to: channelID,
                    message: message
                });
                bot.disconnect()
                break;

        }
    }
});

function getMagic8BallResponse() {
    const magic8BallResponses = [
        'It is certain.',
        'It is decidedly so.',
        'Without a doubt.',
        'Yes – definitely.',
        'You may rely on it.',
        'As I see it, yes.',
        'Most likely.',
        'Outlook good.',
        'Yes.',
        'Signs point to yes.',
        'Reply hazy, try again.',
        'Ask again later.',
        'Better not tell you now.',
        'Cannot predict now.',
        'Concentrate and ask again.',
        'Don\'t count on it.',
        'My reply is no.',
        'My sources say no.',
        'Outlook not so good.',
        'Very doubtful.'
    ];

    const responseIndex = Math.floor(Math.random() * (magic8BallResponses.length - 1));

    return magic8BallResponses[responseIndex];
}

function getCommandList() {
    const commands = [
        {
            command: '!ping',
            description: 'Checks the bot status with a simple ping protocol implementation'
        },
        {
            command: '!slap [username]',
            description: 'Slaps the specified user'
        },
        {
            command: '!8ball [question]',
            description: 'Provides an answer for your question'
        },
        {
            command: '!leave',
            description: 'Leaves the channel'
        }
    ]
}