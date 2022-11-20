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
import { useFonts } from 'expo-font';
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import { createDrawerNavigator } from '@react-navigation/drawer';

export default function DrawerFilter({ navigation, route }) {
  const [fontsLoaded, setFont] = useFonts({
    'Inter-SemiBold': 'https://rsms.me/inter/font-files/Inter-SemiBold.otf?v=3.12',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    try {

    } catch (error) {
      // Alert(error);
    }    
  }

  return (
    <SafeAreaView style={styles.container}>
        <FontAwesome name="filter" color="white"/>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },

});