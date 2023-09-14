
import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt' 

export const GET = async (req,{params})=>{
    try{
        await connectToDB();

        let prompts = await Prompt.find({creator : params.id}).populate("creator");
        console.log(prompts)
        return new Response (JSON.stringify(prompts , {status  : 201}));
      } catch (err) {
        console.error("Failed to get Prompts", err);
        return new Response("Failed to get Prompts" , {status : 500})
      }
}