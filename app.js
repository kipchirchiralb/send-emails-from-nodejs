const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route for sending emails
app.post('/send-email', (req, res) => {
  // Fetch email data from request body
  const { to, subject, text } = req.body;

  // Create a transporter object using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL, // Use environment variable for email
      pass: process.env.GMAIL_PASSWORD // Use environment variable for password
    }
  });

  // Define email options
  const mailOptions = {
    from: process.env.GMAIL_EMAIL, // Sender address
    to, // Recipient address
    subject, // Subject line
    text // Plain text body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred:', error);
      res.status(500).send('Error occurred while sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
