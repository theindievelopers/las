const { Sequelize, DataTypes } = require("sequelize");
var sequelize = new Sequelize("boomdb", "root", "Qwer1234", {
  host: "localhost",
  port: 3307,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

const Ddlist = sequelize.define(
  "ddlist",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    ddcode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    ddval: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Ddlist;
