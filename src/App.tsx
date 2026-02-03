// src/App.tsx
import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { Product, CartItem } from './types';
import Home from './pages/Home';
import ProductsList from './pages/ProductsList';
import ProductDetails from './pages/ProductDetails';
import ProductCard from './components/ProductCard';
import { supabase } from './lib/supabase'; // Assuming this is imported correctly

const App = () => {
  return (
    <div dir="rtl"> {/* RTL for the entire app */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:id" element={<ProductDetailsWrapper />} />
        {/* Add more routes if needed */}
      </Routes>
    </div>
  );
};

// ProductDetailsWrapper remains the same (fetches from Supabase)
function ProductDetailsWrapper() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (productError) throw productError;
        setProduct(productData);

        const { data: allProducts, error: allError } = await supabase
          .from('products')
          .select('*')
          .neq('id', id)
          .limit(3);

        if (allError) throw allError;
        setRelatedProducts(allProducts || []);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-[#004f49] flex-col gap-4">
      <div className="w-12 h-12 border-4 border-[#004f49] border-t-transparent rounded-full animate-spin"></div>
      جاري التحميل...
    </div>
    )
  }

  if (!product) {
    return <div className="text-center py-12 text-red-600">المنتج غير موجود.</div>;
  }

  const handleAddToCart = (product: Product, quantity: number) => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
    // Integrate with global cart if using context or state management
  };

  return (
    <ProductDetails
      product={product}
      onAddToCart={handleAddToCart}
      relatedProducts={relatedProducts}
    />
  );
}

export default App;