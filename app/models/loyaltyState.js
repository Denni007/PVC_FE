const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");

const LoyaltyState = sequelize.define(
  "LoyaltyState",
  {
    state_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "states",
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

module.exports = LoyaltyState;
