import EmployeeModel from "./models/employee";

EmployeeModel.findAll({}).then((employees) => {
  let employeeList = JSON.parse(JSON.stringify(employees));
  return employeeList;
});