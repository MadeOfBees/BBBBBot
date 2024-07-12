const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Roll a dice.")
    .addStringOption((option: any) =>
      option
        .setName("dicetype")
        .setDescription("The gif dicetype")
        .setRequired(true)
        .addChoices(
          { name: "d4", value: "d4" },
          { name: "d6", value: "d6" },
          { name: "d8", value: "d8" },
          { name: "d10", value: "d10" },
          { name: "d12", value: "d12" },
          { name: "d20", value: "d20" }
        )
    ),
  async execute(interaction: any) {
    const rollTheDice = (sides: number) => {
      return Math.floor(Math.random() * sides) + 1;
    };
    const dicetype: string = interaction.options.getString("dicetype") || "d6";
    let sideNum: number = parseInt(dicetype.slice(1));
    await interaction.reply(
      `You rolled a ${dicetype} and got a ${rollTheDice(sideNum)}!`
    );
  },
};
