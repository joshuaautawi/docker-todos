"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  todo.init(
    {
      activity_group_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      is_active: DataTypes.CHAR,
      priority: DataTypes.ENUM(
        "very-high",
        "high",
        "medium",
        "low",
        "very-low"
      ),
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "todo",
      timestamps: false,
    }
  );
  return todo;
};
