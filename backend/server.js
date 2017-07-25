const express = require('express');
const app = express();

// Example route
app.get('/', function (req, res) {
  res.send('hello world');
});

app.post('/login', function(req, res) {
  console.log('heres the login flow');
});

app.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!');
});
