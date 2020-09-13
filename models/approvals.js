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

const Approvals = sequelize.define(
  "approvals",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    collateid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    approver_id: {
      type: DataTypes.STRING, //employee code
      allowNull: false,
    },
    application_type: {
      type: DataTypes.STRING, //employee code
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Approvals;
