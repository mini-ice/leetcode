function parseUrlParams(url = location.href, key) {
  if (typeof url !== 'string') return;
  const regexp = key && typeof key === 'string' ? new RegExp(`(${key}+)=([^?&]*)`, 'g') : /([^?&]+)=([^?&]*)/g;

  const result = {};

  url.replace(regexp, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    const value = decodeURIComponent($2);
    result[name] = value;
    return rs;
  });

  return result;
}

let url =
  'https://www.baidu.com/s?cl=3&tn=baidutop10&fr=top1000&wd=%E8%9C%9C%E9%9B%AA%E5%86%B0%E5%9F%8E%E5%A4%9A%E4%B8%AA%E6%AD%8C%E8%AF%8D%E5%95%86%E6%A0%87%E6%B3%A8%E5%86%8C%E6%88%90%E5%8A%9F&rsv_idx=2&rsv_dl=fyb_n_homepage&hisfilter=1';

function parseUrlParams01(url) {
  if (typeof url !== 'string') throw new TypeError('ooo');

  const regex = /([^?&]+)=([^?&]*)/g;

  const result = {};

  url.replace(regex, (ret, $1, $2) => {
    const name = decodeURIComponent($1);
    const value = decodeURIComponent($2);

    result[name] = value;
    return ret;
  });
}

console.log(parseUrlParams(url));
console.log(parseUrlParams(url, 'wd'));
