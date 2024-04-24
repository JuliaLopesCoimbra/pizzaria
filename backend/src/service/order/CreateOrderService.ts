import prismaClient from "../../prisma";
//criando a variavel tipada onde vai ser usada abaixo
interface OrderRequest{
    table:number;
    name:string;
}

class CreateOrderService{
    //a funcao será realizando somente se passar o numero da mesa e o nome como criado na interface
    async execute({table, name}: OrderRequest){
        const order = await prismaClient.order.create({
            data:{
                table:table,
                name:name
            }
        })

        return order
    }
}

export {CreateOrderService}