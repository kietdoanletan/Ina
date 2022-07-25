const changelog = 'https://pastebin.com/raw/XfJENnz2';
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('changelog')
        .setDescription('Shows you the changelog.'),
    permissions: [],
    checks: [],
    async run (client, interaction) {
        await interaction.reply('*Fetching changelog...*');
        const content = await fetch(changelog).then(res => res.text());
        const parsed = content.split('<->');
        const end = parsed.splice(-1, 1)[0];
        const final = parsed.slice(0, 9);
        final.push(end);
        const msg = final.join('');
        interaction.editReply(msg);
    }
};