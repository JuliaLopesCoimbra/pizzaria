import { Request, Response } from "express";
import { CreateOrderService } from "../../service/order/CreateOrderService";

class CreateOrderController{
    async handle(req:Request, res:Response){
        //requisitando as variaveis da interface lá no service
        const {table, name} = req.body

        const createorderService = new CreateOrderService();

        const order = await createorderService.execute({
            table,name
        });

        return res.json(order)


    }
}
export {CreateOrderController}