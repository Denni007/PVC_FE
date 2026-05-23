const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");
const LoyaltyUser = require("./loyaltyUser");

const LoyaltyKycDetail = sequelize.define(
  "LoyaltyKycDetail",
  {
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    aadhar_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pan_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gst_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aadhar_file: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pan_file: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gst_file: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "kyc_details",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

LoyaltyUser.hasOne(LoyaltyKycDetail, { foreignKey: "user_id", as: "kycDetail" });
LoyaltyKycDetail.belongsTo(LoyaltyUser, { foreignKey: "user_id", as: "user" });

module.exports = LoyaltyKycDetail;
