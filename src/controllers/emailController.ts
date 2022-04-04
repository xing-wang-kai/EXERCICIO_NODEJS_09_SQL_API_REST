import { Request, Response } from 'express';
import nodemailer from 'nodemailer';


class EmailController {
    static contato = async ( req: Request, res: Response ) => {
        try{
            let transporter = nodemailer.createTransport({ 
                service: 'gmail', 
                host: 'smtp.gmail.com',
                auth: { 
                    user: 'texte@gmail.com', 
                    pass: 'texte' 
                } 
            });

            const mailOptions = {
                from: 'Kai Wang <teste@gmail.com>', 
                to: 'teste@gmail.com', 
                subject: 'Teste de envio de e-mail', 
                html: "<h1> Teste </h1>",
                text: 'Opa teste como você vai??'
              };

              let info = await transporter.sendMail(mailOptions);

              console.log("INFO: ", info)

            res.status(200).json({message: `Rota funcionou`})
        }catch(error: any){
            res.status(400).json( { message: `${error.message} - Ocorreu um error ao tentar executar o código`})
        }
    }

}

export default EmailController;