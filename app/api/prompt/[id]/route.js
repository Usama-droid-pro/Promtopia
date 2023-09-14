
import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt' 

//Get 
export const GET = async (req,{params})=>{
    try{
        await connectToDB();

        let prompt = await Prompt.findById(params.id).populate("creator");
        return new Response (JSON.stringify(prompt , {status  : 201}));
      } catch (err) {
        console.error("Failed to get Prompts", err);
        return new Response("Failed to get Prompts" , {status : 500})
      }
}

//PATCH
export const PATCH = async (req , {params}) =>{
    const {prompt , tag} = await req.json();

    try{
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt){
            return new Response("Prompt not found" ,{status : 404})
        }
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt) , {status : 200});

    }
    catch(err){
        return new Response("Error occurred while Patching" , {status : 500})
    }
}

//DELETE

export const DELETE = async (req, {params}) => {
    try{
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully" , {status: 200});
    }
    catch(err){
        return new Response("Prompt could not be deleted" ,{status : 500})
    }
}