const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const accessTokenSecret = "ftyyf_hvb_ughbu_uugugAd12";
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, accessTokenSecret);
    const clientID = decodedToken.clientID;

    if (req.body.CLientID && req.body.ClientID !== clientID) {
      throw "Invalid user ID";
    } else {
      // if matched
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
