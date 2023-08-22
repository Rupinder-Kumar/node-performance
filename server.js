const express = require('express');
const app = express();

function delay(duration) {
    const starTime = Date.now();
    while (Date.now() - starTime > duration) {
        // event loop is blocked...
    }
}

app.get('/', (req, res) => {
    res.send(`Performance Example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
    delay(4000);
    res.send(`Ding ding ding: ${process.pid}`)
});

console.log("Running Server.js")
console.log("Worker has been started")
app.listen(3000);
