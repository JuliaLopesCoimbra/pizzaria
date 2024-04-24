//esse arquivo tem a função de ser chamados os produtos de uma categoria

import prismaClient from "../../prisma";
//criando uma interface tipada com a seguinte string
interface ProductRequest{
    category_id:string
}

class ListByCategoryService{
    async execute({category_id}: ProductRequest){
        //me manda o id da categoria e passo os produtos que percetencem ao id da categoria

        //busca o id lá no banco de dados onde o id fornecido é o mesmo da categoria
        const findByCategory = await prismaClient.product.findMany({
            where:{
                category_id:category_id
            }
        })

        return findByCategory;
    }
}

export { ListByCategoryService}