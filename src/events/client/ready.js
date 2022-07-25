module.exports = async (client) => {
    client.logger.success(`Logged in as ${client.user.tag}`);
    client.config.footer.text = client.config.footer.text.replace('{version}', require('../../../package.json').version);
    client.config.footer.iconURL = client.config.footer.iconURL.replace('{avatar}', client.user.avatarURL({ size: 4096 }));
    await client.user.setPresence(client.config.presence);
    client.ready = true;
    client.logger.info('Startup tasks complete.');
};