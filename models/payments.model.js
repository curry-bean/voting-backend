import mongoose from 'mongoose'

const paymentsSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    orderId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'orders',
         rquired:true,

    },
    paymentMethod:{
        type:String,
        default:'On Delivery',
        required:true
    },
    Amount_payed:{
        type:Number,
        required:true,

    }
});

export const paymentsModel = mongoose.model("payments", paymentsSchema);