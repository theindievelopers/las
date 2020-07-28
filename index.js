import Employee from "./models/employee";
import Application from "./models/application";
import ImageUtility from "./utilities/image";

import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";

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

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

/**
 * Test endpoint only
 */

app.get("/test", (req, res) => {
  let f = "C:\\Users\\raihan\\Pictures\\COTDG\\game-bg-1.jpg";
  let result = ImageUtility.toBase64(f);
  return res.send(result);
});
/**
 * Employees
 */
app.get("/employee", (req, res) => {
  Employee.findAll({ where: { ...req.query } }).then((employees) => {
    let employeeList = JSON.parse(JSON.stringify(employees));
    return res.json(employeeList);
  });
});

app.post("/employees", (req, res) => {
  Employee.create({ ...req.body })
    .then((data) => {
      res.send({ success: true, data: data });
    })
    .catch((err) => res.send({ success: false, error: err.message }));
});

app.put("/employees", (req, res) => {
  Employee.findOne({ where: { id: req.query.id } })
    .then((employee) => {
      if (employee) {
        employee
          .update({ where: { id: employee.id }, ...req.body })
          .then((data) => {
            res.send({ success: true, data: data });
          })
          .catch((err) => {
            res.send({ success: false, error: err });
          });
      } else {
        res.send({
          success: false,
          error: `Object reference id ${req.query.id} not found.`,
        });
      }
    })
    .catch((err) => {
      res.send({ success: false, error: err });
    });
});

app.delete("/employees", (req, res) => {
  return res.send({ success: false, error: "DELETE not implemented yet!" });
});

/**
 * Application
 */
app.get("/application", (req, res) => {
  Application.findAll({ where: { ...req.query } }).then((application) => {
    let applicationList = JSON.parse(JSON.stringify(application));
    applicationList.map((application) => {
      application.application_data = JSON.parse(application.application_data);
    });
    return res.json(applicationList);
  });
});

app.post("/application", (req, res) => {
  let data = { ...req.body };
  data.application_data = JSON.stringify(data.application_data);
  Application.create(data)
    .then((data) => {
      res.send({ success: true, data: data });
    })
    .catch((err) => res.send({ success: false, error: err.message }));
});

app.put("/application", (req, res) => {
  Application.findOne({ where: { id: req.query.id } })
    .then((application) => {
      if (application) {
        application
          .update({ where: { id: application.id }, ...req.body })
          .then((data) => {
            res.send({ success: true, data: data });
          })
          .catch((err) => {
            res.send({ success: false, error: err });
          });
      } else {
        res.send({
          success: false,
          error: `Object reference id ${req.query.id} not found.`,
        });
      }
    })
    .catch((err) => {
      res.send({ success: false, error: err });
    });
});

app.delete("/application", (req, res) => {
  return res.send({ success: false, error: "DELETE not implemented yet!" });
});

app.listen(3000, () =>
  console.log(`Leave Approval System Applciation is running on port 3000`)
);
