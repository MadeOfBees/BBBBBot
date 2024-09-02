const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rundnd")
    .setDescription("Gets json from new DnD api with character ID.")
    .addStringOption((option) =>
      option.setName("input").setDescription("Character ID.")
    ),
  async execute(interaction) {
    const characterID = interaction.options.getString("input");
    const parsedInput = async function (input) {
      if (!input.includes("/")) return input;
      const firstInputSplit = input.split("dndbeyond.com/characters/");
      const secondInputSplit = firstInputSplit[1].split("/");
      return secondInputSplit[0];
    };
    if (!characterID) {
      await interaction.reply(`Please provide a character ID.`);
    } else {
      const response = await fetch(
        `https://character-service.dndbeyond.com/character/v5/character/${await parsedInput(characterID)}`
      );
      const html = await response.json();
      if (html.data.name === undefined) {
        await interaction.reply(`Character ID not found.`);
        return;
      }
      await interaction.reply(JSON.stringify(html));
    }
  }
};