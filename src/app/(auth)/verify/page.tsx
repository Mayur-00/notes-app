import React from 'react';
import { MailCheck } from 'lucide-react'; // Optional: install lucide-react for icons

const EmailVerificationNotice = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <MailCheck className="w-16 h-16 text-green-600 mb-6" />
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
        Check Your Email
      </h1>
      <p className="text-gray-700 max-w-md">
        We've sent a verification link to your email. Click the link in the message to verify your account. <br />
        If you don't see it, check your spam or promotions folder.
      </p>
      <p className="mt-4 text-sm text-gray-500">
        You can also copy and paste the link into your browser if clicking doesn't work.
      </p>
    </div>
  );
};

export default EmailVerificationNotice;
