import jwt from "jsonwebtoken";

export const generateToken = (id) => {{
    const privateKey = process.env.PRIVATE_KEY
   
    // takes payload, secret_key and(callback and options)
    return jwt.sign({id}, privateKey, {
        expiresIn:'30d'
    })
}};