const validate =(schema)=>(req, res, next)=> {

         try {
             schema.parse({
                 body:req.body,
                 querry:req.querry,
                 params:req.params
             })
             next();     
         } catch (err) {
             return res.send(err.message)
         }
}

export default validate;
