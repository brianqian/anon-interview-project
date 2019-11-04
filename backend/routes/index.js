const router = require('express').Router();
const client = require('../utils/HTTPClient');
const cache = require('../utils/cache');

const sortResults = (dataset, sortBy, direction) => {
  const data = dataset.sort((a, b) => {
    if (direction === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    }
    return a[sortBy] < b[sortBy] ? 1 : -1;
  });
  return data;
};

const returnUniqueData = (dataset) => {
  const sieve = new Set();
  const uniqueData = [];
  dataset.forEach((item) => {
    if (!sieve.has(item.id)) {
      uniqueData.push(item);
      sieve.add(item);
    }
  });
  return uniqueData;
};

router.get('/api/ping', (req, res) => {
  res.json({ success: true });
});

router.get('/api/posts', async (req, res) => {
  const { tag, sortby: sortBy, direction } = req.query;
  const whitelistedDirections = ['desc', 'asc'];
  const whitelistedSortBy = ['id', 'reads', 'likes', 'popularity'];

  if (!tag) res.status(400).json({ error: 'Tags parameter is required' });

  if (direction && !whitelistedDirections.includes(direction)) {
    res
      .status(400)
      .json({ error: 'Sorting direction parameter not supported. Options: "desc", "asc"' });
  }

  if (sortBy && !whitelistedSortBy.includes(sortBy)) {
    res.status(400).json({
      error: 'Sort By parameter not supported. Options: "id", "reads", "likes", "popularity"',
    });
  }

  const API_LINK = 'https://hatchways.io/api/assessment/blog/posts?tag=';
  const queries = tag.split(',');

  const results = [];
  const promiseQueries = [];
  const uncachedQueries = [];

  cache.checkExpiration();
  queries.forEach((query) => {
    const cachedResult = cache.get(query);
    if (cachedResult) {
      console.log(`${cachedResult.length} cached items found for '${query}'`);
      results.push(cachedResult);
    } else {
      uncachedQueries.push(query);
      promiseQueries.push(client(API_LINK + query));
    }
  });

  const fetchedData = await Promise.all(promiseQueries);
  uncachedQueries.forEach((query, i) => {
    const { posts = [] } = fetchedData[i];
    cache.set(query, posts);
  });

  const uniqueResults = returnUniqueData([
    ...results,
    ...fetchedData.reduce((acc, { posts = [] }) => [...acc, ...posts], []),
  ]);

  res.json({ posts: sortBy ? sortResults(uniqueResults, sortBy, direction) : uniqueResults });
});

router.get('/test', (req, res) => {
  const { query } = req.query;
  console.log(cache.get(query));
  cache.logCache();
});

module.exports = router;
