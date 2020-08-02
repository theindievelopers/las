import Employee from "./models/employee";
import Application from "./models/application";
import ImageUtility from "./utilities/image";

import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";

var multer = require("multer");
var signature = multer({ dest: "uploads/signature" });


const app = express(helmet());


app.use(cors())

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

// will make the uploaded files accessible
const path = require('path');
app.use(express.static(path.join(__dirname, 'uploads')))

/**
 * Fetch signature image to base64
 */
app.get("/fetch/signature", (req, res) => {
  try {
    Employee.findAll({ where: { ...req.query } })
      .then((employees) => {
        let employee = JSON.parse(JSON.stringify(employees));
        if (employee.length > 0) {
          let result = ImageUtility.toBase64(`${employee[0].signature}`);
          return res.send({ success: false, data: result });
        }
      })
      .catch((err) => {
        return res.send({ success: false, message: "Record not found!" });
      });
  } catch (err) {
    console.log("error out");
    return res.send({ success: false, message: err.message });
  }
});

/**
 * Upload signature
 */
app.post("/upload/signature", signature.single("upload_image"), (req, res) => {
  if (req.file && req.file.filename) {
    Employee.findOne({ where: { id: req.query.id } })
      .then((employee) => {
        if (employee) {
          employee
            .update(
              { signature: req.file.path },
              { where: { id: employee.id } }
            )
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
  }
});

/**
 * Employees
 */

// this will set the location of the uploaded file
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 'uploads/signature' - FILE SAVING DESTINATION
    cb(null, 'uploads/signature')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

// will call multer
const upload = multer({storage})

app.get("/employee", (req, res) => {
  Employee.findAll({ where: { ...req.query } }).then((employees) => {
    let employeeList = JSON.parse(JSON.stringify(employees));
    return res.json(employeeList);
  });
});

app.post("/employees", upload.single('signature'), (req, res) => {
  let imagepath =""
  if(req.file) {
    imagepath = "signature/" + req.file.filename
  } else {
    res.status("409").json('No File to uploads');
  }

  Employee.create({ ...req.body, signature: imagepath })
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
          .update(...req.body, { where: { id: employee.id } })
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
          .update(...req.body, { where: { id: application.id } })
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
