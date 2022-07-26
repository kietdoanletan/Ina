const { SlashCommandBuilder, EmbedBuilder, escapeMarkdown } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('disconnect')
        .setDescription('Stops the player if there is anything playing, and disconnects the player from the voice channel.'),
    permissions: [],
    checks: ['IN_VC', 'SAME_VC'],
    async run (client, interaction, player) {
        if (!player) {
            const embed = new EmbedBuilder()
                .setAuthor({ name: 'Error' })
                .setDescription('There is no player for this server.')
                .setColor(client.config.errorColor)
                .setFooter(client.config.footer);
            if (interaction.guild.members.cache.get(client.user.id).voice.channelId) interaction.guild.members.cache.get(client.user.id).voice.disconnect();
            return interaction.reply({ embeds: [embed], fetchReply: true }).then(msg => setTimeout(() => { msg.delete(); }, 10000));
        }
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Disconnected' })
            .setDescription(`Disconnected from **${escapeMarkdown(client.channels.cache.get(player?.voiceId).name)}**.`)
            .setColor(client.config.color)
            .setFooter(client.config.footer);
        await player?.destroy();
        if (interaction.guild.members.cache.get(client.user.id).voice.channelId) interaction.guild.members.cache.get(client.user.id).voice.disconnect();
        for (const msg of player.cleanup) {
            if (msg.interaction && msg.interaction.replied) {
                await msg.interaction.deleteReply().catch(() => null);
            } else if (msg.replied && msg.replied == true) {
                await msg.deleteReply().catch(() => null);
            } else {
                await msg.delete().catch(() => null);
            }
        }
        interaction.reply({ embeds: [embed], fetchReply: true }).then(msg => setTimeout(() => { msg.delete(); }, 10000));
    }
};