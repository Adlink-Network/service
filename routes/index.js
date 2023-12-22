const express = require("express");
const router = express.Router();

const parser = require("ua-parser-js");
const isbot = require("isbot");

const AdUnitController = require("../app/Controllers/AdUnitController");

const GeoIPHelper = require("../app/Helpers/GeoIPHelper");

router.get("/:domain/:ad_unit_code.json", AdUnitController.index);
router.get("/ip-ua", function (req, res) {
  const ip = req.headers["cf-connecting-ip"] || req.clientIp;
  const geo = (new GeoIPHelper(ip)).geo();
  let ua = parser(req.headers["user-agent"]);
  ua = {
    ...ua,
    isBot: isbot(req.headers["user-agent"]),
  };

  res.json({
    ip, geo, ua,
  });
});

module.exports = router;
