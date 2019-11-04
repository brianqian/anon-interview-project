class Cache {
  constructor() {
    this.map = {};
    this.lastUpdated = new Date().getTime();
  }

  set(tag, results) {
    this.map[tag] = results;
  }

  get(tag) {
    console.log(`${this.map[tag].length} items found for ${tag} in cache.`);
    return this.map[tag];
  }

  clear() {
    this.map = {};
  }

  checkExpiration() {
    const oneDayInMs = 1000 * 60 * 60 * 24;
    const cacheIsExpired = new Date().getTime() - this.lastUpdated > oneDayInMs;
    if (cacheIsExpired) this.clear();
  }

  logCache() {
    const keys = Object.keys(this.map);
    console.log(keys);
    keys.forEach((key) => console.log(key, `${this.map[key].length} items found`));
  }
}

const cache = new Cache();
module.exports = cache;
