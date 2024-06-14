const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vape")
    .setDescription("Vape a bowlski.")
    .addStringOption((option: any) =>
      option.setName("input").setDescription("The vape you are using.")
    ),

  async execute(interaction: any) {
    const member = interaction.member;
    const vape: string = interaction.options.getString("input");
    if (!vape) {
      await interaction.reply(`${member.user.globalName} is vaping a bowlski!`);
    } else {
      switch (vape) {
        case "beer":
          await interaction.reply(
            `${member.user.globalName} is vaping a brewski! \n\n wait, what?`
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
      (role: any) => role.name === "Vaping"
    );
    await member.roles.add(role);
    setTimeout(() => {
      member.roles.remove(role);
    }, 300000);
  },
};
