const sendgrid = require("@sendgrid/mail");

// Set the SendGrid API Key
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
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
