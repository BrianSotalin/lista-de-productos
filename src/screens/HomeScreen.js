import { Text,SafeAreaView,FlatList,StyleSheet,View } from 'react-native'
import React from 'react'


const HomeScreen = () => {
    const productos = [
        {
            nombre: 'Leche',
            categoria: 'Categoria: lacteos',
            precio: 'Precio: 1.5$',
          },
          {
              nombre: 'Galletas',
              categoria: 'Categoria: dulces',
              precio: 'Precio: 1$',
            },
            {
                nombre: 'Doritos',
                categoria: 'Categoria: golosina',
                precio: 'Precio: 1.2$',
              },
              {
                  nombre: 'Yogurt',
                  categoria: 'Categoria: lacteos',
                  precio: 'Precio: 0.9$',
                },
                {
                    nombre: 'Birri Birri',
                    categoria: 'Categoria: golosina',
                    precio: 'Precio: 1.7$',
                  },
                  {
                      nombre: 'Atun',
                      categoria: 'Categoria: enlatados',
                      precio: 'Precio: 1.45$',
                    },
                    {
                        nombre: 'Bacon',
                        categoria: 'Categoria: embutidos',
                        precio: 'Precio: 1.8$',
                      },
                      {
                          nombre: 'Jamon',
                          categoria: 'Categoria: embutidos',
                          precio: 'Precio: 1.9$',
                        },
                        {
                            nombre: 'Queso',
                            categoria: 'Categoria: lacteos',
                            precio: 'Precio: 2.5$',
                          },
                          {
                              nombre: 'Mortadela',
                              categoria: 'Categoria: embutidos ',
                              precio: 'Precio: 0.5$',
                            },
    ]
let ItemPersona =(props)=>{
  return (
<SafeAreaView style={styles.etiqueta}>
              <View style={styles.etiquetaIndex}>
              
                <Text>   {props.indice } </Text>
              </View>
              <View style={styles.etiquetaContenido}>
              <Text style={{color:'#DEFFEF',fontSize:20}}>
              {props.producto.nombre} 
                </Text>
                <Text style={{color:'#D47C35',fontWeight:'bold',justifyContent:'space-between'}}>
              {props.producto.categoria} <Text style={{marginLeft:100,color:'#CE593D'}}>{props.producto.precio} </Text>
            </Text>
              </View>
               
           
            </SafeAreaView>
  );

}
    
  return (
    <SafeAreaView >
     <FlatList
     data = {productos}
     renderItem= {(elementos) => {
        return <ItemPersona indice={elementos.index+1} producto={elementos.item}/>;
       
    }}
    keyExtractor={(item)=>{
        return item.nombre
    }}
     />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
   
    etiqueta:{
      marginHorizontal:5,
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
      backgroundColor:'red',
      borderRadius:10,
      borderColor:'black',
      backgroundColor:'#85F7F9'
    },
    etiquetaContenido:{
    padding:5,
    flex:9
    }
})

export default HomeScreen