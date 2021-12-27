function ajax({
  url = '',
  data,
  method = 'get',
  contentType = 'application/x-www-form-urlencoded',
  header = {},
  success,
  error,
}) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);

  Object.keys(header).forEach((key) => {
    xhr.setRequestHeader(key, header[key]);
  });

  xhr.setRequestHeader('Content-Type', contentType);

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status === 200 || xhr.status === 304) {
      success(xhr.responseText);
    } else {
      error(new Error(xhr.responseText));
    }
  };

  xhr.send(data);
}

// function getJson

function jsonp({ url = '', callbackName }) {
  url = url.indexOf('?') === -1 ? url + '?callback=' + callbackName : url + 'callback=' + callbackName;

  let script = document.createElement('script');
  script.src = url;
  script.type = 'text/javascript';

  document.body.appendChild(script);

  script.onload = function () {
    document.body.removeChild(script);
  };
}
