const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");
const LoyaltyUser = require("./loyaltyUser");
const LoyaltyCoupon = require("./loyaltyCoupon");

const LoyaltyCouponRedeem = sequelize.define(
  "LoyaltyCouponRedeem",
  {
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    coupon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coupon_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coupone_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coupon_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    coupon_image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    points_used: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("redeemed", "used", "expired"),
      allowNull: false,
      defaultValue: "redeemed",
    },
    admin_approval: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    redeemed_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    used_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "coupon_redeem",
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

LoyaltyUser.hasMany(LoyaltyCouponRedeem, { foreignKey: "user_id", as: "couponRedeems" });
LoyaltyCouponRedeem.belongsTo(LoyaltyUser, { foreignKey: "user_id", as: "user" });

LoyaltyCoupon.hasMany(LoyaltyCouponRedeem, { foreignKey: "coupon_id", as: "redeems" });
LoyaltyCouponRedeem.belongsTo(LoyaltyCoupon, { foreignKey: "coupon_id", as: "coupon" });

module.exports = LoyaltyCouponRedeem;
