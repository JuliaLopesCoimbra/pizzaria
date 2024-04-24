//importando o banco de dados para ser usado os dados dele
import prismaClient from "../../prisma";
//serviço de crypografar as senhas
import { hash } from "bcryptjs";


//função do typeScript que coloca um nome para ser uma função e ser chamada 
interface UserRequest{
    name:string;
    email:string;
    password:string;
}

///criando uma classe 
class CreateUserService{
    //aqui estou chamando a interface (a funcao do typeScript)
    async execute({name,email,password}:UserRequest){
 
        //verificar se ele enviou um email
        if(!email){
            throw new Error("Email incorrect")
        }
        //verificar se o email já está cADASTRADO  NA PLATAFORMA
        //encontrando um email ONDE esse email é igual ao que está já cadatrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })
        //se esse email existe da erro
        if(userAlreadyExists){
            throw new Error("User already exists")
        }
        //forncedno o serviço de criptografar na senha, 8 é o salto de numeros criptografados
        const passwordHash = await hash(password, 8)

        //cadastrando um usuario
        const user = await prismaClient.user.create({
            data:{
                name:name,
                email:email,
                password:passwordHash
            },
            //informar o que eu quero devolver
            select:{
                id:true,
                name:true,
                email:true
            }
        })

    }
}
export {CreateUserService}