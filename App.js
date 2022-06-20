import { View, Text,FlatList,SafeAreaView ,StyleSheet,TextInput,Alert, ScrollView} from 'react-native'
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
      let producto={codigo:txtCodigo,nombre:txtProducto,categoria:txtCategoria,venta:txtVenta};
      productos.push(producto);
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


let ItemPersona =(props)=>{
  return (
  <SafeAreaView style={styles.etiqueta}>
          <View style={styles.etiquetaIndex}>
          
            <Text style={{color:'#DEFFEF', fontSize:16}}>   {props.producto.codigo } </Text>
          </View>
          <View style={styles.etiquetaContenido}>
          <Text style={{color:'#DEFFEF',fontSize:20}}>
          {props.producto.nombre} 
            </Text>
            <Text style={{color:'#D47C35',justifyContent:'space-between'}}>Categoria: 
        <Text style={{color:'#DEFFEF'}}> {props.producto.categoria}</Text> 
        </Text>
        <Text style={{fontWeight:'bold',fontSize:15,color:'#FFF318'}}> {props.producto.venta}$ </Text> 
          </View >
           <View style={styles.itemBotones}>
            <Button title='/' color={'orange'} 
            onPress={()=>{
              setTxtCodigo(props.producto.codigo);
              setTxtProducto(props.producto.nombre);
              setTxtCategoria(props.producto.categoria);
              setTxtPrecio(props.producto.precio);
              setTxtVenta(props.producto.venta);
              newComponent=false;
              indiceMof=props.indice;
                }}
              />
            <Button title='X' color='crimson'
            onPress={()=>{
              indiceMof=props.indice;
              productos.splice(indiceMof,1);
              console.log("Productos",productos);
              setCantidad(productos.length);
            }}
            />
          
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
        <Button title='Guardar' onPress={()=> {guardarProducto()}} color={'#A691FF'}/>
        <Button title='Nuevo' onPress={()=>{clean()}} color={'#045859'} />
      </View>
      </View>
      </ScrollView>

   <View style={styles.flexb2}>
   <FlatList
     data = {productos}
     renderItem= {(elementos) => {
        return <ItemPersona indice={elementos.index} producto={elementos.item}/>;
       
    }}
    keyExtractor={(item)=>{
        return item.codigo
    }}
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
    flex:2,
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
  }
})

export default App