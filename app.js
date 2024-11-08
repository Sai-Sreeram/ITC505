const express = require('express');
const path = require('path');
const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files under /ITC505/lab-6
app.use('/ITC505/lab-6', express.static(path.join(__dirname, 'public')));

// In-memory data storage for job applications
let jobApplications = [];

// Base path for routes
const basePath = '/ITC505/lab-6';

// Route to display job applications
app.get(`${basePath}/index.html`, (req, res) => {
    res.render('index', { jobApplications });
});

// Route to display the "Add Job" form
app.get(`${basePath}/add-job`, (req, res) => {
    res.render('add-job');
});

// Route to handle form submission for adding job applications
app.use(express.urlencoded({ extended: true }));
app.post(`${basePath}/add-job`, (req, res) => {
    const { company, position, date, status } = req.body;
    jobApplications.push({ company, position, date, status });
    res.redirect(`${basePath}/index.html`);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
