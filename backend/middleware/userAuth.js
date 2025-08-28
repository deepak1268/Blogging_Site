const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const { JWT_USER_SECRET } = require("../config");

async function userAuth(req, res, next) {
  try {
    const token = req.cookies.token;
    const decodedinfo = jwt.verify(token, JWT_USER_SECRET);
    const userid = decodedinfo.userid;
    req.userid = userid;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Dear user please login",
    });
  }
}

module.exports = {
  userAuth,
};
