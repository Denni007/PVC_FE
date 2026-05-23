const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");
const LoyaltyUser = require("./loyaltyUser");
const LoyaltyCoupon = require("./loyaltyCoupon");

const LoyaltyPointTransaction = sequelize.define(
  "LoyaltyPointTransaction",
  {
    from_user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    to_user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    coupone_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    point: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    invoice_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    invoice_amount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    invoice_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transaction_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "point_transaction",
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

LoyaltyUser.hasMany(LoyaltyPointTransaction, { foreignKey: "from_user_id", as: "sentPointTransactions" });
LoyaltyPointTransaction.belongsTo(LoyaltyUser, { foreignKey: "from_user_id", as: "fromUser" });

LoyaltyUser.hasMany(LoyaltyPointTransaction, { foreignKey: "to_user_id", as: "receivedPointTransactions" });
LoyaltyPointTransaction.belongsTo(LoyaltyUser, { foreignKey: "to_user_id", as: "toUser" });

LoyaltyCoupon.hasMany(LoyaltyPointTransaction, { foreignKey: "coupone_id", as: "pointTransactions" });
LoyaltyPointTransaction.belongsTo(LoyaltyCoupon, { foreignKey: "coupone_id", as: "coupon" });

module.exports = LoyaltyPointTransaction;
