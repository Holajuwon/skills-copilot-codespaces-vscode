// Create web server
// 1. Import modules
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

// 2. Create web server
const app = http.createServer((request, response) => {
    const _url = request.url;
    const queryData = url.parse(_url, true).query;
    const pathname = url.parse(_url, true).pathname;

    // console.log(url.parse(_url, true));
    // console.log(pathname);
    // console.log(queryData.id);

    // 3. Routing
    if (pathname === '/') {
        if (queryData.id === undefined) {
            fs.readdir('./data', (error, filelist) => {
                const title = 'Welcome';
                const description = 'Hello, Node.js';
                let list = '<ul>';
                let i = 0;
                while (i < filelist.length) {
                    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                    i++;
                }
                list += '</ul>';
                const template = `
        <!doctype html>
        <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
        </html>
        `;
                response.writeHead(200);
                response.end(template);
            });
        } else {
            fs.readdir('./data', (error, filelist) => {
                const title = 'Welcome';
                const description = 'Hello, Node.js';
                let list = '<ul>';
                let i = 0;
                while (i < filelist.length) {
                    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                    i++;
                }
                list += '</ul>';
                fs.readFile(`data/${queryData.id}`, 'utf8', (err, description) => {
                    const title = queryData.id;
                    const template = `
          <!doctype html>
          <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
            `;
                    response.writeHead(200);
                    response.end(template);
                }
                );
            }
            );
        }
    }
    else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);
console.log('Server running at http:// localhost:3000/');

