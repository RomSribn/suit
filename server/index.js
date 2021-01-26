const express = require('express');
const path = require('path');
//revert ORDER151
// const compression = require('compression'); //import to express app

const app = express();

// app.use(compression()); //add this as the 1st middleware
app.use(express.static(path.join(__dirname, '../build')));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

console.log('server listens to 3000 port');
app.listen(3000);



