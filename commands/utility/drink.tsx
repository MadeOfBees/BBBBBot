const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, Role } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("drink")
    .setDescription("Drink a brewski."),
  async execute(interaction: typeof CommandInteraction) {
    const member = interaction.member;
    await interaction.reply(`${member.user.globalName} is drinking!`);
    const role = interaction.guild.roles.cache.find(
      (role: typeof Role) => role.name === "Drinking"
    );
    await member.roles.add(role);
    setTimeout(() => {
      member.roles.remove(role);
    }, 300000);
  },
};
