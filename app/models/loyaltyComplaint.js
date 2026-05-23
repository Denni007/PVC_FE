const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");
const LoyaltyUser = require("./loyaltyUser");

const LoyaltyComplaint = sequelize.define(
  "LoyaltyComplaint",
  {
    bill_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bill_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    bill_amount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    complain: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    file: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    complain_by: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Y", "N"),
      allowNull: false,
      defaultValue: "N",
    },
  },
  {
    tableName: "complaints",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

LoyaltyUser.hasMany(LoyaltyComplaint, { foreignKey: "complain_by", as: "complaints" });
LoyaltyComplaint.belongsTo(LoyaltyUser, { foreignKey: "complain_by", as: "complainBy" });

module.exports = LoyaltyComplaint;
