import prismaClient from "../../prisma";

class DetailUserService{
    //executa com aquela variavel tipada no index.d.ts que recebeu o sub
    async execute(user_id:string){

        //buscando lá no banco de dados o primiero id cadastrado lá que bate com o id que fornecemos, no caso 
        const user = await prismaClient.user.findFirst({
            where:{
                id:user_id
            },
            select:{
                id:true,
                name:true,
                email:true
            }
        })
        return user
    }
}

export {DetailUserService}