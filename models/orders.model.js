import mongoose from 'mongoose'
const ordersSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users",
    },
    orders:[
        {
            item:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'products'
        
            },
            quantity:{
                type:Number,
                required:true,
                default:1
            },
            price:{
                type:String,
                required:true,
            },
       

        }

    ]   
});
export const ordersModel = mongoose.model("orders", ordersSchema);