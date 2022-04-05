import passport from "passport";
import { BasicStrategy } from "passport-http";
import User from '../models/User';
import { Request, Response, NextFunction} from 'express';

passport.use( new BasicStrategy(async ( email, password, done )=>{

    try{
        if(email && password){
            const user = await User.findOne({ where: { email: email, password: password}})

            if(user){
                return done(null, user)
            }
            else{
                return done({status:400, message: "usuário nao localizado"}, false)
            }
            
        }else{
            return done({status: 401, message: 'não autorizado'}, false)
        }
    }catch(error:any){
        return done({message: `${error.code} - Ocorreu Um error`})
    }   
    
    
}));

export const privateRouter = (req: Request, res: Response, next: NextFunction) => {
    const authFunction = passport.authenticate('basic', (err, user) => {
        return user ? next() : next({message: `${err.code}`})
    }) ( req, res, next );
}

export default passport;