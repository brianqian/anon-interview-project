const sortResults = (dataset, sortBy, direction) => {
  if (!dataset) return;
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
    console.log('itemid', item.id);
    if (!sieve.has(item.id)) {
      uniqueData.push(item);
      sieve.add(item.id);
    }
  });
  return uniqueData;
};

const validateQueries = (tags, sortBy, direction, res) => {
  if (!tags) res.status(400).json({ error: 'Tags parameter is required' });
  const whitelistedDirections = ['desc', 'asc'];
  const whitelistedSortBy = ['id', 'reads', 'likes', 'popularity'];
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
};

module.exports = { sortResults, returnUniqueData, validateQueries };
