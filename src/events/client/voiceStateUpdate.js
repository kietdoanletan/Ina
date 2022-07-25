module.exports = async (client, o, n) => {
    if (o.member.id !== client.user.id || n.member.id !== client.user.id) return;
    if (n.channelId === null && o.channelId !== null) {
        const player = client.kazagumo.players.get(o.guild.id);
        if (player && (player.state !== 5 && player.state !== 6)) client.kazagumo.destroyPlayer(o.guild.id);
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
};