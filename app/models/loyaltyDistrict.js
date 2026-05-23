const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");
const LoyaltyState = require("./loyaltyState");

const LoyaltyDistrict = sequelize.define(
  "LoyaltyDistrict",
  {
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    district_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "districts",
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

LoyaltyState.hasMany(LoyaltyDistrict, { foreignKey: "state_id", as: "districts" });
LoyaltyDistrict.belongsTo(LoyaltyState, { foreignKey: "state_id", as: "state" });

module.exports = LoyaltyDistrict;
