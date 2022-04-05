import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';

import 'dotenv/config'


class Auth {
    
    static private = (req: Request, res: Response, next: NextFunction) => {
        let sucess = true;
        if(sucess) {
            next();
        }else{
            res.status(403).json({message: "O acesso não authorizado !"})
        }
    }
    static authorizationkey = ( req: Request, res: Response, next: NextFunction) => {
    
        const authHeader: string = req.headers.authorization as string;
        if(authHeader){
            const[ bear, token ] = authHeader.split(' ') as string[];
            if(token){
                try{
                    const decoded = JWT.verify(token, process.env.CRYPT as string);
                    console.log({message: `${token} - ESTE È O TOKEN`})
                    console.log({message: `${Object.keys(decoded)} -- ${Object.values(decoded)} - ESTE DADOS AO ACESSAR O MIDDLES`})
                    console.log(decoded)
                    next();
                    
                }catch(error:any){
                    res.status(404).json({message: "acesso foi negado! "})

                }         
            }

        }else{
            res.status(403).json({message: `Acesso negado!`})
        }
    }
}
export default Auth;