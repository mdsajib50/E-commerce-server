const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PO
// middelware
app.use(cors());
app.use(express.json());

