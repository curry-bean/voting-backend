import { ordersModel} from "../models/orders.model.js"
import asyncHandler from 'express-async-handler'
import SendGridHelper from "../middleware/email.midlleware.js";


export const makeOrder = asyncHandler(async(req, res) => {

    if(!Array.isArray(req.body) || !req.body.length) {
        res.sendStatus(401)
        res.json({message: 'There is no order to make'});
    } else {
      const order = new ordersModel(
        {
            user: req.user._id,
            orders: req.body,
        }
      );
      

      const made_order = await order.save();
      const email = req.user.email
      const id = made_order._id
      const items = [
          {
              image: made_order.orders.item.image,
              price: made_order.orders.item.price
          }
      ]
      await SendGridHelper.sendOrderConfirmation(email,id,...items);

      return res.json({
            orderId: made_order._id,
            customer: made_order.user,
            orderStatus: made_order.status,
            orders: made_order.orders
          })
     }
});


export const deleteOrder = asyncHandler(async(req, res) => {

      const order = await ordersModel.findById(req.params.id);
      if(order.user.toString() !== req.user._id.toString()){
          res.sendStatus(401)
          res.json({message: "You're not authourized to performe this function"});
      }

      if(order){
          await order.remove();
          res.json({message: "order canncelled successfully"});
      }else{
          res.sendStatus(401)
          res.json({message: "order not found"});
      }
});