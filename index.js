// import Staff from "./models/staff";
// import Designation from "./models/designation";

// Designation.findAll({})
//   .then((designations) => {
//     let designationCodes = JSON.parse(JSON.stringify(designations)).map((o) => {
//       return { id: o.id, code: o.code };
//     });
//     return designationCodes;
//   })
//   .then((des) => {
//     Staff.findAll({ where: { status: 1 } }).then((staffs) => {
//       staffs.map((s) => {
//         let data = JSON.parse(JSON.stringify(s));
//         data.designation = "a";
//         console.log(data);
//       });
//     });
//   });

import Employee from "./models/employee";

import express from "express";
import helmet from "helmet";

const app = express(helmet());

app.disable("x-powered-by");
app.disable("X-Content-Type-Options");
app.disable("Content-Security-Policy");
app.disable("Strict-Transport-Security");
app.disable("X-Download-Options");
app.disable("Cache-Control");
app.disable("X-Content-Type-Options");
app.disable("X-Frame-Options");
app.disable("X-XSS-Protection");

app.get("/employees", (req, res) => {
  Employee.findAll({}).then((employees) => {
    let employeeList = JSON.parse(JSON.stringify(employees));
    return res.send(employeeList);
  });
});

app.post("/", (req, res) => {
  return res.send("Received a POST HTTP method");
});

app.put("/", (req, res) => {
  return res.send("Received a PUT HTTP method");
});

app.delete("/", (req, res) => {
  return res.send("Received a DELETE HTTP method");
});

app.listen(3000, () => console.log(`Example app listening on port 3000`));
