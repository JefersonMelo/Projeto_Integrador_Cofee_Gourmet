const express = require('express');
const { resolve } = require('path');

const app = express();

app.use('/', express.static(resolve(__dirname, 'app/build')));
console.log(app)
app.listen(process.env.PORT || 3000,
(err) => {
    if(err){return console.log(err)}
    return console.log(':)')
});
