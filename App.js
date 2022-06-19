import { View, Text,FlatList,SafeAreaView ,StyleSheet,TextInput} from 'react-native'
import { Button } from 'react-native'
import React, { useState } from 'react'
//import HomeScreen,{productos} from './src/screens/HomeScreen'

const productos = [
  {
      nombre: 'Leche',
      categoria: 'lacteos',
      precio: '1.5',
    },
    {
        nombre: 'Galletas',
        categoria: 'dulces',
        precio: ' 1',
      },
      {
          nombre: 'Doritos',
          categoria: 'golosina',
          precio: '1.2',
        },
        {
            nombre: 'Yogurt',
            categoria: 'lacteos',
            precio: '0.9',
          },
          {
              nombre: 'Birri Birri',
              categoria: 'golosina',
              precio: '1.7',
            },
            {
                nombre: 'Atun',
                categoria: 'enlatados',
                precio: '1.45',
              },
              {
                  nombre: 'Bacon',
                  categoria: 'embutidos',
                  precio: '1.8',
                },
                {
                    nombre: 'Jamon',
                    categoria: 'embutidos',
                    precio: '1.9',
                  },
                  {
                      nombre: 'Queso',
                      categoria: 'lacteos',
                      precio: '2.5',
                    },
                    {
                        nombre: 'Mortadela',
                        categoria: 'embutidos ',
                        precio: '0.5',
                      },
]
let ItemPersona =(props)=>{
return (
<SafeAreaView style={styles.etiqueta}>
        <View style={styles.etiquetaIndex}>
        
          <Text style={{color:'#DEFFEF', fontSize:20}}>   {props.indice } </Text>
        </View>
        <View style={styles.etiquetaContenido}>
        <Text style={{color:'#DEFFEF',fontSize:20}}>
        {props.producto.nombre} 
          </Text>
          <Text style={{color:'#D47C35',justifyContent:'space-between'}}>Categoria: 
      <Text style={{color:'#DEFFEF'}}> {props.producto.categoria}</Text> 
      </Text>
      <Text style={{fontWeight:'bold',fontSize:15,color:'#FFF318'}}> {props.producto.precio}$ </Text> 
        </View >
         <View style={styles.itemBotones}>
          <Button title='/' color={'orange'} />
          <Button title='X' color={'crimson'}/>
         </View>
     
      </SafeAreaView>
);

}

const App = () => {
const [txtProducto,setTxtProducto]=useState();
const [txtCategoria,setTxtCategoria]=useState();
const [txtPrecio,setTxtPrecio]=useState();

let clean =()=>{
  setTxtProducto(null);
  setTxtCategoria(null);
  setTxtPrecio(null)
}
let guardarProducto =()=>{
  let producto={nombre:txtProducto,categoria:txtCategoria,precio:txtPrecio};
  productos.push(producto);
  clean();
}

  return (
    <View style={styles.container}>
      <View style={styles.flexb1}>
      <Text style={{fontSize:20,fontStyle: 'italic',fontWeight:'bold',marginTop:30,padding:10}}>Lista de productos</Text>
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
      placeholder='Ingrese un precio'
      onChangeText={setTxtPrecio}
      keyboardType='numeric'
      /> 
      <View style={styles.areaBotones}>
        <Button title='Guardar' onPress={()=> {guardarProducto()}} color={'#A691FF'}/>
        <Button title='Limpiar' onPress={()=>{clean()}} color={'#045859'}/>
      </View>
      </View>

   <View style={styles.flexb2}>
   <FlatList
     data = {productos}
     renderItem= {(elementos) => {
        return <ItemPersona indice={elementos.index+1} producto={elementos.item}/>;
       
    }}
    keyExtractor={(item)=>{
        return item.nombre
    }}
     />
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
    flex:2,

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