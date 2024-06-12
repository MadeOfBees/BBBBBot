const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vape')
        .setDescription('Vape a bowl.'),
    async execute(interaction) {
        const member = interaction.member;
        console.log(member);
        await interaction.reply(`${member.user.globalName} is vaping a bowl.`);
        const role = interaction.guild.roles.cache.find(role => role.name === 'Vaping');
        await member.roles.add(role);
        setTimeout(() => {
            member.roles.remove(role);
        }, 300000);
    },
};