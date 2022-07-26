const { SlashCommandBuilder, EmbedBuilder, escapeMarkdown } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Removes a specified track from the queue.')
        .addIntegerOption(option => option
            .setName('index')
            .setDescription('Which track would you like to remove?')
            .setRequired(true)),
    permissions: [],
    checks: ['IN_VC', 'SAME_VC', 'PLAYING', 'QUEUE'],
    async run (client, interaction, player) {
        const index = interaction.options.getInteger('index') - 1;
        const removedTrack = player.queue.splice(index, 1)[0];
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Removed' })
            .setDescription(`Removed track **${index + 1}** (**${escapeMarkdown(removedTrack.title)}** by **${escapeMarkdown(removedTrack.author)}**) from the queue.`)
            .setColor(client.config.color)
            .setFooter(client.config.footer);
        interaction.reply({ embeds: [embed], fetchReply: true }).then(x => player.cleanup.push(x));
    }
    
};
