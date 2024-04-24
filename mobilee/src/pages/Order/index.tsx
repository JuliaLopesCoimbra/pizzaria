import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity,TextInput,Modal } from 'react-native'

import { useRoute, RouteProp, useNavigation} from '@react-navigation/native'
import {Feather} from '@expo/vector-icons';
import { api } from '../../services/api';
import { ModalPicker } from '../../components/ModalPicker';

//temos parametros para serem usadoss
type RouteDetailParams = {
  Order:{
    number: string | number;
    order_id: string;
  }
}
//OrderRouteProps segue o RouteProp e contem as tipagens que criamos em nossa Order
type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;



//propriedades da categoria para serem listadas ao escolher qual categoria o pedido tem
export type CategoryProps ={
  id:string,
  name:String
}

//tipando as propriedades do produtos apos escolher a categoria
type ProductProps ={
  id:string,
  name:string
}


export default function Order(){
  //route recebe uma regra para seguir
  const route = useRoute<OrderRouteProps>();

  //
  const navigation = useNavigation();

  //a lista de category vai ser do tipo CategoryProps e será um array mas poderá ser um array vazio caso n tenha categoria cadastrado
  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  //quando clicar na categoria que estará na lista category, irá pegar o id e o name que tipamos lá em cima
  const [categorySelected,setCategorySelected] = useState<CategoryProps>();  
  ///para listar o modal, começa false até clicar em cima para mostrar a lista e tornando-se true
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false)


  //mostrrar no layout sempre começando com 1
  const [amount,setAmount] = useState("1");


  //a variave products vai ser do tipo ProductProps e será uma array, mas poderá ser um array vazio caso n tenha prodto cadastrado
  const [products, setProducts] = useState<ProductProps[] | []>([]);
  //quando clicar na categoria que estará na lista category, irá aparecer os products dela ai se clicar no produto vai aparecer ele
  const [productSelected, setProductSelected] = useState<ProductProps | undefined>()
  //aparecer e desaparecer no modal
  const [modalProductVisible, setModalProductVisible] = useState(false);


//listando as categorias
  useEffect(() =>{
    //listar as categorias
    async function loadInfo() {
      //pegando as categorias cadastradas
      const response = await api.get('/category')
        //colocanod dentro da listagem de category
        setCategory(response.data);
        //pegando a primeira posição e colocando como selecionado
        setCategorySelected(response.data[0])
    }
    loadInfo();
  }, [])

//listando os produtos de tal categoria
useEffect(()=>{
  async function loadProducts() {
    //aqui esta pegando os produtos da categoria escolhida
    const response = await api.get('/category/product',{
      params:{
        category_id: categorySelected?.id
      }
    })
    //aqui será passado para outra variavel e jogar essa variavel para ser exibida na tela
    setProducts(response.data)
    setProductSelected(response.data[0])
  }
})

  async function handleCloseOrder() {
    try{
      await api.delete('/order', {
        //passar o parametro order_id
        params:{
          //params? caso n tenha nenhuma order_id n crasha o programa
          order_id:route.params?.order_id
        }
      }) 
      //voltar uma pagina anterior
      navigation.goBack();
    }catch(err){
      console.log(err)
    }
  }

  //mudand no layout o que eu escolho de categoria
  function handleChangeCategory(item:CategoryProps) {
    //selecioando a categoria
    setCategorySelected(item);
  }

  //mudando no layout o que eu escolho de produto
  function handleChangeProduct(item:ProductProps) {
    setProductSelected(item);
    
  }
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
            Mesa {route.params.number}
        </Text>
        <TouchableOpacity onPress={handleCloseOrder}>
          <Feather name='trash-2' size={28} color="#FF3F4b"></Feather>
        </TouchableOpacity>
      </View>
      
      {category.length !== 0 && (
        <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
        <Text style={{color:'#FFF'}}>{categorySelected?.name}</Text>
      </TouchableOpacity>
      )}

      {products.length !==0 && (
        <TouchableOpacity style={styles.input} onPress={()=> setModalProductVisible(true)}>
          <Text style={{color:'#FFF'}} >
              {productSelected?.name}
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>
        <TextInput style={[styles.input, {width:'60%', textAlign:'center'}]} placeholder='#F0F0F0' keyboardType='numeric' value={amount} onChangeText={setAmount}></TextInput>
      </View>


      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>

      </View>

        <Modal transparent={true} visible={modalCategoryVisible} animationType='fade'>

          <ModalPicker    
          handleCloseModal={() => setModalCategoryVisible(false)}
          options={category}
          selectedItem={handleChangeCategory}
          />
        </Modal>

        <Modal transparent={true} visible={modalProductVisible} animationType='fade'>

        <ModalPicker 
              handleCloseModal={() => setModalProductVisible(false)} 
                options={products} 
                 selectedItem={(item: ProductProps) => handleChangeProduct(item)} 
          />


        </Modal>


    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#1d1d2e',
    paddingVertical:'5%',
    paddingEnd:'4%',
    paddingStart:'4%'
  },
  header:{
    flexDirection:'row',
    marginBottom:12,
    alignItems:'center',
    marginTop:24
  },
  title:{
    fontSize:30,
    fontWeight:'bold',
    color:'#FFF',
    marginRight:14
  },
  input:{
    backgroundColor:'#101026',
    borderRadius:4,
    width:'100%',
    height:40,
    marginBottom:12,
    justifyContent:'center',
    paddingHorizontal:8,
    color:"#FFF",
    fontSize:20
  },
  qtdContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  qtdText:{
    fontSize:20,
    fontWeight:'bold',
    color:'#FFF'
  },
  actions:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between'
  },
  buttonAdd:{
    width:'20%',
    backgroundColor:'#3fd1ff',
    borderRadius:4,
    height:40,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonText:{
    color:'#101026',
    fontSize:18,
    fontWeight:'bold'
  },
  button: {
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    borderBottomColor: 'black' // Cor da borda inferior
  }
})