import dotenv from "dotenv";
dotenv.config()
import nodemailer from "nodemailer"


// fake smtp server etherreal

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'renee.heaney@ethereal.email',
        pass: 'En9H5GVGfutQ99mXnP'
    }
});









// Real SMTP real

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'process.env.EMAIL_USER',
//       pass: 'process.env.EMAIL_PASS'
//     },
//     port: 587, // Use the appropriate port number for your configuration
//     secure: false, // Set to true if you're using SSL
//     tls: {
//       rejectUnauthorized: false // Set to false if your server doesn't support secure connections
//     }
//   });



export default transporter
