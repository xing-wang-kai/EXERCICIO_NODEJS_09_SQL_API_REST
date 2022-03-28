import { Request, Response } from 'express';

import { Product } from '../models/Product';
import { sequelize } from '../instances/mysql'
import User from '../models/User';
import { resolveSoa } from 'dns';
 
export const home = async (req: Request, res: Response)=>{
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