import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import {useRoute} from '@react-navigation/native';

export default function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const {productId} = route.params;

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Error loading product details.</Text>
      </SafeAreaView>
    );
  }

  const renderHeader = () => (
    <View>
      <View style={styles.imageContainer}>
        <Image source={{uri: product.thumbnail}} style={styles.productImage} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.category}>Category: {product.category}</Text>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productBrand}>{product.brand}</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
        <Text style={styles.productDiscount}>
          Discount: {product.discountPercentage}%
        </Text>
        <Text style={styles.productRating}>Rating: {product.rating}</Text>
        <Text style={styles.productStock}>Stock: {product.stock}</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Specification</Text>
        <Text style={styles.productDescription}>
          Description: {product.description}
        </Text>
        <Text style={styles.productDetail}>SKU: {product.sku}</Text>
        <Text style={styles.productDetail}>Weight: {product.weight}</Text>
        <Text style={styles.productDetail}>
          Dimension: {product.dimensions.width} x {product.dimensions.height} x{' '}
          {product.dimensions.depth}
        </Text>
        <Text style={styles.productDetail}>
          Minimum Order Quantity: {product.minimumOrderQuantity}
        </Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Warranty Information</Text>
        <Text style={styles.productDetail}>
          Warranty Period: {product.warrantyInformation}
        </Text>
        <Text style={styles.productDetail}>
          Shipping Information: {product.shippingInformation}
        </Text>
        <Text style={styles.productDetail}>
          Availability Status: {product.availabilityStatus}
        </Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Reviews</Text>
      </View>
    </View>
  );

  const renderReviews = ({item}) => (
    <View style={styles.reviewItem}>
      <Text style={styles.reviewerName}>{item.reviewerName}</Text>
      <Text style={styles.reviewerEmail}>{item.reviewerEmail}</Text>
      <Text style={styles.reviewText}>"{item.comment}"</Text>
      <Text style={styles.reviewRating}>Rating: {item.rating}</Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Return Policy</Text>
      <Text style={styles.productDetail}>{product.returnPolicy}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={product.reviews}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderReviews}
        ListEmptyComponent={
          <Text style={styles.noReviews}>No reviews available.</Text>
        }
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}

const {width} = Dimensions.get('window');
const productImageSize = width * 0.9;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 15,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#e74c3c',
    marginTop: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  productImage: {
    width: productImageSize,
    height: productImageSize,
    borderRadius: 10,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  infoContainer: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 5,
  },
  productTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productBrand: {
    fontSize: 18,
    color: '#777',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
  },
  productDiscount: {
    fontSize: 16,
    color: '#27ae60',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  productRating: {
    fontSize: 16,
    color: '#f39c12',
    marginBottom: 5,
  },
  productStock: {
    fontSize: 16,
    color: '#333',
  },
  sectionContainer: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  productDetail: {
    fontSize: 16,
    color: '#777',
    marginBottom: 5,
  },
  reviewItem: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reviewerEmail: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  reviewRating: {
    fontSize: 14,
    color: '#f39c12',
  },
  noReviews: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
});
