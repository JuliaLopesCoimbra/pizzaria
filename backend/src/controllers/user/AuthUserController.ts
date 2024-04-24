import { Request, Response } from "express";
import { AuthUserService } from "../../service/user/AuthUserService";
class AuthUserController{
    async handle(req:Request, res:Response){
        //pegando o email e senha atraves da requisição
        const {email,password} = req.body

//criando uma variavel e dando ela o valor da classe que criamos na pasta services, ela recebe as ações que demos lá
        const authUserService = new AuthUserService();

        //executando o metodo, esse metodo returna uma coisa, por isso criamos a variavel const auth para ela ser o retorno
        //sempre usar await, a função dele é sempre esperar o execute fornecer as informações
        const auth = await authUserService.execute({
          //passando essa informações pq o execute pede obrigatoriamente lá do UserResquest criado no service
            email,
            password
        })

        return res.json(auth)
    }
}
export {AuthUserController}