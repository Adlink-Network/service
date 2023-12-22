const path = require("path");
const fs = require("fs");
const Reader = require("@maxmind/geoip2-node").Reader;

const dbBuffer = fs.readFileSync(path.join(__dirname, "../../storage/GeoLite2-City.mmdb"));
const reader = Reader.openBuffer(dbBuffer);

class GeoIPHelper {
  _ip;

  constructor(ip) {
    this._ip = ip;
  }

  geo() {
    try {
      const city = reader.city(this._ip);
      return {
        country: city.country.isoCode,
        region: city.subdivisions[0].names.en,
        city: city.city.names.en,
        longitude: city.location.longitude,
        latitude: city.location.latitude,
        timeZone: city.location.timeZone,
      };
    } catch ( e ) {
      return null;
    }
  }
}

module.exports = GeoIPHelper;
