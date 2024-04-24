import { PrismaClient } from "@prisma/client";

//variavel chamada prismaCliente sendo atribuida a ele
const prismaClient = new PrismaClient()

//exportando diretamente, quando for chamar em outro arquivo n precisa de chaves
export default prismaClient