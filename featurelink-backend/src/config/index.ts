import { configDotenv } from 'dotenv';
configDotenv()

export default {
    mongoURI: process.env.MONGO_URI || '',
    // clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY || '',
    // clerkSecretKey: process.env.CLERK_SECRET_KEY || '',
    // herokuApiKey: process.env.HEROKU_API_KEY || '',
    // resendApiKey: process.env.RESEND_API_KEY || ''
};