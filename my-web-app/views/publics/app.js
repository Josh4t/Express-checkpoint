// app.js
const express = require('express');
const path = require('path');
const app = express();

// Middleware to check if the request is within working hours (Monday to Friday, 9 to 17)
const workingHoursMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const day = currentDate.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  const hour = currentDate.getHours();

  // Check if it is between Monday and Friday (1-5) and from 9 AM to 5 PM
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // If within working hours, proceed to the requested route
  } else {
    res.send('<h1>Sorry, the web application is only available during working hours (Mon-Fri, 9 AM to 5 PM).</h1>');
  }
};

// Apply the working hours middleware to all routes
app.use(workingHoursMiddleware);

// Set Pug as the template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Define Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
