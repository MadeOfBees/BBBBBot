const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("drink")
    .setDescription("Have a drink.")
    .addStringOption((option: any) =>
      option.setName("input").setDescription("The drink you are drinking.")
    ),

  async execute(interaction: any) {
    const member = interaction.member;
    const drink: string = interaction.options.getString("input");
    if (!drink) {
      await interaction.reply(`${member.user.globalName} is drinking!`);
    } else {
      switch (drink) {
        case "beer":
          await interaction.reply(
            `${member.user.globalName} is drinking a brewski!`
          );
          break;
        case "vodka":
          await interaction.reply(`VODKA!!!`);
          break;
        default:
          await interaction.reply(
            `${member.user.globalName} is drinking ${drink}!`
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
