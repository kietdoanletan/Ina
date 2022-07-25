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
        const content = await fetch(changelog).then(res => res.text());
        interaction.reply({ content: `\`\`\`\n${content}\`\`\`` });
    }
};