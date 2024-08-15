import { resend } from '@/lib/resend'
import VerificationEmail from '@/Emails/VerificationEmail'
import { ApiResponse } from '@/Types/ApiResponse'

export async function sendVerificationEmail(email: string, username: string, verifyCode: string) : Promise<ApiResponse> {
     try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification Code',
            react: VerificationEmail({ username, otp: verifyCode}),
          });
        return { success: true, message: "Verification email sent successfully!"}
     } catch (emailError) {
        console.log("Email error: " + emailError);
        return { success: false, message: "Fail to send email"}
     }
}

