import { Router} from "express";
import multer from "multer";
//chamando diretamente uma requisição
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/products/CreateProductController";
import uploadConfig from "./config/multer";
import { ListByCategoryController } from "./controllers/products/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";
const router = Router();
//fazendo a img ser salva na pagina tmp e pode ser usada como o middleware
//todas as configurações estão no arquivo multer
const upload = multer(uploadConfig.upload("./tmp"))

//           ROTAS DE USER
//post= Este método é utilizado quando estamos enviando informações para o servidor, normalmente quando vamos persistir eles numa base de dados, por exemplo.
//chamando o CreateUsuarioController na rota users que criamos lá no arquivo CreateUser
router.post('/users', new CreateUserController().handle)
//chamando a funcao LogarUsuario na rota session que criamos lá no arquivo AuthUser
router.post('/session', new AuthUserController().handle)
//chama a funçao DetalhesUsuario na rota me que criamos lá no arquivo DetailUser
//chamando o middle antes da função para fazer sua ação
router.get('/me', isAuthenticated, new DetailUserController().handle)


//        ROTAS DE CATEGORY
//chamando o CreateCategoryController na rota category que criamos lá no arquivo createCategory
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
//chamando o ListCategoryController na rota category que criamos lá no arquivo listCategory
router.get("/category", isAuthenticated, new ListCategoryController().handle)

//      ROTAS PRODUCTS
//chamando o CreateProductController na rota category que criamos lá no arquivo createProduct
//essa rota possui a capacidade de puxar a imagem do produto
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
//chamando a rota ListProdutos de uma categoria que criamos lá no arquivo ListByCategory
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)


//          ROUTAS DE ORDER
////chamando a rota CreateOrder que é a mesa de uma categoria que criamos lá no arquivo CreateOrder
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.get('/orders', isAuthenticated, new ListOrdersController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)



export {router};
//aqui chama as paginas 
//get significa uma  consulta no servidor, como uma lista de pizza, Neste momento o navegador faz uma requisição do tipo Get para o servidor.
//req significa Request, res siginifica Response, isso é o UseSate vc colca uma variavel qualquer e da o valor real dela do depois dos dois pontos
//router.get('/teste', (req: Request, res:Response) =>{
   // throw new Error("erro ao fazer requisição")
//})



