const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rundnd")
    .setDescription("Gets json from new DnD api with character ID.")
    .addStringOption((option: any) =>
      option.setName("input").setDescription("Character ID.")
    ),
  // fetch data from DnD api (https://character-service.dndbeyond.com/character/v5/character/${CHARACTER_ID}) with Bun's fetch function
  async execute(interaction: any) {
    const characterID: string = interaction.options.getString("input");
    if (!characterID) {
      await interaction.reply(`Please provide a character ID.`);
    } else {
      const response: any = await fetch(
        `https://character-service.dndbeyond.com/character/v5/character/${characterID}`
      );
      const html: any = await response.json();
      const statNames: string[] = [
        "Strength",
        "Dexterity",
        "Constitution",
        "Intelligence",
        "Wisdom",
        "Charisma",
      ];
      const alignments: string[] = [
        "Lawful Good",
        "Neutral Good",
        "Chaotic Good",
        "Lawful Neutral",
        "True Neutral",
        "Chaotic Neutral",
        "Lawful Evil",
        "Neutral Evil",
        "Chaotic Evil",
      ];
      const lifestyles: string[] = [
        "Wretched",
        "Squalid",
        "Poor",
        "Modest",
        "Comfortable",
        "Wealthy",
        "Aristocratic",
      ];

      type CharacterDataInputs = {
        name: string;
        socialName: string;
        gender: string;
        faith: string;
        age: number;
        hair: string;
        eyes: string;
        skin: string;
        height: string;
        weight: string;
        inspiration: string;
        baseHitPoints: number;
        currentXp: number;
        alignmentId: number;
        lifestyleId: number;
        stats: { name: string; value: number; id: number }[];
        bonusStats: { name: string; value: number; id: number }[];
        overrideStats: { name: string; value: number; id: number }[];
      };
      const characterData: CharacterDataInputs = {
        name: html.data.name,
        socialName: html.data.social,
        gender: html.data.gender,
        faith: html.data.faith,
        age: html.data.age,
        hair: html.data.hair,
        eyes: html.data.eyes,
        skin: html.data.skin,
        height: html.data.height,
        weight: html.data.weight,
        inspiration: html.data.inspiration,
        baseHitPoints: html.data.baseHitPoints,
        currentXp: html.data.currentXp,
        alignmentId: html.data.alignmentId,
        lifestyleId: html.data.lifestyleId,
        stats: html.data.stats,
        bonusStats: html.data.bonusStats,
        overrideStats: html.data.overrideStats,
      };
      const alignment: string =
        characterData.alignmentId !== undefined
          ? alignments[characterData.alignmentId - 1] || "Unknown"
          : "Unknown";
      const lifestyle: string =
        characterData.lifestyleId !== undefined
          ? lifestyles[characterData.lifestyleId - 1] || "Unknown"
          : "Unknown";

      const reply = `Character data for ${characterData.name}: \nGender: ${
        characterData.gender
      }\nFaith: ${characterData.faith}\nAge: ${characterData.age}\nHair: ${
        characterData.hair
      }\nEyes: ${characterData.eyes}\nSkin: ${characterData.skin}\nHeight: ${
        characterData.height
      }\nWeight: ${characterData.weight}\nInspiration: ${
        characterData.inspiration
      }\nBase Hit Points: ${
        characterData.baseHitPoints
      }\nAlignment: ${alignment}\nLifestyle: ${lifestyle}\nCurrent XP: ${
        characterData.currentXp
      }\nStats:\n${
        characterData.stats
          ?.map((stat) => `${statNames[stat.id - 1]}: ${stat.value}`)
          .join("\n") ?? ""
      }
      ${
        characterData.bonusStats.some((stat) => stat.value !== null)
          ? `\nBonus Stats:\n${characterData.bonusStats
              .map((stat) => `${statNames[stat.id - 1]}: ${stat.value}`)
              .join("\n")}`
          : ""
      }${
        characterData.overrideStats.some((stat) => stat.value !== null)
          ? `\nOverride Stats:\n${characterData.overrideStats
              .map((stat) => `${statNames[stat.id - 1]}: ${stat.value}`)
              .join("\n")}`
          : ""
      }
      `;
      await interaction.reply(reply);
    }
  },
};
