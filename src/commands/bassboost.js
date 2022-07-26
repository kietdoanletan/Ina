const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('bassboost')
        .setDescription('Changes the strength of the bass boost filter.')
        .addStringOption(option => option
            .setName('strength')
            .setDescription('The strength of the filter.')
            .addChoices(
                { name: 'off', value: 'off' },
                { name: 'low', value: 'low' },
                { name: 'medium', value: 'medium' },
                { name: 'high', value: 'high' },
                { name: 'earrape', value: 'earrape' }
            )
            .setRequired(true)),
    permissions: [],
    checks: ['IN_VC', 'SAME_VC', 'PLAYING'],
    async run (client, interaction, player) {
        const bb = interaction.options.getString('strength');
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Audio filters' })
            .setDescription(bb === 'off' ? 'Bass boost **disabled**.' : `Bass boost set to **${bb}**.`)
            .setColor(client.config.color)
            .setFooter(client.config.footer);
        interaction.reply({ embeds: [embed], fetchReply: true }).then(x => player.cleanup.push(x));
    }
    
};
