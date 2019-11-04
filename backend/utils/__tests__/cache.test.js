const cache = require('../cache');

describe('cache', () => {
  it('should add and retrieve items', () => {
    cache.set('test', ['test1, test2']);
    expect(cache.get('test')).toEqual(['test1, test2']);
  });

  it('should update lastUpdated on clear', () => {
    const lastUpdated = cache.lastUpdated;
    cache.resetCache();
    const newTime = cache.lastUpdated;
    expect(newTime).toBeGreaterThan(lastUpdated);
  });
  it('should retrieve and concat multiple entries', () => {
    cache.resetCache();
    cache.set('test', ['test1', 'test2']);
    cache.set('test2', ['hello', { id: 4, reads: 400 }]);
    const result = cache.getMultiple(['test', 'test2']);
    expect(result.length).toEqual(4);
  });
  it('should not save empty arrays', () => {
    cache.resetCache();
    cache.set('test', []);
    cache.set('test2', ['hello', { id: 4, reads: 400 }]);
    const result = cache.getMultiple(['test', 'test2']);
    const emptyArr = cache.get('test');
    expect(result.length).toEqual(2);
    expect(emptyArr.length).toEqual(0);
  });
});
