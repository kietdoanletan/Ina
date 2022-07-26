const { ActivityType } = require('discord.js');
module.exports = {
    token: '' || process.env.TOKEN,
    database_url: '' || process.env.KEYV,
    lavalink_nodes: [
        {
            name: '' || process.env.LAVALINK_NAME,
            url: '' || process.env.LAVALINK_URL,
            auth: '' || process.env.LAVALINK_AUTH,
            secure: false
        }        
    ],
    spotify: {
        clientId: '' || process.env.SPOTIFY_CLIENT_ID,
        clientSecret: '' || process.env.SPOTIFY_CLIENT_SECRET,
        searchMarket: '' || process.env.SPOTIFY_SEARCH_MARKET
    },
    // Stuff that you can't use a .env file for
    owners: ['275830234262142978'],
    defaultSearchEngine: 'youtube_music', // The default search engine that Lavalink uses to search
    defaultVolume: 50, // The default volume that Lavalink uses 
    url: 'https://inabot.tk', // The URL in the url fields of a lot of embeds. (Usually for author URL - but currently unused)
    color: '#af69ed', // The color of most embeds.
    errorColor: '#ad0000', // The color of error embeds.
    footer: { text: 'Ina, by thaddeuskkr • inabot.tk • v{version}', iconURL: '{avatar}' }, // The default footer used for embeds.
    disconnectTimeout: 300000, // An amount of time before the bot disconnects from the voice channel if there are no more tracks in queue. (In milliseconds),
    evalChannel: '998547486346051714', // The channel to evaluate things in.
    tracksPerPage: 10,
    presence: {
        status: 'idle', // The status of the bot. - online, idle, dnd, invisible
        activities: [
            {
                name: 'music • inabot.tk • /', // The name of the activity.
                type: ActivityType.PLAYING, // The type of the activity (ActivityType.[TYPE] - Playing, Competing, Listening, Watching, Streaming)
                url: 'https://inabot.tk' // The URL of the activity (if applicable).
            }
        ]
    },
    defaultEqualizer: [
        { band: 0, gain: 1 }, { band: 1, gain: 1 }, { band: 2, gain: -0.5 },
        { band: 3, gain: -0.25 }, { band: 4, gain: 0 }, { band: 5, gain: -0.0125 },
        { band: 6, gain: -0.025 }, { band: 7, gain: -0.0175 }, { band: 8, gain: 0 },
        { band: 9, gain: 0 }, { band: 10, gain: 0.0125 }, { band: 11, gain: 0.025 },
        { band: 12, gain: 0.375 }, { band: 13, gain: 0.125 }, { band: 14, gain: 0.125 }
    ],
    bassboost: {
        off: this.defaultEqualizer,
        low: [
            { band: 0, gain: 0.0625 }, { band: 1, gain: 0.125 }, { band: 2, gain: -0.125 }, 
            { band: 3, gain: -0.0625 }, { band: 4, gain: 0 }, { band: 5, gain: -0.0125 },
            { band: 6, gain: -0.025 }, { band: 7, gain: -0.0175 }, { band: 8, gain: 0 },
            { band: 9, gain: 0 }, { band: 10, gain: 0.0125 }, { band: 11, gain: 0.025 },
            { band: 12, gain: 0.375 }, { band: 13, gain: 0.125 }, { band: 14, gain: 0.125 }
        ],
        medium: [
            { band: 0, gain: 0.125 }, { band: 1, gain: 0.25 }, { band: 2, gain: -0.25 },
            { band: 3, gain: -0.125 }, { band: 4, gain: 0 }, { band: 5, gain: -0.0125 },
            { band: 6, gain: -0.025 }, { band: 7, gain: -0.0175 }, { band: 8, gain: 0 },
            { band: 9, gain: 0 }, { band: 10, gain: 0.0125 }, { band: 11, gain: 0.025 },
            { band: 12, gain: 0.375 }, { band: 13, gain: 0.125 }, { band: 14, gain: 0.125 }
        ],
        high: [
            { band: 0, gain: 0.1875 }, { band: 1, gain: 0.375 }, { band: 2, gain: -0.375 },
            { band: 3, gain: -0.1875 }, { band: 4, gain: 0 }, { band: 5, gain: -0.0125 },
            { band: 6, gain: -0.025 }, { band: 7, gain: -0.0175 }, { band: 8, gain: 0 },
            { band: 9, gain: 0 }, { band: 10, gain: 0.0125 }, { band: 11, gain: 0.025 },
            { band: 12, gain: 0.375 }, { band: 13, gain: 0.125 }, { band: 14, gain: 0.125 }
        ],
        earrape: [
            { band: 0, gain: 0.25 }, { band: 1, gain: 0.5 }, { band: 2, gain: -0.5 },
            { band: 3, gain: -0.25 }, { band: 4, gain: 0 }, { band: 5, gain: -0.0125},
            { band: 6, gain: -0.025 }, { band: 7, gain: -0.0175 }, { band: 8, gain: 0 },
            { band: 9, gain: 0 }, { band: 10, gain: 0.0125 }, { band: 11, gain: 0.025 },
            { band: 12, gain: 0.375 }, { band: 13, gain: 0.125 }, { band: 14, gain: 0.125 }
        ]
    }
};