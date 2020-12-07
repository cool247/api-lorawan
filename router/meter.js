const router = require("express").Router();
const sql = require("mssql");
const auth = require("../middleware/auth");

// config for your database
const Config = {
  user: "sa",
  password: "mindmill",
  server: "114.69.249.205\\sql2017",
  database: "READyManagerDB",
};

//route

router.get("/:id", auth, function (req, res) {
  async function getDataFromProcedure(confrigration, procedureName) {
    try {
      await sql.connect(confrigration);
      const request = new sql.Request();
      const recordsets = await request
        .input("ID", sql.VarChar(50), req.params.id)
        .execute(procedureName);
      res.send(recordsets);
      console.log(req.params.id);
    } catch (error) {
      console.log(error);
    }
  }

  getDataFromProcedure(Config, "MeterGetByID");
});

module.exports = router;
