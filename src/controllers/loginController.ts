import { Request, Response} from 'express';
import User from '../models/User'
import bcrypt from "bcrypt";
import JWT from 'jsonwebtoken'
import 'dotenv/config'

class Login{
    static acesso = async (req: Request, res: Response) => {
        res.status(200).render('pages/login')
    }
    static logar = async (req: Request, res: Response) => {
        const valores = req.body;
        if(valores.email){
            if(valores.password){

                try{
                    const users = await User.findOne( {where: { email: valores.email} } )

                    if(users){
                        const password: string = "$2b$12$W3fh5x9PUGsIFGPBRBac3.Dk2c4rju.eMwvE3mzqHAVEIZnqGfzM."
                        if(await bcrypt.compare(valores.password, password )){//preciso ver como instanciar
                            const Token = await JWT.sign({id: users.id}, process.env.CRYPT as string, { expiresIn: "7d"})
                            res.status(200)
                            .redirect('/')
                            console.log({message: "login realizado com sucesso!!", user: users, token: Token})
                        }else{
                            res.status(400).json({message: `A Senha informada é inválida`})
                        }
                    }
                    else{
                        res.status(400).json({message: `Usuário não localizado`})
                    }
                }catch(error: any){
                    res.status(400).json({message: `${error.message} - Ocorreu um error ao logar`})
                }

            }else{
                res.status(400).json({message: `ERROR! não foi informado password`})
            }
        }else{
            res.status(400).json({message: `ERROR! não foi informado o e-mail`})
        }
    }
}

export default Login;