import { productModel } from "../models/products.model.js";
import asyncHandler from 'express-async-handler'


export const createProduct = asyncHandler(async(req, res) => {
    const {title, price, description, image, inStock} = req.body
    if(!title || !price || !description || !image || !inStock){
        res.sendStatus(400)
        throw new Error(" All fields are required ")
    }else{
        const product = new productModel({
            user:req.user._id,
            title,
            price,
            description,
            inStock,
            image
        })

        const createdProduct = await product.save();

        if(createdProduct){
            res.json({
                id:createdProduct._id,
                image:createdProduct.image,
                title:createdProduct.title,
                description:createdProduct.description,
                price:createdProduct.price,
                inStock:createdProduct.inStock,
            })
        }
    }
})

 export const fetchProducts =  asyncHandler(async(req, res) => {

//   We want to fetch products created by the organizations responsible person for   craeting products into the database, but the best way to do this is by Middleware

      try {
        const products =  await productModel.find()
         res.json(products)
        
      } catch (error) {
          res.send(error.message);
      }
});


export const fetchSingleProduct=asyncHandler(async(req,res) => {
    const product = await productModel.findById(req.params.id)

    if(product){
        res.json(product)
    }else{
        res.sendStatus(404)
        res.json({message: "product not found"})
    }

});

export const updateProduct = asyncHandler(async(req, res) => {
    const {title, price, description, image, inStock} = req.body
    const product = await productModel.findById(req.params.id)

    if(product.user.toString() !== req.user._id.toString()){
          res.sendStatus(401)
          res.json({message: "You're not authousized to perform this action"})

    }
    
    if(product){
        product.title = title;
        product.price= price;
        product.description= description;
        product.image= image;
        product.inStock= inStock;

        await product.save();
        res.json({message: "data updated successfully"});

    }
    else{
       res.sendStatus(404)
       res.json({message: 'product not found'});
    }

});

export const deleteProduct= asyncHandler(async(req, res) => {
    const product = await productModel.findById(req.params.id);

    if(product.user.toString() !== req.user._id.toString()){
        res.sendStatus(401)
        res.json({message: "You're not authousized to perform this action"})

  }

  if(product){
      await product.remove();
      res.json({message: 'product deleted successfully'});
  }
  else{
    res.sendStatus(404)
    res.json({message: 'product not found'});
  }

});