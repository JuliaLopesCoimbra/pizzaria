import { Request,Response } from "express";
import { DetailUserService } from "../../service/user/DetailUserService";

class DetailUserController{
    async handle(req:Request, res:Response){

        //mostrando o id do user, é aquela variavel que recebeu sub do auth e foi tipada em index.d.ts
        const user_id = req.user_id
        

        const detailUserService = new DetailUserService();

        const user = await detailUserService.execute(user_id);

        return res.json(user)
    }
}
export { DetailUserController}