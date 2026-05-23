const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");
const Account = require("./Account");
const LoyaltyState = require("./loyaltyState");
const LoyaltyCity = require("./loyaltyCity");
const LoyaltyLanguage = require("./loyaltyLanguage");

const LoyaltyUser = sequelize.define(
  "LoyaltyUser",
  {
    company_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    referral_code: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    parent_referral_code: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile_number: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pin_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    language_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_role: {
      type: DataTypes.ENUM("distributor", "dealer", "retailer", "plumber", "admin"),
      allowNull: false,
    },
    user_status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      allowNull: false,
      defaultValue: "Active",
    },
    is_kyc: {
      type: DataTypes.ENUM("Y", "N"),
      allowNull: false,
      defaultValue: "N",
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

Account.hasMany(LoyaltyUser, { foreignKey: "accountId", as: "loyaltyUsers" });
LoyaltyUser.belongsTo(Account, { foreignKey: "accountId", as: "account" });

LoyaltyState.hasMany(LoyaltyUser, { foreignKey: "state_id", as: "loyaltyUsers" });
LoyaltyUser.belongsTo(LoyaltyState, { foreignKey: "state_id", as: "state" });

LoyaltyCity.hasMany(LoyaltyUser, { foreignKey: "city_id", as: "loyaltyUsers" });
LoyaltyUser.belongsTo(LoyaltyCity, { foreignKey: "city_id", as: "city" });

LoyaltyLanguage.hasMany(LoyaltyUser, { foreignKey: "language_id", as: "loyaltyUsers" });
LoyaltyUser.belongsTo(LoyaltyLanguage, { foreignKey: "language_id", as: "language" });

module.exports = LoyaltyUser;
