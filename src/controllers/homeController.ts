import { Request, Response } from 'express';

import { Product } from '../models/Product';
import { sequelize } from '../instances/mysql'

export const home = async (req: Request, res: Response)=>{
    try{
        await sequelize.authenticate();
        console.log('conexão estabelecida com sucesso!! ')
    }catch{
        console.log('Ocorreu um erro no momento da conexão')
    }

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
        frasesDoDia: []
    });
};