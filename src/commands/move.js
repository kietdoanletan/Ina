const { SlashCommandBuilder, EmbedBuilder, escapeMarkdown } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('move')
        .setDescription('Moves a specified track to a new position in the queue.')
        .addIntegerOption(option => option
            .setName('oldindex')
            .setDescription('Which track would you like to move?')
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('newindex')
            .setDescription('Where would you like to move it to?')
            .setRequired(true)),
    permissions: [],
    checks: ['IN_VC', 'SAME_VC', 'PLAYING', 'QUEUE'],
    async run (client, interaction, player) {
        const oldIndex = interaction.options.getInteger('oldindex');
        const newIndex = interaction.options.getInteger('newindex');
        player.queue = array_move(player.queue, oldIndex - 1, newIndex - 1);
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Moved' })
            .setDescription(`Moved **${escapeMarkdown(player.queue[newIndex - 1].title)}** by **${escapeMarkdown(player.queue[newIndex - 1].author)}** to position **${newIndex}** in the queue.`)
            .setColor(client.config.color)
            .setFooter(client.config.footer);
        interaction.reply({ embeds: [embed], fetchReply: true }).then(x => player.cleanup.push(x));
        function array_move(arr, old_index, new_index) {
            while (old_index < 0) {
                old_index += arr.length;
            }
            while (new_index < 0) {
                new_index += arr.length;
            }
            if (new_index >= arr.length) {
                var k = new_index - arr.length + 1;
                while (k--) {
                    arr.push(undefined);
                }
            }
            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
            return arr;
        }
    }
    
};
