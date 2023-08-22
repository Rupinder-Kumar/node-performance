const express = require('express');
const cluster = require('cluster');
const os = require('os');
const app = express();

function delay(duration) {
    const starTime = Date.now();
    while(Date.now() - starTime > duration) {
        // event loop is blocked...
    }
 }

app.get('/', (req, res) => {
    res.send(`Performance Example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
    delay(9000);
    res.send(`Ding ding ding: ${process.pid}`)
});

console.log("Running Server.js")
if(cluster.isMaster) {
    console.log("Master has been started");
    const NUM_WORKERS = os.cpus().length;
    console.log(NUM_WORKERS);
    for(i = 0;i < NUM_WORKERS;i++){
        cluster.fork();
    }
} else {
    console.log("Worker has been started")
    app.listen(3000);
}
