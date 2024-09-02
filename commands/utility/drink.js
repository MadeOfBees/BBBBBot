const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("drink")
    .setDescription("Have a drink.")
    .addStringOption((option) =>
      option.setName("input").setDescription("The drink you are drinking.")
    ),
  async execute(interaction) {
    const member = interaction.member;
    const drink = interaction.options.getString("input");
    if (!drink) {
      await interaction.reply(`${member.user.globalName} is drinking!`);
    } else {
      switch (drink.toLowerCase()) {
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
      (role) => role.name === "Drinking"
    );
    await member.roles.add(role);
    setTimeout(() => {
      member.roles.remove(role);
    }, 300000);
  },
};

