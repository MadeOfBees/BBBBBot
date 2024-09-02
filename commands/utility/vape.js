const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vape")
    .setDescription("Vape a bowlski.")
    .addStringOption((option) =>
      option.setName("input").setDescription("The vape you are using.")
    ),

  async execute(interaction) {
    const member = interaction.member;
    const vape = interaction.options.getString("input");
    if (!vape) {
      await interaction.reply(`${member.user.globalName} is vaping a bowlski!`);
    } else {
      switch (vape.toLowerCase()) {
        case "beer":
          await interaction.reply(
            `${member.user.globalName} is vaping a brewski! \n\nWait, what?`
          );
          break;
        default:
          await interaction.reply(
            `${member.user.globalName} is hitting the ${vape}!`
          );
          break;
      }
    }
    const role = interaction.guild.roles.cache.find(
      (role) => role.name === "Vaping"
    );
    await member.roles.add(role);
    setTimeout(() => {
      member.roles.remove(role);
    }, 300000);
  },
};