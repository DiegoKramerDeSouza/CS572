const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const logFiles = path.join(__dirname, 'logs/server_logs.log');

let streamLog = fs.createWriteStream(logFiles, {flags: 'a'});

app.set('x-powered-by', false);

app.use(morgan('combined', {stream: streamLog}));
app.use(cors());
app.use(express.json());
app.use('/grades', require("./Lab06_routes.js"));

app.listen(3000, _ => console.log('Started at port 3000'));