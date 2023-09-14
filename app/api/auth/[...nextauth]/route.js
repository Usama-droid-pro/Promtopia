import NextAuth from 'next-auth';
import mongoose from 'mongoose';
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@utils/database';
import User from '../../../../models/user';
console.log({
    clientId : process.env.CLIENT_ID,
    clientSecret : process.env.CLIENT_SECRET,
})
const handler = NextAuth({
    providers : [
        GoogleProvider({
            clientId : process.env.CLIENT_ID,
            clientSecret : process.env.CLIENT_SECRET,
        })
        
    ], 
    callbacks : {

        async session({session}){
            console.log(session)
            const sessionUser = await User.findOne({
                email : session.user.email
            });
            session.user.id = sessionUser.id.toString();
            return session;
        },
        async signIn({profile}){
            let connection = await connectToDB();
             const userExists = await User.findOne({email : profile.email});
             console.log(userExists)
            if(!userExists){
            try{    
                const newUser = new User({
                    _id :new mongoose.Types.ObjectId(),
                    email : profile.email , 
                    user_name : profile.name.replace("" , "").toLowerCase(),
                    image: profile.picture    
                });
                const result  = await newUser.save();
        
            }
            catch(err){
                console.log("ERRROR " ,err)
            }
          
            }
            return true;
    
        }
    }
  
})

export {handler as GET , handler as POST}