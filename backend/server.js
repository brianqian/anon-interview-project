const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
