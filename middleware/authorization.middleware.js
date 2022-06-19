import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import userModel from '../models/user.model.js'


export const isAdminAuth = asyncHandler(async(req, res, next) => {

    let authorizationToken;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try {
            authorizationToken = req.headers.authorization.split(" ")[1]

            // jwt.verify(token, secretkey, [options, callback])
            const decode = jwt.verify(authorizationToken, process.env.PRIVATE_KEY)
          
            req.user = await userModel.findOne({ _id: decode.id }).select('-password')

            // Check if admin field is true
            if (!req.user.admin) {
               return res.sendStatus(401).json({message: "you're not authorized to performe that action"})
            }
             next();           
            
        } catch (error) {
            res.json({message: `${error}: not allowed to performe this function`})
        }
    }
 

    if(!authorizationToken){
        res.sendStatus(401)
        res.json({message: 'authentication failed'})
    }
});


export const isUserAuth = asyncHandler(async(req, res, next) => {
    let authorizationToken;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
         try {
            authorizationToken = req.headers.authorization.split(" ")[1]

            const decodeUser = jwt.verify(authorizationToken, process.env.PRIVATE_KEY)
            req.user = await userModel.findById(decodeUser.id).select('-password')
            next();
         } catch (error) {
             res.sendStatus(401)
             console.error({message: error})
         }
    }

    if(!authorizationToken){
        res.sendStatus(401)
        res.json({message: 'authentication failed'})
    }
         
});