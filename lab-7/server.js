const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

const publicPath = path.join(__dirname, 'public');
server.use(express.static(publicPath));

server.post('/ITC505/lab-7/', (req, res) => {
    const { adjective1, noun, verb1, adjective2, pluralNoun } = req.body;
    if (!adjective1 || !noun || !verb1 || !adjective2 || !pluralNoun) {
        res.send(`
            <h1>Submission Failed</h1>
            <p>Please fill out all fields.</p>
            <a href="/ITC505/lab-7/">Go Back</a>
        `);
        return;
    }

    const madLib = `One day, a ${adjective1} ${noun} decided to ${verb1}. 
                    It met a ${adjective2} ${pluralNoun}, and they ${verb1} happily ever after.`;

    res.send(`
        <h1>Your Mad Lib</h1>
        <p>${madLib}</p>
        <a href="/ITC505/lab-7/">Create Another</a>
    `);
});

const port = process.argv[2] === 'local' ? 8080 : 80;
server.listen(port, () => console.log(`Ready on http://localhost:${port}`));
