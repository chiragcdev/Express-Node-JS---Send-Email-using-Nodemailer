import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse URL-encoded data and JSON data
app.use(express.urlencoded({ extended: false }));

// Middleware to parse JSON data (API requests)
//app.use(express.json());

// Configure the email transporter using Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Your Gmail address
        pass: 'Your App Password Here' // App Password
    }
});

// Route to render the email form
app.get('/mail', (req, resp) => {
    resp.render('mail');
})

// Route to handle form submission and send email
app.post('/submit-mail', (req, resp) => {
    console.log(req.body);

    // Create the email options
    const mailOptions = {
        from: 'your-email@gmail.com', // Your Gmail address
        to: 'your-email@gmail.com', // REQUIRED
        subject: req.body.subject, // Email subject
        text: req.body.message // Email message
    };

    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            resp.send('Error sending email: ' + err);
        } else {
            resp.send("Email sent successfully: " + info.response);
        }
    })

    resp.send('Email sent successfully!');
})

app.listen(3200);
