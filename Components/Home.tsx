import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Product's Page</Text>
      <FlatList
        data={products}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('page', {productId: item.id})}
            style={styles.productButton}>
            <View style={styles.productContainer}>
              <Image
                source={{uri: item.thumbnail}}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productDescription}>{item.brand}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
                <Text style={styles.productDiscount}>
                  Discount: {item.discountPercentage}%
                </Text>
                <Text style={styles.productRating}>Rating: {item.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const {width} = Dimensions.get('window');
const productImageSize = width * 0.25;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#cfe5fa',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#18225c',
    marginVertical: 20,
    textShadowColor: '#aaa',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  productButton: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  productContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  productImage: {
    width: productImageSize,
    height: productImageSize,
    borderRadius: productImageSize / 2,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 5,
  },
  productDiscount: {
    fontSize: 14,
    color: '#27ae60',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  productRating: {
    fontSize: 14,
    color: '#f39c12',
  },
});
