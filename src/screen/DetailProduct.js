import React, { useEffect, useState } from 'react';
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
  Pressable,
  ScrollView } from "react-native";
import { useFonts } from 'expo-font';
import { ImageSlider } from "react-native-image-slider-banner";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Slideshow from 'react-native-image-slider-show';

export default function DetailProduct({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [productdetail, setProductDetail] = useState('');
  const [imageslide, setImageSlide] = useState([]);
  const [fontsLoaded, setFont] = useFonts({
    'Inter-SemiBold': 'https://rsms.me/inter/font-files/Inter-SemiBold.otf?v=3.12',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    try {
      const product = require('./1.json');
      setProductDetail(product)
      let dataimage = [];
      for (let i = 0; i < product.images.length; i++) {
        let x = {
          url: product.images[i]
        }
        dataimage.push(x)
      }
      console.log(dataimage)
      setImageSlide(dataimage)
      // let products = await fetch('https://dummyjson.com/products/'+route.params.id);
      // let jsonproducts = await products.json();

      setLoading(false);
    } catch (error) {
      // Alert(error);
    }    
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View style={styles.boxContainer}>
            <View style={styles.box} >
              <View style={styles.card}>
              <Slideshow 
                dataSource={imageslide}/>
                {/* <ImageSlider 
                    style={styles.slide}
                    data={productdetail.images}
                    autoPlay={true}
                /> */}
                <Text style={[styles.title, styles.fontcustom]}>{productdetail.title}</Text>
                <Text style={[styles.price, styles.fontcustom]}>{productdetail.price}</Text>
                <View style={styles.rating}>
                  <Text style={[styles.fontcustom, styles.valuerating]}><FontAwesome name='star'/>{productdetail.rating}</Text>
                </View>
                <View style={styles.detailproduct}>
                  <Text style={styles.fontcustom}>Detail Produk</Text>
                  <View style={styles.tabledetailproduct}>
                    <View style={styles.trdetailproduct}>
                      <Text style={[styles.tddetailproduct,styles.fontcustom ]}>Kategori</Text>
                      <Text style={[styles.tddetailproduct,styles.fontcustom ]}>{productdetail.category}</Text>
                    </View>
                    <View style={styles.trdetailproduct}>
                      <Text style={[styles.tddetailproduct,styles.fontcustom ]}>Brand</Text>
                      <Text style={[styles.tddetailproduct,styles.fontcustom ]}>{productdetail.brand}</Text>
                    </View>
                    <View style={styles.trdetailproduct}>
                      <Text style={[styles.tddetailproduct,styles.fontcustom ]}>Stok</Text>
                      <Text style={[styles.tddetailproduct,styles.fontcustom ]}>{productdetail.stock}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.deskipsiproduct}>
                  <Text style={styles.fontcustom}>Deskripsi Produk</Text>
                  <View>
                    <Text style={[styles.fontcustom, styles.deskipsibriefproduct]}>{productdetail.description}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.col6}>
                    <Pressable style={styles.btn1}>
                      <Text style={styles.btntext1}>BELI</Text>
                    </Pressable>
                  </View>
                  <View style={styles.col6}>
                    <Pressable style={styles.btn2}>
                      <Text style={styles.btntext2}>KERANJANG</Text>
                    </Pressable>
                  </View>
                </View>
                
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
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
    flexWrap: 'wrap',
    alignContent: 'center'
  },
  box: {
    width: 400,
  },
  card: {
    borderColor: '#ddd',
    padding: 10,
    backgroundColor: 'white',
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
  slide: {
    width: 400
  },
  title: {
    fontSize: 14,
  },
  price: {
    fontSize: 16,
  },
  rating: {
    padding: 5,
    backgroundColor: 'yellow',
    width: 50,
    borderTopEndRadius: 10,
    borderBottomStartRadius: 10,
    marginBottom: 5
  },
  valuerating:{
    fontSize: 12,
    marginBottom: 0
  },
  detailproduct : {

  },
  tabledetailproduct: {
    marginBottom: 5
  },
  trdetailproduct: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },
  tddetailproduct: {
    color: 'grey',
    width: '50%',
    fontSize: 13
  },
  deskipsiproduct : {
  },
  deskipsibriefproduct: {
    color: 'grey',
    fontSize: 13
  },
  fontcustom: {
    fontFamily: 'Inter-SemiBold',
    marginBottom: 5
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  col6: {
    width: '50%',
  },
  btn1: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#2196f3',
    borderRadius: 5,
    marginRight: 5,
    padding: 7
  },
  btntext1: {
    fontFamily: 'Inter-SemiBold',
    color: '#2196f3',
    textAlign: 'center'
  },
  btn2: {
    borderColor: '#2196f3',
    backgroundColor: '#2196f3',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 5,
    padding: 7
  },
  btntext2: {
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    textAlign: 'center'
  },

});