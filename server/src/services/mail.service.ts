/**
 * All the functions related to sending emails with SendGrid
 */
import 'dotenv/config';
import SGmail, { MailDataRequired } from '@sendgrid/mail';

const appName = 'Exposurepedia';
const senderName = 'Exposurepedia Admin';
const baseUrl = 'https://exposurepedia.com';

// eslint-disable-next-line no-useless-concat
SGmail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

/**
 * Sends a reset password link to a user
 * @param email The email of the user to send the link to
 * @param token The unique token identifying this reset attempt for the user
 */
const emailResetPasswordLink = async (email: string, token: string) => {
  const resetLink = `${baseUrl}/reset-password/${token}`;
  const mailSettings: MailDataRequired = {
    from: {
      email: process.env.SENDGRID_EMAIL_ADDRESS || 'missing@mail.com',
      name: senderName,
    },
    to: email,
    subject: 'Link to Reset Password',
    html:
      `<p>You are receiving this because you (or someone else) have requested ` +
      `the reset of your account password for ${appName}. Please visit this ` +
      `<a href=${resetLink}>link</a> ` +
      `within an hour of receiving this email to successfully reset your password.</p>` +
      `<p>If you did not request this change, please ignore this email and your ` +
      `account will remain secured.</p>`,
  };

  // Send the email and propogate the error up if one exists
  await SGmail.send(mailSettings);
};

/**
 * Sends an email to verify an email account
 * @param email The email of the user to send the link to
 * @param token The unique token identifying this verification attempt
 */
const emailVerificationLink = async (email: string, token: string) => {
  const resetLink = `${baseUrl}/verify-account/${token}`;
  const mailSettings: MailDataRequired = {
    from: {
      email: process.env.SENDGRID_EMAIL_ADDRESS || 'missing@mail.com',
      name: senderName,
    },
    to: email,
    subject: 'Verify account',
    html:
      `<p> Your Exposurepedia account has been approved! Please visit the following ` +
      `<a href=${resetLink}>link</a> ` +
      `to verify your account for ${appName} and complete registration.</p>` +
      `<p>If you did not attempt to register an account with this email address, ` +
      `please ignore this message.</p>`,
  };
  // Send the email and propogate the error up if one exists
  await SGmail.send(mailSettings);
};

/**
 * Sends an email to notify user access denial
 * @param email The email of the user to send the notification to
 */
const emailAccessDenial = async (email: string) => {
  const mailSettings: MailDataRequired = {
    from: {
      email: process.env.SENDGRID_EMAIL_ADDRESS || 'missing@mail.com',
      name: senderName,
    },
    to: email,
    subject: 'Access Denied',
    html: `<p>Your account has been removed. Please register again if this is a mistake.</p>`,
  };
  // Send the email and propogate the error up if one exists
  await SGmail.send(mailSettings);
};

/**
 * Sends an email to us for contact page
 * @param name The name of the user
 * @param email The email of the user
 * @param message The message the user wants to send to us
 */
const emailForContact = async (
  name: string,
  email: string,
  message: string,
) => {
  const mailSettings: MailDataRequired = {
    from: {
      email: process.env.SENDGRID_EMAIL_ADDRESS || 'missing@mail.com',
      name,
    },
    replyTo: email,
    to: process.env.SENDGRID_EMAIL_ADDRESS,
    subject: `${name} contacted us!`,
    html: `<p>${message}</p>`,
  };
  // Send the email and propogate the error up if one exists
  await SGmail.send(mailSettings);
};

export {
  emailVerificationLink,
  emailResetPasswordLink,
  emailAccessDenial,
  emailForContact,
};
