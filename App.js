import { View, Text,FlatList,SafeAreaView ,StyleSheet,TextInput,Alert, ScrollView,TouchableOpacity,Modal,Pressable} from 'react-native'
import { Button } from 'react-native'
import React, { useState } from 'react'
//import HomeScreen,{productos} from './src/screens/HomeScreen'

const productos = [
  {   codigo:'001',
      nombre: 'Leche',
      categoria: 'lacteos',
      precio: '1',
      venta:'1.2'
    },
    {
        codigo:'002',
        nombre: 'Galletas',
        categoria: 'dulces',
        precio: '1',
        venta:'1.2'
      },        
                 
];
//indica si se esta creando un nuevo produto o si se lo modifica
let newComponent=true;
let editor=false;
//indice del elemento seleccionaod para modificar
let indiceMof=-1;

const App = () => {
const [modalVisible, setModalVisible] = useState(false);
const [txtCodigo,setTxtCodigo]=useState();
const [txtProducto,setTxtProducto]=useState();
const [txtCategoria,setTxtCategoria]=useState();
const [txtPrecio,setTxtPrecio]=useState();
const [txtVenta,setTxtVenta]=useState();
const [cantidad,setCantidad]=useState(productos.length);
//limpiar
let clean =()=>{
  setTxtCodigo(null);
  setTxtProducto(null);
  setTxtCategoria(null);
  setTxtPrecio(null)
  setTxtVenta(null);
  newComponent=true;
}
//validacion
let validacion=()=>{
  for(let i=0;i<productos.length;i++){
if(productos[i].codigo==txtCodigo){
return true
}
  }
  return false
}
//registro
let guardarProducto =()=>{
  
    if(newComponent){
      if(validacion()){
        Alert.alert('INFO','El producto ya existe')
      }else{
        if(txtCodigo==null || txtCategoria==null || txtProducto==null || txtVenta==null){
          Alert.alert('INFO','Llene todos los campos')
        }else{
          let producto={codigo:txtCodigo,nombre:txtProducto,categoria:txtCategoria,precio:txtPrecio,venta:txtVenta};
          productos.push(producto);
        }
         
      }
    }else{
      productos[indiceMof].nombre=txtCodigo;
      productos[indiceMof].nombre=txtProducto;
      productos[indiceMof].categoria=txtCategoria;
      productos[indiceMof].precio=txtPrecio;
      productos[indiceMof].venta=txtVenta;
    }
  
  clean();
  setCantidad(productos.length)
}


let ItemProducto =({indice,producto})=>{
  return (
  <SafeAreaView style={styles.etiqueta}>
          <View style={styles.etiquetaIndex}>
          
            <Text style={{color:'#DEFFEF', fontSize:16}}>   {producto.codigo } </Text>
          </View>
          <View style={styles.etiquetaContenido}>
          <Text style={{color:'#DEFFEF',fontSize:20}}>
          {producto.nombre} 
            </Text>
            <Text style={{color:'#D47C35',justifyContent:'space-between'}}>Categoria: 
        <Text style={{color:'#DEFFEF'}}> {producto.categoria}</Text> 
        </Text>
        <Text style={{fontWeight:'bold',fontSize:15,color:'#FFF318'}}> {producto.venta}$ </Text> 
          </View >
           <View style={styles.itemBotones}>

              <TouchableOpacity
              style={styles.buttonEditar}
               onPress={()=>{
                setTxtCodigo(producto.codigo);
                setTxtProducto(producto.nombre);
                setTxtCategoria(producto.categoria);
                setTxtPrecio(producto.precio);
                setTxtVenta(producto.venta);
                newComponent=false;
                indiceMof=indice;
                  }}
              >
                <Text style={{color:'white',fontWeight:'bold'}}>/</Text>
              </TouchableOpacity>
            
          <View >
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>¿Esta seguro de eliminar el producto?</Text>
           
           <View style={styles.areaBotones}>
           <Pressable
              style={styles.buttonSi}
              onPress={()=>{
                indiceMof=indice;
                productos.splice(indiceMof,1);
                console.log("Productos",productos);
                setCantidad(productos.length);
                setModalVisible(!modalVisible)
              }}
            >
              <Text style={styles.textStyle}>Si</Text>
              
            </Pressable>
            <Pressable
              style={styles.buttonNo}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>No</Text>
            </Pressable>
            </View>
           

          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.buttonDelete, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{color:'white',fontWeight:'bold'}} >X</Text>
      </Pressable>
          </View>
           </View>

        </SafeAreaView>
  );}

  return (
    <View style={styles.container}>
         <ScrollView>
          <View style={styles.flexb1}>
      <Text style={{fontSize:20,fontStyle: 'italic',fontWeight:'bold',marginTop:30,padding:10}}>Lista de productos</Text>
      <TextInput 
      style={styles.txt}
      value={txtCodigo}
      placeholder='Ingrese el codigo del producto'
      onChangeText={setTxtCodigo}
      keyboardType='numeric'
      editable={newComponent}
      /> 
       <TextInput 
      style={styles.txt}
      value={txtProducto}
      placeholder='Ingrese un producto'
      onChangeText={setTxtProducto}
      /> 
          <TextInput 
      style={styles.txt}
      value={txtCategoria}
      placeholder='Ingrese un categoria'
      onChangeText={setTxtCategoria}
      /> 
          <TextInput 
      style={styles.txt}
      value={txtPrecio}
      placeholder='Ingrese un precio de compra'
     // onChangeText={setTxtPrecio}
      onChangeText={(txt)=>{
        if(txt>0){
          let num=0;
          let res=0;
          num=txt*0.2;
          res=parseFloat(txt)+parseFloat(num);
          setTxtVenta(''+res)
        }
          setTxtPrecio(txt)
        
      }}
      keyboardType='numeric'
      /> 
           <TextInput 
      style={styles.txt}
      value={txtVenta}
      placeholder='Precio venta'
      keyboardType='numeric'
      editable={editor}
      /> 
      <View style={styles.areaBotones}>
        <Button title='Guardar' onPress={()=> {guardarProducto()}} color={'#A691FF'} />
        <Button title='Nuevo' onPress={()=>{clean()}} color={'#045859'} />
      </View>
      </View>
      </ScrollView>

   <View style={styles.flexb2}>
   <FlatList
     data = {productos}
     renderItem= {({index,item}) => <ItemProducto indice={index} producto={item}/>}
    keyExtractor={item=> item.codigo}
     />
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text>Braian Sotalin Pillajo</Text>
     <Text style={{textAlign:'right',justifyContent:'space-evenly',marginRight:5,color:'#DF39E3'}}>Productos seleccionados: {cantidad}</Text>
     </View>
        
   </View>
 
    </View>

 
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#DEFFEF',
    flexDirection:'column'
   
  },
  flexb1: {
    flex:1,

  },
  flexb2:{
    flex:3,
 
  },
  parentView:{
    flex:1
  },
  
  txt:{
padding:5,
marginHorizontal:30,
marginVertical:8,
borderBottomWidth:1,
borderColor:'#1AE8A0',

  },
  areaBotones:{
    flexDirection:'row',
    justifyContent:'space-evenly',

  },
  etiqueta:{
    marginHorizontal:8,
    marginVertical:5,
    padding:5,
    backgroundColor:'#1AE8A0',
    marginBottom:5,
    borderRadius:10,
    fontSize:18,
    fontWeight:'800',
    flex:10,
    flexDirection:'row'
  },
  etiquetaIndex:{
    justifyContent:'center',
    alignItems:'center',
    flex:1,
    color:'red',
    borderRightWidth:2,
    borderRightColor:'#1EFF90'

  },
  etiquetaContenido:{
  marginLeft:5,  
  flex:6
  },
  itemBotones:{
    flex:3,
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
  },
  buttonEditar:{
    alignItems: "center",
    backgroundColor: "#006969",
    marginRight:10,
    padding: 20,
    borderRadius: 20,
  },
  buttonDelete:{
    alignItems: "center",
    backgroundColor: "crimson",
    marginRight:10,
    padding: 20,
    borderRadius: 20,
  },
  buttonSi:{
    alignItems: "center",
    backgroundColor: "#07E03A",
    padding: 0,
    marginRight:20,
    borderRadius: 20,
  },
  buttonNo:{
    alignItems: "center",
    backgroundColor: "crimson",
    padding: 0,
    marginLeft:20,
    borderRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    margin:20
  },
  modalText: {
    marginBottom: 15,
    flexDirection:'row',
  }
})

export default App