//isso aqui é tudo extensao que baixei para me ajudar, Request=requisição ->, Response = resposta <-
import express, { Request, Response, NextFunction } from "express";

//biblioteca que ajuda
import 'express-async-errors'
import cors from 'cors'

//importando o arquivo routes da outra pasta
import { router } from "./routes";

//importando path é os caminhos
import path from 'path'

const app = express()

//usando o tipo de formato que é o json
app.use(express.json())

app.use(cors())

//usando o arquivo router
app.use(router);

//um middleware para acessar a foto lá no navegador com http:3333/files/nome da foto
app.use(
    //criando uma rota estatica que vamos passar o /files e o / nome da foto posteriormente
    '/files',
    //puxando a foto lá na pasta tmp-
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

//usando useState err servira de nome para a Error, esse Error vem la do import async-errors
app.use((err: Error, req:Request, res:Response, next:NextFunction) =>{
    if(err instanceof Error){
        //se for uma instancia do tipo error, retorna o response(resposta) com status 400 na tela, o json faz isoo
        return res.status(400).json({
            error: err.message
        })
    }
    return res.status(500).json({
        status:'error',
        message:'Internal server error.'
    })
})

app.listen(3333, () => console.log("ONLINE"))

/* lá no arquivo json
o "script" está rodando e puxando esse arquivo server, 
pq tudo que está no pack.json roda no servidor*/
