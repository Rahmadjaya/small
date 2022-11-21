import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailProduct from './src/screen/DetailProduct';
import Products from './src/screen/Products';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen options={{headerShown: false, title: 'Small'}} name="products" component={Products} />
        <Stack.Screen name="product" component={DetailProduct}  options={{ title: 'Small - Detail Produk' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;