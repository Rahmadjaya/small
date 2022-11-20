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

export default function DetailProduct({ navigation, route }) {
  
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    try {
      console.log(route.params.id)
      let products = await fetch('https://dummyjson.com/products/'+route.params.id);
      let jsonproducts = await products.json();
      console.log(jsonproducts)
    } catch (error) {
      // Alert(error);
    }    
  }

  return (
    <SafeAreaView >
      <View>
          <Text>gduagdusadas sbj</Text>
      </View>
    </SafeAreaView>
  );
}