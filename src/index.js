const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

require('./app/controllers/clientController')(app);
require('./app/controllers/wishListController')(app);

app.listen(3000);
