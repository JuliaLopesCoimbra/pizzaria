import { Request, Response } from "express";
import { ListByCategoryService } from "../../service/products/ListByCategoryService";

class ListByCategoryController{
    async handle(req:Request, res: Response){
        //o query força a manda a categoria_id, ela é como string
        const category_id = req.query.category_id as string

        const listByCategory = new ListByCategoryService();
        //chamando a nossa função
        const products = await listByCategory.execute({
            //chamando o id da categoria para mostrar todos os produytos pertencentes
            category_id
        });
        return res.json(products)
    }
}

export { ListByCategoryController}