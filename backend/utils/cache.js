class Cache {
  constructor() {
    this.map = {};
    this.lastUpdated = new Date().getTime();
  }

  set(tag, results) {
    if (!results.length) return;
    this.map[tag] = results;
  }

  get(tag) {
    return this.map[tag] || [];
  }

  getMultiple(tagList) {
    return tagList.reduce((acc, tag) => [...acc, ...this.get(tag)], []);
  }

  resetCache() {
    this.map = {};
    this.lastUpdated = new Date().getTime();
  }

  checkExpiration() {
    const oneDayInMs = 1000 * 60 * 60 * 24;
    const cacheIsExpired = new Date().getTime() - this.lastUpdated > oneDayInMs;
    if (cacheIsExpired) {
      this.resetCache();
    }
  }

  logCache() {
    const keys = Object.keys(this.map);
    console.log(keys);
    if (!keys.length) return;
    keys.forEach((key) => console.log(key, `${this.map[key].length} items found`));
  }
}

const cache = new Cache();
module.exports = cache;
