const { SlashCommandBuilder, EmbedBuilder, escapeMarkdown } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Searches for a song and plays it.')
        .addStringOption(option => option
            .setName('query')
            .setDescription('What would you like to listen to?')
            .setRequired(true))
        .addStringOption(option => option
            .setName('source')
            .setDescription('Where would you like to search?')
            .setRequired(false)
            .addChoices(
                { name: 'YouTube', value: 'youtube' },
                { name: 'YouTube Music', value: 'youtube_music' },
                { name: 'SoundCloud', value: 'soundcloud' },
                { name: 'Spotify (Converts to YouTube Music)', value: 'spotify' }
            )),
    permissions: [],
    checks: ['IN_VC', 'SAME_VC'],
    async run (client, interaction) {
        const query = interaction.options.getString('query');
        const source = interaction.options.getString('source'); // || 'spotify';

        await interaction.deferReply();

        let player = await client.kazagumo.createPlayer({
            guildId: interaction.guild.id,
            textId: interaction.channel.id,
            voiceId: interaction.member.voice.channel.id,
            deaf: true,
            // mute: true
        });

        // player.setVolume(client.config.defaultVolume); // preserves audio quality if unchanged
        
        if (!player.cleanup) player.cleanup = [];

        let res = await client.kazagumo.search(query, { requester: interaction.user, engine: source });
        const noResultsEmbed = new EmbedBuilder()
            .setAuthor({ name: 'No results found' })
            .setDescription(`There were no results found for your query (\`${query}\`).`)
            .setColor(client.config.errorColor)
            .setFooter(client.config.footer);
        if (!res.tracks.length) {
            client.logger.warn(`Search failed (${query}): ${JSON.stringify(res)}`);
            return interaction.editReply({ embeds: [noResultsEmbed], fetchReply: true }).then(x => player.cleanup.push(x));
        }

        if (res.type === 'PLAYLIST') for (let track of res.tracks) player.queue.add(track);
        else player.queue.add(res.tracks[0]);

        if (!player.playing && !player.paused) player.play();
        const embed = new EmbedBuilder()
            // .setAuthor({ name: 'Queued', iconURL: interaction.user.avatarURL({ size: 4096 }) })
            .setDescription(`${res.type === 'PLAYLIST' ? `Queued **${res.tracks.length} tracks** from **[${escapeMarkdown(res.playlistName)}](${query})**` : `Queued [**${escapeMarkdown(res.tracks[0].title)}** by **${escapeMarkdown(res.tracks[0].author)}**](${res.tracks[0].uri}).${player.queue.length > 0 ? ` Position in queue: **${player.queue.length}**` : ''}`} `)
            // .setFooter(client.config.footer)
            .setColor(client.config.color);
        return interaction.editReply({ embeds: [embed], fetchReply: true }).then(x => player.cleanup.push(x));
    }
};