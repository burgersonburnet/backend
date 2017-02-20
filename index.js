const koa = require('koa');
const send = require('koa-send');

const app = koa();

function* roundRobin() {
  const frameworks = {
    0: 'angular',
    1: 'react',
    // 2: 'django',
  };
  for (let i = 0; ;) {
    yield frameworks[i];
    if (i === 1) {
      i = 0;
    } else {
      i += 1;
    }
  }
}
let nextFramework = roundRobin();

// x-response-time
app.use(function* (next) {
  const start = new Date();
  yield next;
  const ms = new Date() - start;
  this.set('X-Response-Time', `${ms} ms`);
});

// logger
app.use(function* (next) {
  const start = new Date();
  yield next;
  const ms = new Date() - start;
  console.log(`${this.method} ${this.url} - ${ms} ms`);
});

// response
app.use(function* () {
  if (this.path === '/') {
    yield send(this, `/${nextFramework.next().value}/index.html`);
  } else {
    yield send(this, this.path);
  }
});

app.listen(3000);
