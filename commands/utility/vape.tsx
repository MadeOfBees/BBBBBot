const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, Role } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vape")
    .setDescription("Vape a bowlski."),
  async execute(interaction: typeof CommandInteraction) {
    const member = interaction.member;
    await interaction.reply(`${member.user.globalName} is vaping!`);
    const role = interaction.guild.roles.cache.find(
      (role: typeof Role) => role.name === "Vaping"
    );
    await member.roles.add(role);
    setTimeout(() => {
      member.roles.remove(role);
    }, 300000);
  },
};
