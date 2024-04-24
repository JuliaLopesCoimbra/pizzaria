import prismaClient from "../../prisma";

class ListCategoryService{
    async execute(){
        //findMany é uma função do js que traz todos
        const category = await prismaClient.category.findMany({
            select:{
                id:true,
                name:true,
            }
        })
        return category
    }
}
export{ ListCategoryService}