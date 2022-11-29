const nodemailer = require('nodemailer');
const { default: User } = require('./User');

const Gmail = 'm.anas.the360tech@gmail.com'
const pass = 'gugoqdbonfvpvesy'

module.exports.SingIn = async (req, res) => {
    let { email, name, password } = req.body
    let code = Math.floor(Math.random() * 9999) + 1000;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: Gmail, pass }
    });

    let mailOptions = {
        from: Gmail,
        to: email,
        subject: 'Email Verification',
        text: `Hi ${name} your Verification code is  ${code}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(401).json({ Psot: "error" })
        }
    });

    const user = new User({
        name,
        email,
        password,
        code
    });

    try {
        const result = await user.save()

        res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}