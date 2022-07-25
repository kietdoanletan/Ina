const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Changes the loop mode of the player.')
        .addStringOption(option => option
            .setName('mode')
            .setDescription('The new loop mode of the player.')
            .addChoices(
                { name: 'track (Loops the current track)', value: 'track' },
                { name: 'queue (Loops the whole queue)', value: 'queue' },
                { name: 'none (Disables loop completely)', value: 'none' }
            )
            .setRequired(true)),
    permissions: [],
    checks: ['IN_VC', 'SAME_VC', 'PLAYING'],
    async run (client, interaction, player) {
        player.setLoop(interaction.options.getString('mode'));
        let txt;
        if (player.loop === 'track') txt = 'Now looping the currently playing track.';
        else if (player.loop === 'queue') txt = 'Now looping the whole queue.';
        else if (player.loop === 'none') txt = 'Disabled loop.';
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Loop' })
            .setDescription(txt)
            .setColor(client.config.color)
            .setFooter(client.config.footer);
        interaction.reply({ embeds: [embed], fetchReply: true }).then(x => player.cleanup.push(x));
    }
    
};
