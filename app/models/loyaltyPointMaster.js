const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");
const LoyaltyUser = require("./loyaltyUser");

const LoyaltyPointMaster = sequelize.define(
  "LoyaltyPointMaster",
  {
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    point: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transaction_point: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    earned_point: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    usable_point: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expired_point: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    redeem_point: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "point_master",
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

LoyaltyUser.hasOne(LoyaltyPointMaster, { foreignKey: "user_id", as: "pointMaster" });
LoyaltyPointMaster.belongsTo(LoyaltyUser, { foreignKey: "user_id", as: "user" });

module.exports = LoyaltyPointMaster;
