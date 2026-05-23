const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");
const LoyaltyUser = require("./loyaltyUser");

const LoyaltyPersonalDetail = sequelize.define(
  "LoyaltyPersonalDetail",
  {
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    wife_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    wife_birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    children_1_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    children_1_birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    children_2_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    children_2_birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    tableName: "personal_details",
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

LoyaltyUser.hasOne(LoyaltyPersonalDetail, { foreignKey: "user_id", as: "personalDetail" });
LoyaltyPersonalDetail.belongsTo(LoyaltyUser, { foreignKey: "user_id", as: "user" });

module.exports = LoyaltyPersonalDetail;
