import { Request,Response } from "express";
import { CreateProductService } from "../../service/products/CreateProductService";
class CreateProductController{
    async handle(req:Request, res:Response){
        const {name, price, description, category_id} = req.body;

        const createProductService = new CreateProductService();
        //se n tiver um requisitição de imagem, n enviou a foto e da erro
        if(!req.file){
            throw new Error("error upload file")
        }else{
            //a caso ter enviado o produto vai ser cadastrado
            const {originalname, filename: banner} =req.file;
            

            //realizando a classe que fizemos lá no Productservice e pondo os dados que a interface criou
            //como o nome, description....
            const product = await createProductService.execute({
                name,price,description,banner:"",category_id
            });
            return res.json(product)
        }
    }
}
export {CreateProductController}