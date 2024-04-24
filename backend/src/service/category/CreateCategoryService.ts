//esse arquivo será para criar as categorias 

//importando banco de dados
import prismaClient from "../../prisma";

//quando alguem for enviar para cadastrar uma categoria nova 
//precisamos receber o nome da categoria e cadastrar no banco de dados
interface CategoryRequest{
    name:string;
}

class CreateCategoryService{
    //executando essa função precisa receber uma propriedade name que é uma string
    async execute({name}: CategoryRequest){
        //se o nome da categoria for vazio dará erro
        if(name === ""){
            throw new Error("Nome inválido")
        }
        //se nome n está vazio então cria lá no banco de dados:
        const category = await prismaClient.category.create({
            data:{
                name:name,
            },
            //select tem a função de msotrar só o que está dentro dele
            select:{
                id:true,
                name:true,
            }
        })

        return category
    }
}

export { CreateCategoryService}