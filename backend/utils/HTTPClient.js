const fetch = require('node-fetch');
const cache = require('./cache');

const API_LINK = process.env.API_LINK;

const client = {
  request: async function(query) {
    const cachedResult = cache.get(query);
    if (cachedResult.length) return cachedResult;
    const resp = await fetch(API_LINK + query);
    if (resp.status !== 200) throw new Error(resp.status);
    const { posts = [] } = await resp.json();
    cache.set(query, posts);
    return posts;
  },

  batchRequest: async function(queries) {
    await Promise.all(queries.map((query) => this.request(query)));
    return cache.getMultiple(queries);
  },
};

module.exports = client;
