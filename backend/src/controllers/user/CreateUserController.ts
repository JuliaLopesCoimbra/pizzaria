//controler recebe diretamente os parametros da requisição
//ele pega os parametros e chama o serviço repassando os dados necessarios
import { Request, Response } from "express";
import { CreateUserService } from "../../service/user/CreateUserService";

class CreateUserController{
    //metodo assincrono, handle é o nome que dei, ele esta recebendo uma requisição
    async handle(req:Request, res:Response){
        //pegando as informações de passando para ser requisitado   
        const {name, email, password} = req.body

        //criando uma variavel e dando ela o valor da classe que criamos na pasta services, ela recebe as ações que demos lá
        const createUserService = new CreateUserService()

        //executando o metodo, esse metodo returna uma coisa, por isso criamos a variavel const user para ela ser o retorno
        //sempre usar await, a função dele é sempre esperar o execute fornecer as informações
        const user = await createUserService.execute({
            //passando essa informações pq o execute pede obrigatoriamente lá do UserResquest criado no service
            name,
            email,
            password
        });

        //normalmente return vai pegar res, pq res é responsavel por dar resposta
        //nesse caso pegamos o retorno do serviço, no caso a variavel user
        return res.json({user})
    }
}
export {CreateUserController}