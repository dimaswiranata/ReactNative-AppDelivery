import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  FlatList,
  Dimensions,
  ScrollView,
  TextInput,
  Image, 
  TouchableOpacity
} from 'react-native';

var { height, width } = Dimensions.get("window");
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";

const App = () => {
  const [dataBanner, setDataBanner] = useState([]);
  const [dataCategories, setDataCategories] = useState([]);
  const [dataFood, setDataFood] = useState([]);
  const [selectCatg, setSelectCatg] = useState(0);

  useEffect(() => {
    getData();
  }, [])

  const onClickAddCart = (data) => {
    const itemcart = {
      food: data,
      quantity:1,
      price: data.price
    }

    AsyncStorage
      .getItem("cart")
      .then((datacart)=> {
        if (datacart !== null) {
          const cart = JSON.parse(datacart);
          cart.push(datacart);
          AsyncStorage.setItem("cart", JSON.stringify(cart));
        } 
        else {
          const cart = [];
          cart.push(itemcart);
          AsyncStorage.setItem("cart", JSON.stringify(cart));
        }
        alert("Alert Succeessful");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  const getData = async () => {
    await axios.get("http://tutofox.com/foodapp/api.json")
      .then((res) => {
        console.log(res.data.banner);
        setDataBanner(res.data.banner);
        setDataCategories(res.data.categories);
        setDataFood(res.data.food);
      })
      .catch((err) => {
        console.log('error: ', err.message);
      });
  }

  const _renderItemCategories = (item) => {
    return(
      <TouchableOpacity
        onPress={() => setSelectCatg(item.id)} 
        style={[styles.divCategories, {backgroundColor: item.color}]}
      >
        <Image
          style={styles.imageCategories}
          resizeMode="contain"
          source={{uri: item.image}}
        />
        <Text style={styles.categoryName}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  const _renderItemFood = (item) => {
    let catg = selectCatg;
    if ( catg == 0 || catg == item.categorie ) {
      return (
        <TouchableOpacity style={styles.divFood}>
          <Image
            style={styles.imageFood}
            resizeMode="contain"
            source={{uri:item.image}} 
          />
          <View style={{height:((width/2)-20)-90, backgroundColor:'transparent', width:((width/2)-20)-10}} />
          <Text style={{fontWeight:'bold',fontSize:22,textAlign:'center'}}>
            {item.name}
          </Text>
          <Text>Descp Food and Details</Text>
          <Text style={{fontSize:20,color:"#33c37d"}}>${item.price}</Text>
          {/* button add cart */}
          <TouchableOpacity
            style={{
              width: (width/2)-40,
              backgroundColor: "#33c37d",
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              padding: 4,
              flexDirection: 'row'
            }}
            onPress={()=> onClickAddCart(item)}
          >
            <Text
              style={{
                fontSize:18,
                color:'white',
                fontWeight:'bold'
              }}
            >
              add cart
            </Text>
            <View style={{width: 10}}/>
            <Icon 
              name="add-circle" 
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </TouchableOpacity>
      )
    }
  }

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.logoContainer}>
          <Image 
            style={styles.logo} 
            resizeMode="contain"
            source={{ uri: "https://tutofox.com/foodapp/foodapp.png"}}
          />
          <Swiper 
            style={styles.swiperContainer}
            showsButtons={false}
            autoplay={true}
            autoplayTimeout={2}
          >
            {
              dataBanner.map((item) => {
                return(
                  <Image 
                    style={styles.imageBanner}
                    resizeMode="contain"
                    source={{ uri: item }}
                    key={item}
                  />
                )
              })
            }
          </Swiper>
        </View>
        <View style={styles.categoryContainer}>
          {/* <Text style={styles.titleCategories}> Categories {selectCatg} </Text> */}
          <View style={{height: 10}}/>
          <FlatList
            horizontal={true}
            data={dataCategories}
            renderItem={({item}) => _renderItemCategories(item)}
            keyExtractor={(item,index) => index.toString()}
          />
          <FlatList
            data={dataFood}
            numColumns={2}
            renderItem={({item}) => _renderItemFood(item)}
            keyExtractor={(item,index) => index.toString()}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  logoContainer: {
    width: width,
    alignItems: 'center'
  },
  logo: {
    height: 60,
    width: width/2,
    margin: 10
  },
  categoryContainer: {
    width: width,
    borderRadius: 20,
    paddingVertical: 20,
    backgroundColor: 'white'
  },
  swiperContainer: {
    height: width/2
  },
  imageBanner: {
    width: width-40,
    height: width/2,
    borderRadius: 10,
    marginHorizontal: 20
  },
  imageCategories: {
    width: 100,
    height: 80
  },
  categoryName: {
    fontWeight:'bold',
    fontSize:22
  },
  titleCategories: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  divCategories: {
    backgroundColor:'red',
    margin: 5,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10
  },
  imageFood:{
    width:((width/2)-20)-10,
    height:((width/2)-20)-30,
    backgroundColor:'transparent',
    position:'absolute',
    top:-45
  },
  divFood:{
    width:(width/2)-20,
    padding:10,
    borderRadius:10,
    marginTop:55,
    marginBottom:5,
    marginLeft:10,
    alignItems:'center',
    elevation:8,
    shadowOpacity:0.3,
    shadowRadius:50,
    backgroundColor:'white',
  }
});
