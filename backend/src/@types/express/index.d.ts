//esse arquivo for criado pq o typescript precisa tipar as variaveis que foram criadas

//criando a nossa tipagem, declaro com o nome de express, na interface do request e dando o nome
// e o tipo da variavel
declare namespace Express{
    export interface Request{
        user_id: string
    }
}