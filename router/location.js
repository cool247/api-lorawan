const router = require("express").Router();
const sql = require("mssql");
const auth = require("../middleware/auth");

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

//route

router.get("/", auth, function (req, res) {
  async function getDataFromProcedure(confrigration, procedureName) {
    try {
      await sql.connect(confrigration);
      const request = new sql.Request();
      recordsets = await request
        .input("PostCode", sql.VarChar(50), "42351")
        .execute(procedureName);
      res.send(recordsets);
    } catch (error) {
      console.log(error);
    }
  }

  getDataFromProcedure(Config, "LocationGetByPostCode");
});

module.exports = router;
