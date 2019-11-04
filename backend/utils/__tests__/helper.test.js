const { sortResults, validateQueries, returnUniqueData } = require('../helper');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockData = [
  {
    id: 1,
    reads: 1000,
    popularity: 3000,
    likes: 123,
  },
  {
    id: 2,
    reads: 4,
    popularity: 1,
    likes: 999990,
  },
  {
    id: 33,
    reads: 3222,
    popularity: 3013400,
    likes: 43,
  },
  {
    id: 134,
    reads: 10,
    popularity: 200,
    likes: 12300,
  },
];

describe('sortResults', () => {
  it('should sort by id in descending order', () => {
    const result = sortResults(mockData, 'id', 'desc');
    expect(result.map((item) => item.id)).toEqual([134, 33, 2, 1]);
  });
  it('should sort by id in ascending order', () => {
    const result = sortResults(mockData, 'id', 'asc');
    expect(result.map((item) => item.id)).toEqual([1, 2, 33, 134]);
  });
  it('should sort by likes in descending order', () => {
    const result = sortResults(mockData, 'likes', 'desc');
    expect(result.map((item) => item.likes)).toEqual([999990, 12300, 123, 43]);
  });
  it('should sort by likes in ascending order', () => {
    const result = sortResults(mockData, 'likes', 'asc');
    expect(result.map((item) => item.likes)).toEqual([43, 123, 12300, 999990]);
  });
  it('should work without direction parameter', () => {
    const result = sortResults(mockData, 'likes');
    expect(result.map((item) => item.likes)).toBeTruthy();
    expect(result.length).toBe(4);
  });
});

describe('validateQueries', () => {
  it('should return with status 400 and sorting error', () => {
    const res = mockResponse();
    validateQueries(['test', 'one'], 'fail', 'alsofail', res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Sorting direction parameter not supported. Options: "desc", "asc"',
    });
  });
  it('should return with status 400 and direction error', () => {
    const res = mockResponse();
    validateQueries(['test', 'one'], 'fail', 'alsofail', res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Sort By parameter not supported. Options: "id", "reads", "likes", "popularity"',
    });
  });
  it('should return with status 400 and tag error', () => {
    const res = mockResponse();
    validateQueries(undefined, 'fail', 'alsofail', res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Tags parameter is required' });
  });
  it('should not call on res.status or res.json', () => {
    const res = mockResponse();
    validateQueries(['test'], 'id', undefined, res);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});

describe('returnUniqueData', () => {
  it('should filter nothing from unique id set', () => {
    const cleanData = returnUniqueData(mockData);
    expect(cleanData.length).toEqual(4);
  });

  it('should filter out repeat id', () => {
    const dirtyData = [...mockData, { id: 1, reads: 4 }];
    const cleanData = returnUniqueData(dirtyData);
    expect(cleanData.length).toEqual(4);
  });
});
