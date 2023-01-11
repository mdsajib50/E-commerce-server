const express = require('express');
const cors = require('cors');
const app = express();
// middelware
app.use(cors());
app.use(express.json)