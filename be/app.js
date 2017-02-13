const express = require('express');
const bodyParser = require('body-parser');
const Securities = require('./OG/securities/crud.js');
const Positions = require('./OG/positions/crud.js');
const Portfolios = require('./OG/portfolios/crud.js');

var app = express();
var securities = Securities();
var positions = Positions();
var portfolios = Portfolios();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE');
  next();
});

app.get('/', (req, res) => {
  res.send('Portfolio Analytics!!!');
});

// PORTFOLIO LIST/SEARCH
app.get('/portfolios', (req, res) => {
  portfolios.list({
    name: req.query.name || null
  }, (response) => {
    res.json(response);
  });
});

// PORTFOLIO CREATE
app.post('/portfolios', (req, res) => {
  var postions = req.body.positions ? req.body.positions.split(',') : [];

  portfolios.create({
    name: req.body.name, 
    rootName: req.body.rootName
  }, postions, (response) => {
    res.json(response);
  });
});

// PORTFOLIO READ
app.param('portfolioId', function(request, response, next, portfolioId){
  next();
});  

app.get('/portfolios/:portfolioId', (req, res) => {
  portfolios.read('DbPrt~' + req.params.portfolioId, (response) => {
    res.json(response);
  });
});

// PORTFOLIO UPDATE
// /jax/components/PortfolioMaster/default/portfolios/{portfolioId}/versions
app.put('/portfolios/:portfolioId', (req, res) => {
  var postions = req.body.positions ? req.body.positions.split(',') : [];

  portfolios.update({
    id: 'DbPrt~' + req.params.portfolioId, 
    name: req.body.name, 
    rootName: req.body.rootName
  }, postions, (response) => {
    res.json(response);
  });
});

// PORTFOLIO DELETE
app.delete('/portfolios/:portfolioId', (req, res) => {
  portfolios.remove('DbPrt~' + req.params.portfolioId, (response) => {
    res.json(response);
  });
});


// POSITION LIST/SEARCH
// - missing posibilitie get all, I have to always define pgSze
// - search identifier, If I use only first letter doesn't work
app.get('/positions', (req, res) => {
  positions.list({
    identifier: req.query.identifier || null,
    minquantity: req.query.minquantity || null,
    maxquantity: req.query.maxquantity || null,
    pgIdx: null,
    pgSze: 999
  }, (response) => {
    res.json(response);
  });
});

// POSITION CREATE
app.post('/positions', (req, res) => {
  positions.create({
    quantity: req.body.quantity || 0,
    scheme: req.body.scheme || '',
    value: req.body.value || '',
  }, (response) => {
    res.json(response);
  });
});

// POSITION READ
app.get('/positions/:positionId', (req, res) => {
  positions.read('DbPos~' + req.params.positionId, (response) => {
    res.json(response);
  });
});

// POSITION UPDATE
// - endpoint doesn't work http://localhost:8090/jax/components/PositionMaster/default/positions/DbPos~1045/versions/
// - it is possible to update positions without version id, it is one unnecessary http request
app.put('/positions/:positionId', (req, res) => {
  positions.update({
    id: 'DbPos~' + req.params.positionId,
    quantity: req.body.quantity || 0,
    scheme: req.body.scheme || '',
    value: req.body.value || '',
  }, (response) => {
    res.json(response);
  });
});

// POSITION DELETE
app.delete('/positions/:positionId', (req, res) => {
  positions.remove('DbPos~' + req.params.positionId, (response) => {
    res.json(response);
  });
});

// SECURITY READ
// app.get('/positions/:positionId', (req, res) => {
  // securities.read('DbSec~1030', (response) => {
    // console.log(response);
  // });
// });

app.listen(3333, function () {
  console.log('Server Running 127.0.0.1:3333');
});
