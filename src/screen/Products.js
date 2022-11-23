import React, { useEffect, useState, useRef } from 'react';
import { 
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  Text,
  Image,
  ScrollView } from "react-native";
import { Link } from '@react-navigation/native';
import FilterSheet from '../components/FilterSheet';

export default function Products() {
  const [isLoading, setLoading] = useState(true);
  const [isEmpety, setEmpety] = useState(false);
  const [dataproductsall, setDataProductsAll] = useState([]);
  const [dataproductsfirst, setDataProductFirst] = useState([]);
  const [dataproducts, setDataProducts] = useState([]);
  const [category, setFilterCategory] = useState('');
  const [sortprice, setSortPrice] = useState('');

  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async() => {
    try {
      let products = await fetch('https://dummyjson.com/products');
      let jsonproducts = await products.json();
      setDataProducts(jsonproducts.products);
      setDataProductsAll(jsonproducts.products);
      setDataProductFirst(jsonproducts.products);
      setLoading(false);
    } catch (error) {
      Alert(error);
    }    
  }

  const sortByPrice = (params) => {
    setSortPrice(params)
    if(params === 'asc'){
      let datasort = dataproducts.sort(function(a, b){
        return a.price - b.price;
      });
      setDataProducts(datasort);
    } else {
      let datasort = dataproducts.sort(function(a, b){
        return b.price - a.price;
      });
      setDataProducts(datasort);
    }
  }

  const filterProduct = (filtercategory) => {
    setFilterCategory(filtercategory);
    if(filtercategory === ''){
      setDataProducts(dataproductsall);
    } else if(filtercategory !== '') {
      let datafilterbycategory = dataproductsall.filter((e) => e.category === filtercategory);
      if(datafilterbycategory.length !== 0){
        setEmpety(false)
      } else {
        setEmpety(true)
      }
      setDataProducts(datafilterbycategory);
    }
  }

  const resetFilter = () => {
    setEmpety(false);
    setDataProducts(dataproductsfirst);
    setDataProductsAll(dataproductsfirst);
    setFilterCategory('');
    setSortPrice('');
  }

  const Header = () => {
    return (
      <View style={styles.filter}>
        <FilterSheet 
          ValueSort = {sortprice}
          SortByPrices= {(a) => sortByPrice(a)}
          ValueCategory = {category}
          FilterProducts={(a) => {filterProduct(a)}}
          ResetFilter={() => {resetFilter()}}/>
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
            <View style={styles.boxContainer}>
              <View style={[styles.box, styles.empty]} >
                <View style={styles.card}>
                  <View style={styles.itemProduct}>
                    <Text style={styles.titleProduct}>Opps</Text>
                    <Text style={styles.descProduct}>Barang tidak ditemukan</Text>
                    <Text style={styles.priceProduct}>Coba cari yang lain</Text>
                  </View>
                </View>
              </View>

            </View>
            ) : (
            <FlatList
              style={styles.boxContainer}
              data={dataproducts}
              renderItem={({ item }) => (
                <Link style={styles.box} to={{ screen: 'product', params: { id: item.id} }}>
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
                      <Text style={styles.stockProduct}>Tersedia {item.stock}</Text>
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
    height: 63,
    backgroundColor: '#2196f3',
    padding: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    padding: 10
  },
  boxContainer: {
    backgroundColor: '#eee',
    padding: 5,
    paddingTop: 10,
  },
  box: {
    width: '100%',
    padding: 10,
  },
  empty: {
    width: '100%'
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
    paddingTop: 5,
  },
  titleProduct: {
    fontSize: 16,
    marginBottom: 5,
  },
  descProduct: {
    fontSize: 14,
    marginBottom: 5,
    color: 'grey',
  },
  priceProduct: {
    fontSize: 14,
    color: '#2196f3',
    marginBottom: 5
  },
  stockProduct: {
    fontSize: 12,
    marginBottom: 5,
    color: 'grey',
  }
});