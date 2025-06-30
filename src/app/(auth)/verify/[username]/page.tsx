"use client"

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader, AlertCircle } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';

const EmailVerifiedPage = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [isVerifying, setIsVerifying] = useState(true);
    const [verificationCode, setVerificationCode] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState<string | null>(null);
    
    const params = useParams();
    const router = useRouter();
    const searchParam = useSearchParams();

    useEffect(() => {
        const token = searchParam.get('token');
        const username = params.username as string;
        
        if (token && username) {
            setVerificationCode(token);
            setUsername(username);
        } else {
            setError("Missing verification token or username");
            setIsVerifying(false);
        }
    }, [searchParam, params]);

    const onVerify = async () => {
        try {
            setIsVerifying(true);
            setError(null);

            const res = await axios.post(`/api/auth/verify-email`, { 
                username, 
                token: verificationCode 
            });
            
            if (res.data.success) {
                setIsVerified(true);
                toast.success("Email verified successfully!");
                
                // Redirect after a short delay to show success message
                setTimeout(() => {
                    router.replace("/sign-in");
                }, 2000);
            } else {
                throw new Error(res.data.message || "Verification failed");
            }

        } catch (error: any) {
            console.log(error);
            
            // Extract meaningful error message
            const errorMessage = error.response?.data?.message || 
                               error.message || 
                               "Verification failed. Please try again.";
            
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsVerifying(false);
        }
    };

    useEffect(() => {
        if (verificationCode.length > 0 && username) {
            onVerify();
        }
    }, [verificationCode, username]);

    const handleRetry = () => {
        if (verificationCode && username) {
            onVerify();
        }
    };

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-white px-4 text-center">
            {isVerifying && (
                <>
                    <Loader className="w-16 h-16 text-gray-400 animate-spin mb-6" />
                    <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
                        Verifying Email <span className='animate-pulse'>...</span>
                    </h1>
                    <p className="text-gray-600">
                        Please wait while we verify your email address.
                    </p>
                </>
            )}

            {isVerified && (
                <>
                    <CheckCircle2 className="w-16 h-16 text-green-600 mb-6" />
                    <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
                        Email Verified!
                    </h1>
                    <p className="text-gray-700 max-w-md">
                        Your email has been successfully verified. You can now log in to your account and start using the app.
                    </p>
                    <p className="mt-4 text-sm text-gray-500">
                        Redirecting you to the login page...
                    </p>
                </>
            )}

            {!isVerifying && !isVerified && error && (
                <>
                    <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
                    <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
                        Verification Failed
                    </h1>
                    <p className="text-red-600 max-w-md mb-6">
                        {error}
                    </p>
                    <div className="space-y-3">
                        <button 
                            onClick={handleRetry}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Try Again
                        </button>
                        <p className="text-sm text-gray-500">
                            or{' '}
                            <button 
                                onClick={() => router.push('/sign-up')}
                                className="text-blue-600 hover:underline"
                            >
                                go back to sign up
                            </button>
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default EmailVerifiedPage;