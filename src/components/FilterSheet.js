import React, { useEffect, useState } from 'react';
import { 
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Pressable} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import { BottomSheet } from "react-native-btr";

export default function FilterSheet(props) {
  const [visible, setVisible] = useState(false);
  const [selectcategory, setSelectCategory] = useState('');
  const [datacategories, setDataCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    try {
      let categories = await fetch('https://dummyjson.com/products/categories');
      let jsoncategories = await categories.json();
      setDataCategories(jsoncategories.sort());

    } catch (error) {
      Alert(error);
    }    
  }

  const clickToggleSheet = () => {
    setVisible((visible) => !visible);
  }

  const clickButtonCategory = (data) => {
    setSelectCategory(data)
  }
  
  const clickFilter = () => {
    props.FilterProducts(selectcategory);
    setSelectCategory(selectcategory);
    setVisible((visible) => !visible);
  }

  const sortByPrice = (a) => {
    props.SortByPrices(a);
  }

  const clickReset = () => {
    props.ResetFilter();
    setVisible((visible) => !visible);
  }

  return (
    <SafeAreaView>
      <View style={styles.row}>
        <TouchableOpacity style={styles.col6} onPress={clickToggleSheet}>
          <View style={styles.row} >
            <FontAwesome name="filter" size={14} color="white"/>
            <Text style={styles.text}>Filter</Text>
          </View>
        </TouchableOpacity>
        <Picker
          selectedValue={props.ValueSort}
          color='white' 
          style={[styles.select, styles.col6]}
          onValueChange={(item, itemIndex) => sortByPrice(item)} >
            <Picker.Item label="Urutkan" value="" />
            <Picker.Item label="Harga Terendah" value="asc" />
            <Picker.Item label="Harga Tertinggi" value="desc" />
        </Picker>
      </View>
      <BottomSheet
        visible={visible}
        onBackButtonPress={clickToggleSheet}
        onBackdropPress={clickToggleSheet}
        style={styles.sheet}
      >
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.col12}>
              <View>
                <Text>Pilih Kategori</Text>
              </View>
              <View style={styles.row}>
                {
                  datacategories.map((data, i)=> (
                    <Pressable key={i} style={(props.ValueCategory === data || selectcategory === data)?styles.btnActive:styles.btn1} onPress={() => clickButtonCategory(data)}>
                      <Text style={(props.ValueCategory === data || selectcategory === data)?styles.btntextActive:styles.btntext1}>{data}</Text>
                    </Pressable>
                  ))
                }
              </View> 
            </View>
            <View style={[styles.col12, styles.row, styles.bordertop]}>
              <View style={styles.col6}>
                <Pressable style={styles.btn3} onPress={() => clickReset()}>
                  <Text style={styles.btntext3}>RESET</Text>
                </Pressable>
              </View>
              <View style={styles.col6}>
                <Pressable style={styles.btn2} onPress={() => clickFilter()}>
                  <Text style={styles.btntext2}>FILTER</Text>
                </Pressable>
              </View>
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
    flexWrap: 'wrap',
    alignItems: 'center'
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
    width: '100%'
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
    color: 'white',
    textAlign: 'center'
  },
  btnActive: {
    borderColor: '#2196f3',
    backgroundColor: '#2196f3',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 7,
  },
  btntextActive: {
    color: 'white',
    textAlign: 'center'
  },
  btn3: {
    borderColor: 'red',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    padding: 7
  },
  btntext3: {
    color: 'red',
    textAlign: 'center'
  },
  text: {
    color: 'white',
    marginLeft: 5
  },
  bordertop: {
    borderTopWidth: 1,
    borderTopColor: 'grey'
  }

});