module.exports = {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    db: process.env.REDIS_DB ?? 0,
  },

  redis_keys: {
    supply: (process.env.REDIS_PREFIX || "") + ":supply.",
    ad_unit: (process.env.REDIS_PREFIX || "") + ":ad_unit.",
  },
};
