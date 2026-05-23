const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");
const LoyaltyState = require("./loyaltyState");

const LoyaltyCity = sequelize.define(
  "LoyaltyCity",
  {
    city_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "cities",
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

LoyaltyState.hasMany(LoyaltyCity, { foreignKey: "state_id", as: "cities" });
LoyaltyCity.belongsTo(LoyaltyState, { foreignKey: "state_id", as: "state" });

module.exports = LoyaltyCity;
