const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

function parseCookies(req) {
  const list = {};
  const cookieString = req.headers.cookie;
  if (cookieString) {
    cookieString.split(';').forEach(function (cookie) {
      const parts = cookie.split('=');
      list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
  }
  return list;
}

http.createServer((req, res) => {
  const cookies = parseCookies(req);


  if (req.url.startsWith('/login')) { // 1
    const { query } = url.parse(req.url);
    const { name } = qs.parse(query);
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);
    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    });
    res.end();
  } else if (cookies.name) {  // 2
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`${cookies.name}님 안녕하세요`);
  } else {
    fs.readFile('./server4.html', (err, data) => {
      if (err) {
        throw err;
      }
      res.end(data);
    });
  }

})
  .listen(8083, () => {
    console.log('8083번 포트에서 서버 대기중입니다!');
  });
