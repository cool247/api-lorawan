const router = require("express").Router();
const sql = require("mssql");
const Meter = require("../model/meter");
require("dotenv").config();
const auth = require("../middleware/auth");

// config for your database
// const Config = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   server: process.env.DB_SERVER,
//   database: process.env.DB_SQL,
//   // options: {
//   //   encrypt: true,
//   //   enableArithAbort: true,
//   // },
// };
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

//route

router.get("/:id", auth, function (req, res) {
  async function getDataFromProcedure(confrigration, procedureName) {
    try {
      await sql.connect(confrigration);
      const request = new sql.Request();
      const recordset = await request
        .input("ID", sql.VarChar(50), req.params.id)
        .execute(procedureName);

      let parsedJson = JSON.parse(JSON.stringify(recordset));

      let meterDataToSend = new Meter(
        parsedJson.recordset[0].ID,
        parsedJson.recordset[0].Href,
        parsedJson.recordset[0].SerialNumber,
        parsedJson.recordset[0].Manufacturer,
        parsedJson.recordset[0].MeterType
      );

      res.json(meterDataToSend);
    } catch (error) {
      console.log(error);
    }
  }

  getDataFromProcedure(Config, "MeterGetByID");
});

module.exports = router;
