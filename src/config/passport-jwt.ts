import passport from 'passport'
import { Request, Response, NextFunction} from 'express'
import dotenv from 'dotenv';
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt';
import User from '../models/User'

dotenv.config();

const notAuthJSON = {
    status: 401,
    message: `Acesso foi negado!`
}
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrkey: process.env.CRYPT as string
}

passport.use( new jwtStrategy( options, async (payload, done) => {
    try{
        const user = await User.findOne({where: { id: payload.id }})
        if(user){
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