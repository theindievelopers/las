/**
 * TODO:
 * 4. Account locking after 3 invalid attempts
 * 5. Password reset
 * 6. Email password reset
 * 7. Email forgot password
 */

import moment from "moment";
import { v4 as uuidv4 } from "uuid";

import Employee from "./models/employee";
import Application from "./models/application";
import Approvals from "./models/approvals";
import Logs from "./models/applog";
import Users from "./models/users";
import Comments from "./models/comments";
import ApplicationForm from "./models/application_form";
import Increments from "./models/increments";
import Ddlist from "./models/ddlist";

import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";

var multer = require("multer");
var signature = multer({ dest: "uploads/signature" });

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

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

function currentUser(auth) {
  let data = Buffer.from(auth.split(" ")[1], "base64").toString().split(":");
  return { username: data[0], password: data[1] };
}

/**
 * Fetch signature image to base64
 */
app.get("/fetch/signature", (req, res) => {
  try {
    Employee.findAll({ where: { ...req.query } })
      .then((employees) => {
        let employee = JSON.parse(JSON.stringify(employees));
        if (employee.length > 0) {
          res.set({ "Content-Type": "image/png" });
          res.sendFile(__dirname + "\\" + `${employee[0].signature}`);
        }
      })
      .catch((err) => {
        createLog(
          "FETCHSIGNATURE",
          `FETCHSIGNATUREFAILED-${req.query.id || "IDNOTFOUND"}`,
          JSON.stringify({ ...req.query }),
          "LAS",
          (auth && auth.username !== "" && auth.username) || "system"
        );
        return res.send({ success: false, message: "Record not found!" });
      });
  } catch (err) {
    createLog(
      "FETCHSIGNATURE",
      `ERROR-${req.query.id || "IDNOTFOUND"}`,
      JSON.stringify(err),
      "LAS",
      (auth && auth.username !== "" && auth.username) || "system"
    );
    return res.send({ success: false, message: err.message });
  }
});

/**
 * Upload signature
 */
app.post("/upload/signature", signature.single("upload_image"), (req, res) => {
  let auth = currentUser(req.headers.authorization);
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
              createLog(
                "UPLOADSIGNATURE",
                `UPLOADSIGNATURESUCCESS-${req.query.id || "IDNOTFOUND"}`,
                JSON.stringify({ ...req.query }),
                "LAS",
                (auth && auth.username !== "" && auth.username) || "system"
              );
              res.send({ success: true, data: data });
            })
            .catch((err) => {
              createLog(
                "UPLOADSIGNATURE",
                `UPLOADSIGNATUREFAILED-${req.query.id || "IDNOTFOUND"}`,
                JSON.stringify(err),
                "LAS",
                (auth && auth.username !== "" && auth.username) || "system"
              );
              res.send({ success: false, error: err });
            });
        } else {
          createLog(
            "UPLOADSIGNATURE",
            `NOTFOUND-${req.query.id || "IDNOTFOUND"}`,
            JSON.stringify({ ...req.query }),
            "LAS",
            (auth && auth.username !== "" && auth.username) || "system"
          );
          res.send({
            success: false,
            error: `Object reference id ${req.query.id} not found.`,
          });
        }
      })
      .catch((err) => {
        createLog(
          "UPLOADSIGNATURE",
          `NOTFOUND-${req.query.id || "IDNOTFOUND"}`,
          JSON.stringify(err),
          "LAS",
          (auth && auth.username !== "" && auth.username) || "system"
        );
        res.send({ success: false, error: err });
      });
  }
});

/**
 * Comments
 */
app.get("/comments", (req, res) => {
  Comments.findAll({ where: { ...req.query } }).then((comment) => {
    let commentsList = JSON.parse(JSON.stringify(comment));
    return res.json(commentsList);
  });
});

app.post("/comments", (req, res) => {
  let auth = currentUser(req.headers.authorization);
  let data = { ...req.body };
  console.log(data);
  data.createdAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  data.updatedAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  Comments.create(data)
    .then((data) => {
      createLog(
        "CREATECOMMENTS",
        `CREATECOMMENTSSUCCESS-${req.query.id || "IDNOTFOUND"}`,
        JSON.stringify(data),
        "LAS",
        (auth && auth.username !== "" && auth.username) || "system"
      );
      res.send({ success: true, data: data });
    })
    .catch((err) => {
      createLog(
        "CREATECOMMENTS",
        `CREATECOMMENTSFAILED-${req.query.id || "IDNOTFOUND"}`,
        JSON.stringify(err),
        "LAS",
        (auth && auth.username !== "" && auth.username) || "system"
      );
      res.send({ success: false, error: err.message });
    });
});

/**
 * ddlist
 */
app.get("/ddlist", (req, res) => {
  Ddlist.findAll({ where: { ...req.query }, order: [["id", "ASC"]] }).then(
    (ddlist) => {
      let ddlistList = JSON.parse(JSON.stringify(ddlist));
      return res.json(ddlistList);
    }
  );
});

app.post("/ddlist", (req, res) => {
  let auth = currentUser(req.headers.authorization);
  let data = { ...req.body };
  data.createdAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  data.updatedAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  Ddlist.create(data)
    .then((data) => {
      createLog(
        "CREATEDDLISTS",
        `CREATEDDLISTSSUCCESS-${req.query.id || "IDNOTFOUND"}`,
        JSON.stringify(data),
        "LAS",
        (auth && auth.username !== "" && auth.username) || "system"
      );
      res.send({ success: true, data: data });
    })
    .catch((err) => {
      createLog(
        "CREATEDDLISTS",
        `CREATEDDLISTSFAILED-${req.query.id || "IDNOTFOUND"}`,
        JSON.stringify(err),
        "LAS",
        (auth && auth.username !== "" && auth.username) || "system"
      );
      res.send({ success: false, error: err.message });
    });
});

/**
 * increments
 */
app.get("/increments", (req, res) => {
  Increments.findAll({ where: { ...req.query }, order: [["id", "ASC"]] }).then(
    (increments) => {
      let incrementsList = JSON.parse(JSON.stringify(increments));
      return res.json(incrementsList);
    }
  );
});

app.post("/increments", (req, res) => {
  let auth = currentUser(req.headers.authorization);
  let data = { ...req.body };
  data.createdAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  data.updatedAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  Increments.create(data)
    .then((data) => {
      createLog(
        "CREATEINCREMENTS",
        `CREATEINCREMENTSSUCCESS-${req.query.id || "IDNOTFOUND"}`,
        JSON.stringify(data),
        "LAS",
        (auth && auth.username !== "" && auth.username) || "system"
      );
      res.send({ success: true, data: data });
    })
    .catch((err) => {
      createLog(
        "CREATEINCREMENTS",
        `CREATEINCREMENTSFAILED-${req.query.id || "IDNOTFOUND"}`,
        JSON.stringify(err),
        "LAS",
        (auth && auth.username !== "" && auth.username) || "system"
      );
      res.send({ success: false, error: err.message });
    });
});

/**
 * Users
 */
app.post("/users", (req, res) => {
  Users.findAll({ where: { ...req.query } }).then((user) => {
    let userList = JSON.parse(JSON.stringify(user));
    return res.json(userList);
  });
});

app.post("/users/create", (req, res) => {
  let auth = currentUser(req.headers.authorization);
  let data = { ...req.body };
  data.createdAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  data.updatedAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  Users.create(data)
    .then((data) => {
      createLog(
        "CREATEUSERS",
        `CREATEUSERSSUCCESS-${req.query.id || "IDNOTFOUND"}`,
        JSON.stringify(data),
        "LAS",
        (auth && auth.username !== "" && auth.username) || "system"
      );
      res.send({ success: true, data: data });
    })
    .catch((err) => {
      createLog(
        "CREATEUSERS",
        `CREATEUSERSFAILED-${req.query.id || "IDNOTFOUND"}`,
        JSON.stringify(err),
        "LAS",
        (auth && auth.username !== "" && auth.username) || "system"
      );
      res.send({ success: false, error: err.message });
    });
});

app.put("/users", (req, res) => {
  let auth = currentUser(req.headers.authorization);
  let data = { ...req.body };
  Users.findOne({ where: { id: req.query.id } })
    .then((user) => {
      if (user) {
        user
          .update(data, { where: { id: user.id } })
          .then((data) => {
            createLog(
              "UPDATEUSERS",
              `UPDATEUSERSSUCCESS-${req.query.id}`,
              JSON.stringify(data),
              "LAS",
              (auth && auth.username !== "" && auth.username) || "system"
            );
            res.send({ success: true, data: data });
          })
          .catch((err) => {
            createLog(
              "UPDATEUSERS",
              `UPDATEUSERSFAILED-${req.query.id}`,
              JSON.stringify(err),
              "LAS",
              (auth && auth.username !== "" && auth.username) || "system"
            );
            res.send({ success: false, error: err });
          });
      } else {
        createLog(
          "UPDATEUSERS",
          `NOTFOUND-${req.query.id}`,
          JSON.stringify({ ...req.body }),
          "LAS",
          (auth && auth.username !== "" && auth.username) || "system"
        );
        res.send({
          success: false,
          error: `Object reference id ${req.query.id} not found.`,
        });
      }
    })
    .catch((err) => {
      createLog(
        "UPDATEUSERS",
        `ERROR-${req.query.id}`,
        JSON.stringify(err),
        "LAS",
        (auth && auth.username !== "" && auth.username) || "system"
      );
      res.send({ success: false, error: err });
    });
});


/**
 * Login
 */
app.post("/login", (req, res) => {
  let auth = currentUser(req.headers.authorization);
  let { username, password } = { ...req.body };
  Users.findAll({ where: { username, password } }).then((user) => {
    let usersList = JSON.parse(JSON.stringify(user));
    if (usersList.length > 0) {
      createLog(
        "LOGIN",
        `LOGINSUCCESS-${username}`,
        JSON.stringify({ ...req.body }),
        "LAS",
        (auth && auth.username !== "" && auth.username) || "system"
      );
      let user = usersList[0];
      res.send({
        success: true,
        data: {
          employeecode: user.employeecode,
          fullname: user.fullname,
          designation: user.designation,
          accesslvl: user.accesslevel,
        },
      });
    } else {
      createLog(
        "LOGIN",
        `LOGINSFAILED-${username}`,
        JSON.stringify({ ...req.body }),
        "LAS",
        (auth && auth.username !== "" && auth.username) || "system"
      );
      res.send({ success: false });
    }
  });
});

/**
 * Employees
 */
app.get("/employee", (req, res) => {
  Employee.findAll({ where: { ...req.query }, order: [["id", "ASC"]] }).then(
    (employees) => {
      let employeeList = JSON.parse(JSON.stringify(employees));
      return res.json(employeeList);
    }
  );
});

app.post("/employees", (req, res) => {
  let auth = currentUser(req.headers.authorization);
  let data = { ...req.body };
  data.createdAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  data.updatedAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  Employee.create(data)
    .then((data) => {
      createLog(
        "CREATEEMPLOYEE",
        `CREATEEMPLOYEESUCCESS-${req.query.id || "IDNOTFOUND"}`,
        JSON.stringify(data),
        "LAS",
        (auth && auth.username !== "" && auth.username) || "system"
      );
      res.send({ success: true, data: data });
    })
    .catch((err) => {
      createLog(
        "CREATEEMPLOYEE",
        `CREATEEMPLOYEEFAILED-${req.query.id || "IDNOTFOUND"}`,
        JSON.stringify(err),
        "LAS",
        (auth && auth.username !== "" && auth.username) || "system"
      );
      res.send({ success: false, error: err.message });
    });
});

app.put("/employees", (req, res) => {
  let auth = currentUser(req.headers.authorization);
  Employee.findOne({ where: { id: req.query.id } })
    .then((employee) => {
      if (employee) {
        employee
          .update({ ...req.body }, { where: { id: employee.id } })
          .then((data) => {
            createLog(
              "UPDATEEMPLOYEE",
              `UPDATEEMPLOYEESUCCECSS-${req.query.id}`,
              JSON.stringify(data),
              "LAS",
              (auth && auth.username !== "" && auth.username) || "system"
            );
            res.send({ success: true, data: data });
          })
          .catch((err) => {
            createLog(
              "UPDATEEMPLOYEE",
              `UPDATEEMPLOYEEFAILED-${req.query.id}`,
              JSON.stringify(err),
              "LAS",
              (auth && auth.username !== "" && auth.username) || "system"
            );
            res.send({ success: false, error: err });
          });
      } else {
        createLog(
          "CREATE_EMPLOYEE",
          `NOTFOUND-${req.query.id}`,
          JSON.stringify({ ...req.body }),
          "LAS",
          (auth && auth.username !== "" && auth.username) || "system"
        );
        res.send({
          success: false,
          error: `Object reference id ${req.query.id} not found.`,
        });
      }
    })
    .catch((err) => {
      createLog(
        "UPDATEEMPLOYEE",
        `ERROR-${req.query.id}`,
        JSON.stringify(err),
        "LAS",
        (auth && auth.username !== "" && auth.username) || "system"
      );
      res.send({ success: false, error: err });
    });
});

app.delete("/employees", (req, res) => {
  createLog(
    "DELETEEMPLOYEES",
    `DELETEEMPLOYEESATTEMPT-${req.query.id}`,
    JSON.stringify({ ...req.query }),
    "LAS",
    (auth && auth.username !== "" && auth.username) || "system"
  );
  return res.send({ success: false, error: "DELETE not implemented yet!" });
});

/**
 * Logs
 */
async function createLog(
  action,
  collateid,
  data,
  application_source,
  createdBy
) {
  let logdata = { action, collateid, data, obj: application_source, createdBy };
  logdata.createdAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  logdata.updatedAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  Logs.create(logdata)
    .then((data) => {
      return { success: true, data: data };
    })
    .catch((err) => {
      return { success: false, error: err.message };
    });
}

app.get("/logs", (req, res) => {
  Logs.findAll({ where: { ...req.query } }).then((log) => {
    let logsList = JSON.parse(JSON.stringify(log));
    return res.json(logsList);
  });
});

/**
 * ApplicationForm
 */
app.get("/applicationform", (req, res) => {
  ApplicationForm.findAll({ where: { ...req.query } }).then(
    (applicationForm) => {
      let applicationFormList = JSON.parse(JSON.stringify(applicationForm));
      applicationFormList.map((applicationForm) => {
        applicationForm.data = JSON.parse(applicationForm.data);
      });
      return res.json(applicationFormList);
    }
  );
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
  let auth = currentUser(req.headers.authorization);
  let data = { ...req.body };
  data.collateid = uuidv4();
  data.createdAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  data.updatedAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  data.application_data = JSON.stringify(data.application_data);
  Application.create(data)
    .then((data) => {
      createLog(
        "CREATEAPPLICATION",
        `CREATEAPPLICATIONSUCCESS-${data.collateid}`,
        JSON.stringify(data),
        "LAS",
        (auth && auth.username !== "" && auth.username) || "system"
      );
      return data;
      //res.send({ success: true, data: data });
    })
    .then(() => {
      // Fetch all reaquired signatories
      ApplicationForm.findAll({ where: { code: data.application_form_code } })
        .then((applicationForm) => {
          let applicationFormList = JSON.parse(JSON.stringify(applicationForm));
          applicationFormList.map((applicationForm) => {
            applicationForm.data = JSON.parse(applicationForm.data);
          });
          return applicationFormList;
        })
        .then((appform) => {
          data.application_data = JSON.parse(data.application_data);
          let approvers = appform[0].data.approvers;
          approvers.immediate_supervisor =
            data.application_data.immediate_supervisor;
          approvers.project_manager = data.application_data.project_manager;

          Object.keys(approvers).map((k, v) => {
            Approvals.create({
              collateid: data.collateid,
              approver_id: approvers[k],
              application_type: data.application_form_code,
              status: "PENDING",
              createdBy: "system",
              updatedBy: "system",
            });
          });
        })
        .then(() => {
          res.send(data);
        });
    })
    .catch((err) => {
      createLog(
        "CREATE_EMPLOYEE",
        `CREATEAPPLICATIONFAILED-${data.collateid}`,
        JSON.stringify(err),
        "LAS",
        (auth && auth.username !== "" && auth.username) || "system"
      );
      res.send({ success: false, error: err.message });
    });
});

app.put("/application", (req, res) => {
  let auth = currentUser(req.headers.authorization);
  let data = { ...req.body };
  data.application_data = JSON.stringify(data.application_data);
  Application.findOne({ where: { id: req.query.id } })
    .then((application) => {
      if (application) {
        application
          .update(data, { where: { id: application.id } })
          .then((data) => {
            createLog(
              "UPDATEAPPLICATION",
              `UPDATEAPPLICATIONSUCCESS-${req.query.id}`,
              JSON.stringify(data),
              "LAS",
              (auth && auth.username !== "" && auth.username) || "system"
            );
            res.send({ success: true, data: data });
          })
          .catch((err) => {
            createLog(
              "UPDATEAPPLICATION",
              `UPDATEAPPLICATIONFAILED-${req.query.id}`,
              JSON.stringify(err),
              "LAS",
              (auth && auth.username !== "" && auth.username) || "system"
            );
            res.send({ success: false, error: err });
          });
      } else {
        createLog(
          "UPDATEAPPLICATION",
          `NOTFOUND-${req.query.id}`,
          JSON.stringify({ ...req.body }),
          "LAS",
          (auth && auth.username !== "" && auth.username) || "system"
        );
        res.send({
          success: false,
          error: `Object reference id ${req.query.id} not found.`,
        });
      }
    })
    .catch((err) => {
      createLog(
        "UPDATEAPPLICATION",
        `ERROR-${req.query.id}`,
        JSON.stringify(err),
        "LAS",
        (auth && auth.username !== "" && auth.username) || "system"
      );
      res.send({ success: false, error: err });
    });
});

app.delete("/application", (req, res) => {
  createLog(
    "DELETEAPPLICATION",
    `DELETEAPPLICATIONATTEMPT-${req.query.id}`,
    JSON.stringify({ ...req.query }),
    "LAS",
    (auth && auth.username !== "" && auth.username) || "system"
  );
  return res.send({ success: false, error: "DELETE not implemented yet!" });
});

/**
 * Approvals
 */
app.get("/approvals", (req, res) => {
  Approvals.findAll({ where: { ...req.query } }).then((approvals) => {
    let approvalsList = JSON.parse(JSON.stringify(approvals));
    return res.json(approvalsList);
  });
});

app.post("/approvals", (req, res) => {
  let auth = currentUser(req.headers.authorization);
  let data = { ...req.body };
  data.collateid = uuidv4();
  data.createdAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  data.updatedAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  Approvals.create(data)
    .then((data) => {
      createLog(
        "CREATEAPPROVALS",
        `CREATEAPPROVALSSUCCESS-${data.collateid}`,
        JSON.stringify(data),
        "LAS",
        (auth && auth.username !== "" && auth.username) || "system"
      );
      res.send({ success: true, data: data });
    })
    .catch((err) => {
      createLog(
        "CREATEAPPROVALS",
        `ERROR-${data.collateid}`,
        JSON.stringify(err),
        "LAS",
        (auth && auth.username !== "" && auth.username) || "system"
      );
      res.send({ success: false, error: err.message });
    });
});

app.put("/approvals", (req, res) => {
  let auth = currentUser(req.headers.authorization);
  let { status, updatedAt } = { ...req.body }; //only use status for update
  updatedAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  Approvals.findOne({ where: { id: req.query.id } })
    .then((approval) => {
      if (approval) {
        approval
          .update({ status, updatedAt }, { where: { id: approval.id } })
          .then((data) => {
            createLog(
              "UPDATEAPPROVALS",
              `UPDATEAPPROVALSSUCCESS-${req.query.id}`,
              JSON.stringify(data),
              "LAS",
              (auth && auth.username !== "" && auth.username) || "system"
            );
            res.send({ success: true, data: data });
          })
          .catch((err) => {
            createLog(
              "CREATEAPPROVALS",
              `CREATEAPPROVALSFAILED-${req.query.id}`,
              JSON.stringify(err),
              "LAS",
              (auth && auth.username !== "" && auth.username) || "system"
            );
            res.send({ success: false, error: err });
          });
      } else {
        createLog(
          "CREATEAPPROVALS",
          `NOTFOUND-${req.query.id}`,
          JSON.stringify({ ...req.body }),
          "LAS",
          (auth && auth.username !== "" && auth.username) || "system"
        );
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

app.listen(3000, () =>
  console.log(`Leave Approval System Application is running on port 3000`)
);
