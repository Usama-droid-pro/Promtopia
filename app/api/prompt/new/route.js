
import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt' 
import mongoose from "mongoose";

export const POST = async (req,res)=>{
    try{
        const {user_id , prompt , tag} = await req.json();
        console.log(prompt)
        console.log(tag)
        console.log(user_id)
        await connectToDB();

        const newPrompt = new Prompt({
            _id : new mongoose.Types.ObjectId(),
            creator : user_id , 
            tag : tag,
            prompt : prompt

        });

        let result = await newPrompt.save();
        console.log("This is saved ", result);
        return new Response (JSON.stringify(result , {status  : 201}));
      } catch (err) {
        console.error("Failed to create Prompt", err);
        return new Response("Failed to create Prompt" , {status : 500})
      }
}