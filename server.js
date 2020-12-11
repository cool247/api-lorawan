const express = require("express");
const app = express();
const sql = require("mssql");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const location = require("./router/location");
const meter = require("./router/meter");

//middleware
app.use(express.json());

const PORT = 5000;
// config for your database
const Config = {
  user: "sa",
  password: "mindmill",
  server: "114.69.249.205\\sql2017",
  database: "READyManagerDB",
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

// const Config = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   server: process.env.DB_SERVER,
//   database: process.env.DB_SQL,
//   options: {
//     encrypt: true,
//     enableArithAbort: true,
//   },
// };

app.post("/login", (req, res) => {
  // Read username and password from request header
  const { username, password } = req.headers;
  const accessTokenSecret = "ftyyf_hvb_ughbu_uugugAd12";

  async function verifyUserCredentials(confrigration, procedureName) {
    try {
      await sql.connect(confrigration);
      const request = new sql.Request();
      let recordsets = await request
        .input("UserID", sql.VarChar(50), username)
        .input("Password", sql.VarChar(50), password)
        .execute(procedureName);

      let authReq = JSON.parse(JSON.stringify(recordsets));

      if (authReq.recordset[0]) {
        // if (user) {
        //Generate an access token
        const accessToken = jwt.sign(
          { clientID: authReq.recordset[0].ClientCode },
          accessTokenSecret
        );
        res.json({
          authReq,
        });
        res.json({
          message: "scucess",
          statusCode: "200",
          ClientCode: "MM01",
          authorized: "true",
          token: accessToken,
        });
        // }
      } else {
        res.status(401).json({
          message: "faild",
          statusCode: "401",
          authorized: "false",
          token: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  verifyUserCredentials(Config, "IsUserExists");
});

// app.post("/auth", (req, res) => {
//   async function verifyUserCredentials(confrigration, procedureName) {
//     try {
//       await sql.connect(confrigration);
//       const request = new sql.Request();
//       let recordsets = await request
//         .input("UserID", sql.VarChar(50), req.headers["user"])
//         .input("Password", sql.VarChar(50), req.headers["password"])
//         .execute(procedureName);

//       let authReq = JSON.parse(JSON.stringify(recordsets));
//       if (authReq.recordset[0].Auth) {
//         res.json({
//           message: "scucess",
//           statusCode: "200",
//           authrization: "true",
//         });
//       } else {
//         res.status(401).json({
//           message: "faild",
//           statusCode: "401",
//           authrization: "false",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   verifyUserCredentials(Config, "IsUserExists");
// });

//router
app.use("/location", location);
app.use("/meter", meter);

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
