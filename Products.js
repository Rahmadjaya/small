import React, { useEffect, useState, useRef } from 'react';
import { 
  StyleSheet,
  Button,
  SafeAreaView,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  Image,
  Picker,
  ScrollView } from "react-native";
import { Link } from '@react-navigation/native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFonts } from 'expo-font';

export default function Products() {
  const [isLoading, setLoading] = useState(true);
  const [isEmpety, setEmpety] = useState(false);
  const [dataproductsall, setDataProductsAll] = useState([]);
  const [dataproducts, setDataProducts] = useState([]);
  const [selectcategory, setSelectCategory] = useState('');
  const [datacategories, setDataCategories] = useState([]);
  const [sortprice, setSortPrice] = useState('');
  const [fontsLoaded, setFont] = useFonts({
    'Inter-SemiBold': 'https://rsms.me/inter/font-files/Inter-SemiBold.otf?v=3.12',
  });


  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async() => {
    try {
      const products = require('./products.json');
      setDataProducts(products.products);
      setDataProductsAll(products.products);

    //   let products = await fetch('https://dummyjson.com/products');
    //   let jsonproducts = await products.json();
    //   setDataProducts(jsonproducts.products);
    //   setDataProductsAll(jsonproducts.products);

    const categories = require('./categories.json');
    setDataCategories(categories.sort());

    //   let categories = await fetch('https://dummyjson.com/products/categories');
    //   let jsoncategories = await categories.json();
    //   setDataCategories(jsoncategories.sort());

      setLoading(false);
    } catch (error) {
      // Alert(error);
    }    
  }

  const selectCategory = (category) => {
    if(category !== ''){
      setSelectCategory(category)
      let datafilterbycategory = dataproductsall.filter((e) => e.category === category);
      console.log(datafilterbycategory)
      setDataProducts(datafilterbycategory);
      if(datafilterbycategory.length !== 0){
        setEmpety(false)
      } else {
        setEmpety(true)
      }
    }
  }

  const sortByPrice = (sort) => {
    setSortPrice(sort);
    if(sort === 'asc'){
      let datasort = dataproductsall.sort(function(a, b){
        return a.price - b.price;
      });
      setDataProducts(datasort);
    } else {
      let datasort = dataproductsall.sort(function(a, b){
        return b.price - a.price;
      });
      setDataProducts(datasort);
    }
  }

  const Header = () => {
    return (
      <View style={styles.filter}>
        <Picker
          selectedValue={selectcategory}
          style={styles.select}
          onValueChange={(item, itemIndex) => selectCategory(item)} >
            <Picker.Item label="---category---" value="" />
            {
              datacategories.map((data, i)=> (
                <Picker.Item key={i} label={data} value={data} />
              ))
            }
        </Picker>
        <Picker
          selectedValue={sortprice}
          style={styles.select}
          onValueChange={(item, itemIndex) => sortByPrice(item)} >
            <Picker.Item label="---sort price---" value="" />
            <Picker.Item label="Harga Tertinggi" value="asc" />
            <Picker.Item label="Harga Terendah" value="desc" />
        </Picker>
      </View>
    )
  }

  const Box = () => {
    return (
      <ScrollView>
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          isEmpety ? (
              <View>
                  <Text>Kosong</Text>
              </View>
            ) : (
            <FlatList
              style={styles.boxContainer}
              data={dataproducts}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <Link style={styles.box} to={{ screen: 'product', name: item.title , params: { id: item.id } }}>
                  <View style={styles.card}>
                    <View style={styles.wrapImage}>
                      <Image
                        style={styles.wrapImageThumbnail}
                        source={{ uri: item.thumbnail }}
                      />
                    </View>
                    <View style={styles.itemProduct}>
                      <Text style={styles.titleProduct}>{item.title}</Text>
                      <Text style={styles.descProduct}>{item.description.substring(0, 20)}...</Text>
                      <Text style={styles.priceProduct}>{item.price}</Text>
                      <Text style={styles.stockProduct}>{item.stock}</Text>
                    </View>
                  </View>
                </Link>
              )}
            />
            
          )
        )}
      </ScrollView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <Box/>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  filter : {
    width : '100%',
    height: 70,
    backgroundColor: 'black',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
    // position: 'absolute',
    // top: 0,
    // zIndex: 99
  },
  select: {
    padding: 10,
    margin: 10,
    width: '50%'
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    padding: 10
  },
  boxContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#eee',
    padding: 5,
    paddingTop: 20,
    display: 'flex',
    // flexDirection: 'row',
    flexWrap: 'wrap',
    // marginTop: 30,
    alignContent: 'center'
  },
  box: {
    width: 400,
    padding: 10,
  },
  card: {
    borderColor: '#ddd',
    backgroundColor: 'white',
    minHeight: 100,
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  wrapImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginBottom: 5
  },
  wrapImageThumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  itemProduct: {
    padding: 10,
    paddingTop: 5
  },
  titleProduct: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold'
  },
  descProduct: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold'
  },
  priceProduct: {
    fontSize: 14,
    color: 'red',
    fontFamily: 'Inter-SemiBold'
  },
  stockProduct: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold'
  }
});