import sgMail from '@sendgrid/mail'

// go thro their docs 
class SendGridHelper { 
    
    static async sendConfirmationMail (token,email) {
        const server = process.env.SERVER || 'https://localhost:1338/';
    
          sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

          const msg  = {
    
            to: email,
            from : `${process.env.Company_Email}`,
            templateId: `${process.env.WELCOME_MAIL_ID}`,
      
            dynamic_template_data: {

              link:`${process.env.FRONTEND_URL}verification/${token}`
            }

          }

            sgMail.send(msg).then(() => {}, error => {
              console.error(error);
           
              if (error.response) {
                return res.json({message: error.response.body})
              }
            });

            server();
      }

      static async sendOrderConfirmation(email,id,items){
        const server = process.env.SERVER || 'https://localhost:1338/';
    
          sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

          const msg  = {
    
            to: email,
            from : `${process.env.Company_Email}`,
            templateId: `${process.env.ORDER_CONFIRMATION_ID}`,
      
            dynamic_template_data: {

              message:`Your order of id${id} has been received and is being processed you will receive a call soon`,
              Ordered_Items:`Orderded Items\n ${items}`
            }

          }

            sgMail.send(msg).then(() => {}, error => {
              console.error(error);
           
              if (error.response) {
                return res.json({message: error.response.body})
              }
            });

            server();

      }

      static async sendPasswordResetEmail(email){
        const server = process.env.SERVER || 'https://localhost:1338/';
    
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

        const msg  = {
  
          to: email,
          from : `${process.env.Company_Email}`,
          templateId: `${process.env.RESET_PASSWORD_ID}`,
    
          dynamic_template_data: {
            mesage:'Follow the link below to reset your Password',
            link:`${process.env.RESETPASSWORD_URL}verification/${token}`,
         
          }

        }

          sgMail.send(msg).then(() => {}, error => {
            console.error(error);
         
            if (error.response) {
              return res.json({message: error.response.body})
            }
          });

          server();

      }

    
}

export default SendGridHelper;