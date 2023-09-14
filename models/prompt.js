import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    creator : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    prompt : {
        type : String,
        required : [true , 'Prompt is required']
    },
    tag : {
        type : String,
        required : [true , 'tag is required']
    }
});

const Prompt = mongoose.models.Prompt || mongoose.model("Prompt" , promptSchema);
export default Prompt;