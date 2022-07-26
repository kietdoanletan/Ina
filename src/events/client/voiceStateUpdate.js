const { EmbedBuilder } = require('discord.js');
module.exports = async (client, o, n) => {
    if (o.member.id !== client.user.id || n.member.id !== client.user.id) return;
    if (n.channelId === null && o.channelId !== null) {
        const player = client.kazagumo.players.get(o.guild.id);
        if (player) {
            client.kazagumo.destroyPlayer(o.guild.id);
            const embed = new EmbedBuilder()
                .setDescription('*I was disconnected from the voice channel, and destroyed the player automatically.*')
                .setColor(client.config.color)
                .setFooter(client.config.footer);
            client.channels.cache.get(player.textId)?.send({ embeds: [embed] });
            for (const msg of player.cleanup) {
                if (msg.interaction && msg.interaction.replied) {
                    await msg.interaction.deleteReply().catch(() => null);
                } else if (msg.replied && msg.replied == true) {
                    await msg.deleteReply().catch(() => null);
                } else {
                    await msg.delete().catch(() => null);
                }
            }
        }
    }
};