const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");

const LoyaltyLanguage = sequelize.define(
  "LoyaltyLanguage",
  {
    language_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "languages",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = LoyaltyLanguage;
