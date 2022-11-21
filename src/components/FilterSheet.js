import React, { useState } from 'react';
import { 
  StyleSheet,
  Button,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Picker,
  Pressable} from "react-native";
import { useFonts } from 'expo-font';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BottomSheet } from "react-native-btr";

export default function FilterSheet(props) {
  const [visible, setVisible] = useState(false);
  const [selectcategory, setSelectCategory] = useState('');
  const [sortprice, setSortPrice] = useState('');
  const [fontsLoaded, setFont] = useFonts({
    'Inter-SemiBold': 'https://rsms.me/inter/font-files/Inter-SemiBold.otf?v=3.12',
  });

  const clickToggle = () => {
    setVisible((visible) => !visible);
    // setSelectCategory('');
    // setSortPrice('');
  }

  const clickButtonCategory = (data) => {
    setSelectCategory(data)
  }
  
  const clickSortByPrice = (data) => {
    setSortPrice(data);
  }
  
  const clickFilter = () => {
    props.FilterProducts(selectcategory, sortprice);
    setVisible((visible) => !visible);
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={clickToggle}>
        <View style={styles.button}>
          <FontAwesome name="filter" size={14} color="white"/> <Text style={styles.text}>Filter</Text>
        </View>
      </TouchableOpacity>
      <BottomSheet
        visible={visible}
        onBackButtonPress={clickToggle}
        onBackdropPress={clickToggle}
        style={styles.sheet}
      >
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.col12}>
              <Text>Pilih Kategori</Text>
              <View style={styles.row}>
                {
                  props.Categories.map((data, i)=> (
                    <Pressable key={i} style={styles.btn1} onPress={() => clickButtonCategory(data)}>
                      <Text style={styles.btntext1}>{data}</Text>
                    </Pressable>
                  ))
                }
              </View> 
            </View>
            <View style={styles.col12}>
              <Text>Urutkan</Text>
              <View style={styles.row}>
                <Pressable style={styles.btn1} onPress={() => clickSortByPrice("asc")}>
                  <Text style={styles.btntext1}>Harga Terendah</Text>
                </Pressable>
                <Pressable style={styles.btn1} onPress={() => clickSortByPrice("desc")}>
                  <Text style={styles.btntext1}>Harga Tertinggi</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.col12}>
              <Pressable style={styles.btn2} onPress={() => clickFilter()}>
                <Text style={styles.btntext2}>FILTER</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  sheet: {
    padding: 20,
  },
  card: {
    borderColor: '#ddd',
    backgroundColor: 'white',
    minHeight: 100,
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
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
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  col6: {
    width: '50%',
    padding: 10
  },
  col12: {
    width: '100%',
    padding: 10
  },
  select: {
    padding: 10,
    margin: 10
  },
  btn1: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#2196f3',
    borderRadius: 5,
    margin: 5,
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
    padding: 7,
    width: '100%'
  },
  btntext2: {
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    textAlign: 'center'
  },
  text: {
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginLeft: 5
  }

});