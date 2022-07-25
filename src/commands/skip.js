const { SlashCommandBuilder, EmbedBuilder, escapeMarkdown } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the currently playing track.'),
    permissions: [],
    checks: ['IN_VC', 'SAME_VC', 'PLAYING'],
    async run (client, interaction, player) {
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Skipped' })
            .setDescription(`Skipped **${escapeMarkdown(player.queue.current.title)}** by **${escapeMarkdown(player.queue.current.author)}**.`)
            .setColor(client.config.color)
            .setFooter(client.config.footer);
        await player.skip();
        interaction.reply({ embeds: [embed], fetchReply: true }).then(x => player.cleanup.push(x));
    }
};
