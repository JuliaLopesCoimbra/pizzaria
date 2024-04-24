//esse middleware serve para validar o token de acesso no sistema
import { NextFunction, Request,Response } from "express";
//um serviço do jwt
import { verify } from "jsonwebtoken";

interface Payload{
    sub:string;
}
export function isAuthenticated(
    req:Request,
    res:Response,
    next:NextFunction
){
    //receber o token
    const authToken = req.headers.authorization;

    //se n mandou token:
    if(!authToken){
        //reposta de erro n autorizado 401
        return res.status(401).end();
    }
    //split é um metodo do js que pega itens, nesse caso eu to pegando o que está entre espaço
    //o primeiro item é Bearer porém uso a , virgula que tem função de ignorar o Bearer
    //pegando o token somente
    const [, token] = authToken.split(" ")

    //verificar e validar o token
    try{
        //validar
        //essa variavel sub vem lá do auth user service onde a gente colocou o id no subject 
        const {sub} = verify(
            //verificando se o token é o mesmo
            token,process.env.JWT_SECRET,
        ) as Payload;
        
        //a variavel user_id recebe o sub, mas essa variavel foi criada lá na pagina index.d.ts
        //pq e uma variavel do typescript e ela precisa ser tipada para funcionar   
        //ela está recuperando o id do token e colocando dentro da variavel user_id dentro do req
        req.user_id = sub

        return next();
    }
    //caso de errado
    catch(err){
        return res.status(401).end()
    }
}