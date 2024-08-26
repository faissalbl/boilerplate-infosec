const express = require('express');
const app = express();
const helmet = require('helmet');

// all included in parent middleware helmet() down below.
// app.use(helmet.hidePoweredBy());
// app.use(helmet.xssFilter());
// app.use(helmet.noSniff());
// app.use(helmet.ieNoOpen());
// app.use(helmet.dnsPrefetchControl());
// app.use(helmet.frameguard({ action: 'deny' }));

const ninetyDaysInSeconds = 60*60*24*90;
// app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds, force: true }));



app.use(helmet({
  frameguard: {
    action: 'deny'
  },
  hsts: {
    maxAge: ninetyDaysInSeconds, 
    force: true
  }
}));

app.use(helmet.noCache());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "trusted-cdn.com"],
  }
}));









































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
