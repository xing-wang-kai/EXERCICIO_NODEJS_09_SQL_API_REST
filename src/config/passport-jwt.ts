import passport from 'passport'
import { Request, Response, NextFunction} from 'express'
import dotenv from 'dotenv';
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt';
import User from '../models/User'
import bcrypt from 'bcrypt'

dotenv.config();

const notAuthJSON = {
    status: 401,
    message: `Acesso foi negado!`
}
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrkey: process.env.CRYPT as string
}

const verificarSenha = async ( password : string, passwordhash : string) => {
    const valorSenha = await bcrypt.compare(password, passwordhash)
    if(!valorSenha){
        throw new Error('Email ou Senha inválido.')
    }
}
passport.use( new jwtStrategy( options, async (payload, done) => {
    try{
        const user = await User.findOne({where: { id: payload.id }});
        if(user){
            await verificarSenha(payload.password, user.password);
            return done(null, user);
        }else{
            return done( notAuthJSON, false)
        }   
        
    }catch(error:any){
        return done( notAuthJSON, false)
    }
    
}))

export const privateRouter = ( req: Request, res: Response, next: NextFunction) => {
    const authFunction = passport.authenticate('jwt', (err, user) =>{
        return user? next(): next(notAuthJSON);
    })
}

export default passport;