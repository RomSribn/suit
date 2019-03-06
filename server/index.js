const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../build')));


app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

console.log('server listens to 3000 port');
app.listen(3000);



