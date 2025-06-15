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

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.TEST_SANDBOX_USERNAME,
        pass: process.env.TEST_SANDBOX_PASSWORD,
      },
    });

    let emailOptions;

    if (emailType === "RESET_PASSWORD") {
      // Generate new code for password reset
      code = uuidV7();
      
      // Update user with forgot password code
      await UserModel.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordCode: code,
          forgotPasswordCodeExpiry: Date.now() + 3600000, // 1 hour
        }
      });

      emailOptions = {
        from: "Notes App <noreply@notesapp.com>", // Better sender format
        to: emailId,
        subject: "Reset Password - Notes App",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Reset Your Password</h2>
            <p>Hello ${username || 'User'},</p>
            <p>You requested to reset your password. Click the button below to reset your password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.DOMAIN}/resetpassword?username=${username}&token=${code}" 
                 style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; border-radius: 5px;">
              ${process.env.DOMAIN}/resetpassword?username=${username}&token=${code}
            </p>
            <p><strong>This link will expire in 1 hour.</strong></p>
            <p>If you didn't request this password reset, please ignore this email.</p>
          </div>
        `,
      };
    } else if (emailType === "VERIFY") {
      emailOptions = {
        from: "Notes App <noreply@notesapp.com>", // Better sender format
        to: emailId,
        subject: "Verify Your Email - Notes App",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Welcome to Notes App!</h2>
            <p>Hello ${username || 'User'},</p>
            <p>Thank you for signing up! Please verify your email address to complete your registration:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.DOMAIN}/verify?username=${username}&token=${code}" 
                 style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Verify Email
              </a>
            </div>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; border-radius: 5px;">
              ${process.env.DOMAIN}/verify?username=${username}&token=${code}
            </p>
            <p><strong>This verification link will expire in 1 hour.</strong></p>
            <p>If you didn't create this account, please ignore this email.</p>
          </div>
        `,
      };
    } else {
      throw new Error(`Unsupported email type: ${emailType}`);
    }

    const emailResponse = await transporter.sendMail(emailOptions);
    
    // Log successful email sending (optional)
    console.log(`${emailType} email sent successfully to ${emailId}:`, emailResponse.messageId);
    
    return emailResponse;

  } catch (error: any) {
    console.error(`Failed to send ${emailType} email to ${emailId}:`, error);
    throw new Error(`Email sending failed: ${error.message}`);
  }
};