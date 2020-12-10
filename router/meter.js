const router = require("express").Router();
const sql = require("mssql");
const Meter = require("../model/meter");
require("dotenv").config();
const auth = require("../middleware/auth");

// config for your database
const Config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_SQL,
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
      let meterDataToSend = new Meter(
        recordset[0].ID,
        recordset[0].Href,
        recordset[0].SerialNumber,
        recordset[0].Manufacture,
        recordset[0].MeterType
      );

      res.json({ meterDataToSend });
    } catch (error) {
      console.log(error);
    }
  }

  getDataFromProcedure(Config, "MeterGetByID");
});

module.exports = router;
