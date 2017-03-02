'use strict';
const koa = require('koa');
const send = require('koa-send');
const Router = require('koa-router'); // koa-router@next
const bodyParser = require('koa-bodyparser'); // koa-bodyparser@next
const graphqlKoa = require ('graphql-server-koa').graphqlKoa;
const myGraphQLSchema = require('./api/schema.js');

const app = new koa();
const router = new Router();
app.use(bodyParser());

// x-response-time
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
  console.log('start log', ctx.query)
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms} ms`);
});

app.use(async (ctx, next) => {
  if (this.path === '/') {
    await send(ctx, `/${nextFramework.next().value}/index.html`);
  } else {
    await next();
  }
});
router.get('/graphql', graphqlKoa({ schema: myGraphQLSchema }));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);

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
