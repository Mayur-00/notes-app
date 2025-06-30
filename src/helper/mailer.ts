import UserModel from "@/models/user.mode";
import { SendEmailParamObj } from "@/types/api.type";
import { v7 as uuidV7 } from "uuid";
import nodemailer from "nodemailer";

export const SendEmail = async ({
  verifyCode,
  emailId,
  userId,
  emailType,
  username
}: SendEmailParamObj) => {
  try {
    let code = verifyCode; // Use the passed verifyCode by default

    // Gmail configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // Verify connection configuration
    console.log('Verifying email configuration...');
    await transporter.verify();
    console.log('Email configuration verified successfully');

    let emailOptions;

    if (emailType === "RESET_PASSWORD") {
      // Generate new code for password reset
      code = uuidV7()
      
      // Update user with forgot password code
      await UserModel.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordCode: code,
          forgotPasswordCodeExpiry: Date.now() + 3600000, // 1 hour
        }
      });

      emailOptions = {
        from: `"Notes App" <${process.env.EMAIL_USER}>`,
        to: emailId,
        subject: "Reset Password - Notes App",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Reset Your Password</h2>
            <p>Hello ${username || 'User'},</p>
            <p>You requested to reset your password. Click the button below to reset your password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.DOMAIN}/resetpassword/${username}?token=${code}" 
                 style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; border-radius: 5px;">
              ${process.env.DOMAIN}/resetpassword/${username}?token=${code}
            </p>
            <p><strong>This link will expire in 1 hour.</strong></p>
            <p>If you didn't request this password reset, please ignore this email.</p>
          </div>
        `,
      };
    } else if (emailType === "VERIFY") {
      emailOptions = {
        from: `"Notes App" <${process.env.EMAIL_USER}>`,
        to: emailId,
        subject: "Verify Your Email - Notes App",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Welcome to Notes App!</h2>
            <p>Hello ${username || 'User'},</p>
            <p>Thank you for signing up! Please verify your email address to complete your registration:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.DOMAIN}/verify/${username}?token=${code}" 
                 style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Verify Email
              </a>
            </div>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; border-radius: 5px;">
              ${process.env.DOMAIN}/verify/${username}?token=${code}
            </p>
            <p><strong>This verification link will expire in 1 hour.</strong></p>
            <p>If you didn't create this account, please ignore this email.</p>
          </div>
        `,
      };
    } else {
      throw new Error(`Unsupported email type: ${emailType}`);
    }

    console.log(`Sending ${emailType} email to ${emailId}...`);
    const emailResponse = await transporter.sendMail(emailOptions);
    
    console.log(`${emailType} email sent successfully to ${emailId}:`, emailResponse.messageId);
    
    return emailResponse;

  } catch (error: any) {
    console.error(`Failed to send ${emailType} email to ${emailId}:`, error);
    
    // More specific error messages
    if (error.code === 'EAUTH') {
      throw new Error('Gmail authentication failed. Please check your EMAIL_USER and EMAIL_APP_PASSWORD.');
    } else if (error.code === 'ESOCKET') {
      throw new Error('Network connection failed. Please check your internet connection.');
    } else {
      throw new Error(`Email sending failed: ${error.message}`);
    }
  }
};