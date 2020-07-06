import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-community/async-storage";

var { height, width } = Dimensions.get("window");


const cart = () => {

  const [dataCart, setDataCart] = useState([]);

  useEffect(() => {
    getDataCart();
  }, [])

  const getDataCart = () => {
    AsyncStorage.getItem('cart').then((cart)=>{
      if (cart !== null) {
        // We have data!!
        const cartfood = JSON.parse(cart);
        setDataCart(cartfood);
      }
    })
    .catch((err)=>{
      alert(err)
    })
  }

  const onChangeQual = (i, type) => {
    const dataCar = dataCart
    let cantd = dataCar[i].quantity;

    if (type) {
     cantd = cantd + 1
     dataCar[i].quantity = cantd
     setDataCart(dataCar);
    }
    else if (type==false&&cantd>=2){
     cantd = cantd - 1
     dataCar[i].quantity = cantd
     setDataCart(dataCar);
    }
    else if (type==false&&cantd==1){
     dataCar.splice(i,1)
     setDataCart(dataCar);
    }

    return dataCart;
  }

  return (
    <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
      <View style={{height:20}} />
      <Text style={{fontSize:32,fontWeight:"bold",color:"#33c37d"}}>Cart food</Text>
      <View style={{height:10}} />

      <View style={{flex:1}}>
        <ScrollView>
          {
            dataCart.map((item,i) => {
              return (
                <View style={{width:width-20,margin:10,backgroundColor:'transparent', flexDirection:'row', borderBottomWidth:2, borderColor:"#cccccc", paddingBottom:10}}>
                  <Image resizeMode={"contain"} style={{width:width/3,height:width/3}} source={{uri: item.food.image}} />
                  <View style={{flex:1, backgroundColor:'trangraysparent', padding:10, justifyContent:"space-between"}}>
                    <View>
                      <Text style={{fontWeight:"bold", fontSize:20}}>{item.food.name}</Text>
                      <Text>Lorem Ipsum de food</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                      <Text style={{fontWeight:'bold',color:"#33c37d",fontSize:20}}>${item.price*item.quantity}</Text>
                      <View style={{flexDirection:'row', alignItems:'center'}}>
                        <TouchableOpacity onPress={() => onChangeQual(i,false)}>
                          <Icon name="remove-circle" size={35} color={"#33c37d"} />
                        </TouchableOpacity>
                        <Text style={{paddingHorizontal:8, fontWeight:'bold', fontSize:18}}>{item.quantity}</Text>
                        <TouchableOpacity onPress={() => onChangeQual(i,true)}>
                          <Icon name="add-circle" size={35} color={"#33c37d"} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              )
            })
          }

          <View style={{height:20}} />

          <TouchableOpacity 
            style={{
              backgroundColor:"#33c37d",
              width:width-40,
              alignItems:'center',
              padding:10,
              borderRadius:5,
              margin:20
            }}
          >
            <Text 
              style={{
                fontSize:24,
                fontWeight:"bold",
                color:'white'
              }}
            >
            CHECKOUT
            </Text>
          </TouchableOpacity>
          <View style={{height:20}} />
        </ScrollView>
      </View>
    </View>
  )
}

export default cart

const styles = StyleSheet.create({})
