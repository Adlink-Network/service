const AdUnitHelper = require("../Helpers/AdUnitHelper");
const CreativeHelper = require("../Helpers/CreativeHelper");

const redis = require("../Services/RedisService");

const { redis_keys } = require("../../configs/cache");

async function index(req, res) {
  let { domain, ad_unit_code } = req.params;
  let { s: sizes } = req.query;
  let cacheKey = `${redis_keys.ad_unit}${ad_unit_code}`;
  const cacheValue = await redis.get(cacheKey);
  if ( !cacheValue ) {
    return res.json([]);
  }
  const adUnitHelper = new AdUnitHelper(cacheValue);
  let adUnit = adUnitHelper.unserialize();
  if ( !adUnit ) {
    return res.json([]);
  }
  if ( !adUnit.sites || (adUnit.sites && (adUnit.sites.domain !== domain)) ) {
    return res.json([]);
  }
  if ( !adUnit.creatives ) {
    return res.json([]);
  }

  let creatives = adUnit.creatives;
  if ( sizes ) {
    sizes = sizes.split(",");
    // remove duplicate sizes
    sizes = [...new Set(sizes)];

    creatives = Object.fromEntries(
      Object.entries(creatives).filter(
        ([key, val]) => sizes.includes(val.size),
      ),
    );
  }

  Object.keys(creatives).forEach(function (key, index) {
    let creative = creatives[key];
    creative = new CreativeHelper(creative).withSize();
    creatives[key] = creative.toValue();
  });

  return res.json(creatives);
}

module.exports = {
  index,
};
