import { object, string } from "zod";

export const createUserValidation = object({
    body:object({
        
            username:string({
                required_error:"username is required"
            }),
            
            password:string({
                required_error:"Password is required"
            }),
    
            email:string({
               required_error:"Email is required"
            })
        
    })
});


export const loginUserValidation = object({

    body:object({
           
            email:string({
                required_error:"Email is required"
            }),
            
            password:string({
                required_error:"Password is required"
            })
    })
});

export const resetpasswordValidator = object({

    body:object({
           
            email:string({
                required_error:"Email is required"
            }),
            
            password:string({
                required_error:"Password is required"
            })
    })
});