const redis = require("redis");
const db = redis.createClient();

class Entry {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
  }
  save(cb) {
    const EntryJSON = JSON.stringify(this);
    db.lpush("entries", EntryJSON, err => {
      if (err) return cb(err);
      cb();
    });
  }
  static getRange(from, to, cb) {
    db.lrange("entries", from, to, (err, items) => {
      if (err) return err;
      const entries = [];
      items.forEach(item => {
        entries.push(JSON.parse(item));
      });
      cb(null, entries);
    });
  }
  static count(cb) {
    db.llen("entries", (err, count) => {
      if (err) return cb(err);
      cb(null, count);
    });
  }
}

module.exports = Entry;
