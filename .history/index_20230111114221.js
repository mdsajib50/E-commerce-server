const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.P
// middelware
app.use(cors());
app.use(express.json());

