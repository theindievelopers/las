const { Sequelize, DataTypes } = require("sequelize");
var sequelize = new Sequelize("BOOMDB", "root", "Qwer1234", {
  host: "localhost",
  port: 3307,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

const Employee = sequelize.define(
  "employee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost_allocation_site: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost_allocation_actual_job_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sponsorship: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
    },
    passport_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passport_date_of_issue: {
      type: DataTypes.DATE,
    },
    passport_expiry_date: {
      type: DataTypes.DATE,
    },
    residence_permit_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    residence_permit_expiry_date: {
      type: DataTypes.DATE,
    },
    residence_permit_blood_group: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_offer_doha_entry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    joining_date: {
      type: DataTypes.DATE,
    },
    increment_month: {
      type: DataTypes.INTEGER,
    },
    increment_amount: {
      type: DataTypes.DOUBLE,
    },
    basic: {
      type: DataTypes.DOUBLE,
    },
    general_allowance: {
      type: DataTypes.DOUBLE,
    },
    hra: {
      type: DataTypes.DOUBLE,
    },
    transportation_allowance: {
      type: DataTypes.DOUBLE,
    },
    tel_allow: {
      type: DataTypes.DOUBLE,
    },
    ticket_allowance: {
      type: DataTypes.DOUBLE,
    },
    food_allowance: {
      type: DataTypes.DOUBLE,
    },
    medical_allowance: {
      type: DataTypes.DOUBLE,
    },
    total: {
      type: DataTypes.DOUBLE,
    },
    leave_ticket_entitlement: {
      type: DataTypes.INTEGER,
    },
    leave_ticket_days_per_year: {
      type: DataTypes.INTEGER,
    },
    driving_license_issue_date: {
      type: DataTypes.DATE,
    },
    driving_license_expiry_date: {
      type: DataTypes.DATE,
    },
    health_card_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    health_card_issue_date: {
      type: DataTypes.DATE,
    },
    health_card_expiry_date: {
      type: DataTypes.DATE,
    },
    bank_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    card_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recruited_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accommodation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employee_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employment_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Employee;
