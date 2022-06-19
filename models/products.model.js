import mongoose from 'mongoose'


const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        required:true,
        default:'https://miro.medium.com/max/1000/1*-Nr0OP_Nu7b2NPrcgJ1SuA.png',
        type:String
    },
    inStock:{

        type:Number,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users",
    }

},{
    timestamps:true
})


export const productModel = mongoose.model('products', productSchema)
