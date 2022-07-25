const { EmbedBuilder, escapeMarkdown } = require('discord.js');
module.exports = async (client, player, track) => {
    const embed = new EmbedBuilder()
        .addFields([
            { name: 'Now playing', value: `[${escapeMarkdown(track.title)} - ${escapeMarkdown(track.author)}](${track.uri}) \`${client.util.formatTime(track.length, track.isStream)}\` (${track.requester.toString()})`, inline: false },
            { name: 'Next in queue', value: player.queue.length > 0 ? `${escapeMarkdown(player.queue[0].title)} - ${escapeMarkdown(player.queue[0].author)} (${player.queue[0].requester.toString()})` : '*No tracks in queue*', inline: false }
        ])
        .setFooter(client.config.footer)
        .setThumbnail(track.thumbnail)
        .setColor(client.config.color);
    player.commandStop = false;
    client.channels.cache.get(player.textId)?.send({ embeds: [embed] }).then(x => player.cleanup.push(x));
};