'use strict'

const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');

const app = module.exports = express();

const prepareData = (data) => {
  return data.filter(item => item.date).map((item) => ({
    factory_id: Number(item.factory_id),
    date: item.date,
    product1: Number(item.product1),
    product2: Number(item.product2),
  }));
}

app.get('/products', cors({ origin: 'http://localhost:3000'}), function(req, res){
  const errorHandler = (e) => {
    res.status(500);
    res.send();
  }

  try {
    const results = [];

    fs.createReadStream('products.csv')
      .on('error', (e) => errorHandler(e))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        res.send(prepareData(results));
      });
  } catch (e) {
    errorHandler(e);
  }
});

if (!module.parent) {
  app.listen(3001);
  console.log('Express started on port 3001');
}