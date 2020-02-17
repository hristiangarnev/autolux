const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
const makeANiceEmail = text => `
  <div classNmae="email" style="
    border: 1px solid black;
    padding: 20px;
    font-size: 16px;
    line-height: 1.2;
  ">
    <h2>Hello there!</h2>
    <p>${text}</p>
  </div>
`;

exports.transport = transport;
exports.makeANiceEmail = makeANiceEmail;