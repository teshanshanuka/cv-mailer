const nodemailer = require('nodemailer');
const fs = require('fs');

function sanityCheck() {
    if (!process.env.MAIL_SERVICE) throw new Error('Missing MAIL_SERVICE');
    if (!process.env.APP_EMAIL) throw new Error('Missing APP_EMAIL');
    if (!process.env.APP_PWD) throw new Error('Missing APP_PWD');
    if (!process.env.TO_EMAIL) throw new Error('Missing TO_EMAIL');
    if (!process.env.SEND_SUBJECT) throw new Error('Missing SEND_SUBJECT');
    if (!process.env.SEND_BODY) throw new Error('Missing SEND_BODY');
    if (!process.env.SEND_FILENAME) throw new Error('Missing SEND_FILENAME');
    if (!process.env.SEND_FILEPATH) throw new Error('Missing SEND_FILEPATH');
}

/**
 * @param {'gmail'} service
 */
function getTransporter(service) {
    switch (service) {
        case 'gmail':
            return nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.APP_EMAIL,
                    pass: process.env.APP_PWD
                }
            });
        default:
            throw new Error(`Unknown mail service ${service} not supported`);
    }
}


async function send() {
    const transporter = getTransporter(process.env.MAIL_SERVICE || 'gmail');

    const result = await transporter.sendMail({
        from: process.env.APP_EMAIL,
        to: process.env.TO_EMAIL,
        subject: process.env.SEND_SUBJECT,
        text: process.env.SEND_BODY,
        attachments: [
            {
                filename: process.env.SEND_FILENAME,
                content: fs.createReadStream(process.env.SEND_FILEPATH)
            },
        ]
    });

    console.log(`Sent email ${result.messageId} to ${result.envelope.to}`);
    console.log(`Accepted: ${result.accepted}`);
    if (result.rejected?.length > 0) console.log(`Rejected: ${result.rejected}`);
}


sanityCheck();
send();
