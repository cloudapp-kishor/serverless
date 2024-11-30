const sendgrid = require("@sendgrid/mail");

const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager();

exports.handler = async (event) => {

  const secretValue = await secretsManager.getSecretValue({
    SecretId: "email-service-credentials",
  }).promise();

  const { sendgrid_api_key } = JSON.parse(secretValue.SecretString);

  // Set the SendGrid API Key
  sendgrid.setApiKey(sendgrid_api_key);

  // Extract SNS message
  const snsMessage = event.Records[0].Sns.Message;
  const userData = JSON.parse(snsMessage);

  const msg = {
    to: userData.username,
    from: "noreply@kishorkashid.me",
    subject: "Verify Your Email",
    text: `Hi ${userData.firstName} ${userData.lastName}`,
    html: `<html>
             Hello, ${userData.firstName}
             <p>Thank you for registering. Please verify your email address by clicking the link below:</p>
             <p><a href="${userData.verificationLink}">Verify Email</a></p>
             <p>This link will expire in 2 minutes.</p>
           </html>`,
  };

  try {
    // Send the verification email
    await sendgrid.send(msg);
    console.log("Verification email sent to:", userData.username);
  } catch (error) {
    console.error("Error sending email or updating DB:", error);
    throw new Error("Failed to process user verification.");
  }
};
