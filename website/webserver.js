const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));
app.use('/interviews', express.static(path.join(__dirname, 'public', 'interviews')));

app.listen(port, () => {
  console.log(`Website running at http://localhost:${port}`);
});