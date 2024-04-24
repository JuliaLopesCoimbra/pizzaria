//trazendo o banco de dados para ser usados os dados dele
import prismaClient from "../../prisma";

//serviço que ajuda a ver se a senha esta correta para logar sem trazer a senha real do usuario
import { compare } from "bcryptjs";

//jwt é utilizado para autorização, depois que o usuário estiver autenticado, cada requisição subsequente incluirá o JWT.
import { sign } from "jsonwebtoken";

//função do typeScript que coloca um nome para ser uma função e ser chamada 
interface AuthRequest{
    email:string,
    password:string
}
class AuthUserService{
    async execute({email, password}: AuthRequest){
        //verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })
        if(!user){
            throw new Error("User/password incorrect")
        }

        //preciso verificar se a senha que ele mandou está correta
        //a variavel passwordCerta recebe o seguinte = esperando o servidor responder a comparação se a senha lá do AuthRequest é igual a senha que a variavel user puxou dados do banco de dados no caso a senha cadatrada no banco de dados
        const passwordCerta = await compare(password, user.password)

        //se n for igual da erro:
        if(!passwordCerta){
            throw new Error("User/password incorrect")
        }

        //se deu tudo certo vamos gerar o token através do jwt pro usuario
        const token = sign(
            {
                name: user.name,
                email:user.email
            },
            //aqui estou pegando a senha secreta que criei lá no env, env é um arquivo sem acesso para maior seguranca
            process.env.JWT_SECRET,
            {
                subject:user.id,
                //expira em 30 dias
                expiresIn:'30d'
            }
        )
        return{
            id: user.id,
            name: user.name,
            email:user.email,
            token:token
        }
    }
}
export { AuthUserService}