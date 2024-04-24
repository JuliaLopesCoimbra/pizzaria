//multer é responsavelpor salvar os arquivos nos lugares certos

//ajuda a gente
import multer from 'multer'
//o crypto ja vem do node.js ele ajuda a n criar coisas iguais 
import crypto from 'crypto'

//pegar caminhos, auxiliar
import {extname, resolve} from 'path'

//criando com uma funcao o nome de upload: ela ta com a seguinte funcao:
//receber a pasta que vc quer salvar as imagens
export default{
    upload(folder:string){
        return{
            //storage = armazenamento é  uma função do multer(salva no lugares corretos), diskstorage leva para as indicações dentro do parenteses
            storage: multer.diskStorage({
                //__dirname = significa nada mais é que o arquivo que estamos, no caso multer
                //os pontos significa que está voltando as paginas como se fosse '/../../index.html'
                destination:resolve(__dirname, '..', '..',folder),
                //filename serve para n ter conflitos de nomes iguais
                //as funcões dentro do pareteses sao tudo retiradas do multer, importamos ele la em cima
                filename:(request,file, callback)=>{
                    //essa é uma configuração de pegar a imagem
                    const fileHash = crypto.randomBytes(16).toString("hex")

                    const fileName = `${fileHash}-${file.originalname}`

                    return callback(null, fileName)
                }
            })
        }
    }

    }