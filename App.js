import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailProduct from './src/screen/DetailProduct';
import Products from './src/screen/Products';
// import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* <Drawer.Navigator useLegacyImplementation initialRouteName="filter">
        <Drawer.Screen name="filter" component={DrawerFilter} />
      </Drawer.Navigator> */}
      <Stack.Navigator>
        <Stack.Screen name="products" component={Products}/>
        <Stack.Screen name="product" component={DetailProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;