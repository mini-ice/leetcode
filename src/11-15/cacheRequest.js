const map = new Map();
// const pendingRequest = {};

const createFetchApi =
  (delay) =>
  (...args) =>
    new Promise((resolve) =>
      setTimeout(() => {
        resolve(...args);
      }, delay)
    );

function cacheRequest(url, callback) {
  const key = options.key || options.url;

  let fetcher;
  if (map.has(key)) {
    fetcher = map.get(key);

    if (fetcher.state === 'pending') {
    }
  } else {
    fetcher = createFetchApi(3000)(url);

    map.set(url, fetcher);
    return fetcher;
  }
}
