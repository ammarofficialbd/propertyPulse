import connectDB from "@/config/database"
import User from "@/models/User"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            /* This part of the code is configuring the authorization parameters for the GoogleProvider
            in the authentication options. Here's what each parameter does: */
            authorization:{
                params:{
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    /* `authorization:{` is configuring the authorization parameters for the GoogleProvider in
    the authentication options. It allows you to specify additional parameters for the
    authorization process when users sign in with Google. In this case, the parameters being
    set are `prompt: "consent"`, `access_type: "offline"`, and `response_type: "code"`. */
    ],
    callbacks:{
        //Invoked on successful authentication
        async signIn({ profile }) {
            //1. Connsct to database
            connectDB()
            //2. Check if user already exists
            const existingUser = await User.findOne({email: profile.email})
            //3. If not, create a new user
            if(!existingUser){
                //truncate username
                const username = profile.name.slice(0, 20);
                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture
                });
            }
            //4. Return true to allow sign in success
            return true;
        },
        //Session callback function that modified the session object
        async session({ session}) {
            //1. get user from database
            const dbUser = await User.findOne({email: session.user.email})
            //2. Assign user Id from Sesion
            session.user.id = /* `dbUser._id.toString()` is converting the MongoDB ObjectId stored in
            the `dbUser._id` field to a string format. In MongoDB, the `_id` field
            is typically stored as an ObjectId, which is a unique identifier for
            each document in a collection. By calling `toString()` on the
            ObjectId, you are converting it to a string representation, which can
            be useful for various operations such as comparison, logging, or
            displaying the ID in a user-friendly format. */
            dbUser._id.toString()
            //3. Return Session
            return session
        }

    }
}