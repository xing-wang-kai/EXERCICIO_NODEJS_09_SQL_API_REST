import { Request, Response } from 'express';

import { Product } from '../models/Product';
import { sequelize } from '../instances/mysql'
import User from '../models/User';
class Home {

    static home = async (req: Request, res: Response)=>{
        try{
            await sequelize.authenticate();
            console.log('conexão estabelecida com sucesso!! ')
        }catch{
            console.log('Ocorreu um erro no momento da conexão')
        }
    
        try{
            let valor = await User.findAll();
            
            let age: number = 90;
            let showOld: boolean = false;
    
            if(age > 50) {
                showOld = true;
            }
    
            let list = Product.getAll();
            let expensiveList = Product.getFromPriceAfter(12);
    
            res.render('pages/home', {
                name: 'Kai',
                lastName: 'Wang',
                showOld,
                products: list,
                expensives: expensiveList,
                frasesDoDia: [],
                valor
            });
        }catch(error: any){
            res.status(404).json({error: true, message: `${error.message}`})
        }
    };

    static criarUsers = async(req: Request, res: Response) => {
        const valores = req.body;
        try{
            await User.create(valores);
    
            res.redirect('/')
            
        }catch(error: any){
            res.status(404).json({message: `${error.message} --> Ocorreu um erro ao tentar criar o usuário`})
        }       
    };

    static maisIdade = async( req: Request, res: Response ) => {
            const id: number = Number.parseInt(req.params.id as string);
        try{ 
            let valores = await User.findAll({where: {id: id}})
            if(valores.length > 0 ){
                let usuario = valores[0]
                    usuario.idade ++;
                    usuario.save();
            }
            res.redirect('/');
            

        }catch(error: any){
            res.status(400).json({message: `ALERT!! ${error.message} -> Ocorreu um Erro ao tentar criar o usuário`})
            res.status(200)
        }
    };
    static menosIdade = async( req: Request, res: Response ) => {
        const id: number = Number.parseInt(req.params.id as string);
    try{ 
        let valores = await User.findAll({where: {id: id}})
        if(valores.length > 0 ){
            let usuario = valores[0]
                usuario.idade --;
                usuario.save();
        }
        res.redirect('/');
        

    }catch(error: any){
        res.status(400).json({message: `ALERT!! ${error.message} -> Ocorreu um Erro ao tentar criar o usuário`})
        res.status(200)
    }
};
    static deleteUser = async ( req: Request, res: Response ) => {
        const id: number = Number.parseInt(req.params.id as string);
        try{
            await User.destroy( { where: { id : id }});

            res.status(200);
            res.redirect('/')

        }catch(error: any){
            res.status(400).json({message: `ALERT!! ${error.message} -> Ocorreu um Erro ao tentar criar o usuário`})
        };
    }
}

export default Home;

