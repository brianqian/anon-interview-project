const router = require('express').Router();
const client = require('../utils/HTTPClient');
const cache = require('../utils/cache');
const { sortResults, validateQueries, returnUniqueData } = require('../utils/helper');

router.get('/api/ping', (req, res) => {
  res.json({ success: true });
});

router.get('/api/posts', async (req, res) => {
  const { tag, sortby: sortBy = 'id', direction = 'asc' } = req.query;
  console.log('TAG', tag);
  validateQueries(tag, sortBy, direction, res);
  const queries = tag.split(',');
  cache.checkExpiration();
  const results = await client.batchRequest(queries);
  const uniqueResults = returnUniqueData(results);
  res.json({ posts: sortBy ? sortResults(uniqueResults, sortBy, direction) : uniqueResults });
});

router.get('/log', (req, res) => {
  const { query } = req.query;
  console.log(cache.get(query));
  cache.logCache();
});

router.get('/test', async (req, res) => {
  cache.clear();
  const tech = cache.get('tech');
  console.log('SHOULD HAVE 0 RESULTS');
  console.log(`Tech item: ${tech[0]}, Length: ${tech.length}`);
  console.log('Fetching results for tech');
  const fetchResults = await client.request('tech');
  console.log(fetchResults.length, 'items found in fetch');
  console.log(cache.get('tech').length, 'items found in cache');
  console.log('Batch requesting two queries, health and startups');
  console.log('SHOULD HAVE 29 AND 21 RESULTS');
  await client.batchRequest(['health', 'startups']);
  console.log('health results: ', cache.get('health').length);
  console.log('startups results:', cache.get('startups').length);
  const typoResults = await client.request('techh');
  console.log('should return an empty array: ', typoResults);
  console.log('should return an empty array:', cache.get('techh'));
});

module.exports = router;
