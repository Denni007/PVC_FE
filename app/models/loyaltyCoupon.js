const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");

const LoyaltyCoupon = sequelize.define(
  "LoyaltyCoupon",
  {
    coupone_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coupone_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coupone_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coupone_price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "coupone",
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

module.exports = LoyaltyCoupon;
