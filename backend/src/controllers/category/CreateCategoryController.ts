//controler recebe diretamente os parametros da requisição
//ele pega os parametros e chama o serviço repassando os dados necessarios
import { Request, Response } from "express";
import { CreateCategoryService } from "../../service/category/CreateCategoryService";

class CreateCategoryController{
    async handle(req:Request, res:Response){
        //puxando o nome da categoria criada lá em service
        const {name}= req.body

        //recebendo serviço
        const createCategoryService = new CreateCategoryService()
        //executando serviço, e pegando o nome da categoria
        const category = await createCategoryService.execute({name})

        return res.json(category)
    }
}
export {CreateCategoryController}