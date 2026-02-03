// src/components/ProductsList.tsx
// Full products list page, fetching from Supabase, similar to Home's products section

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import { CartItem, Product } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Search } from 'lucide-react';

export default function ProductsList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
        const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetchProducts();
    }, []);
  
    useEffect(() => {
      if (searchQuery) {
        const filtered = products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(products);
      }
    }, [searchQuery, products]);
  
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('is_featured', { ascending: false })
          .order('created_at', { ascending: false });
  
        if (error) throw error;
        setProducts(data || []);
        setFilteredProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
  
    const handleAddToCart = (product: Product, quantity: number) => {
      setCartItems((prev) => {
        const existingItem = prev.find((item) => item.product.id === product.id);
        if (existingItem) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { product, quantity }];
      });
    };
  
    
    const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    return ( 
        <>     
         <Header
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
      />
    <div className="min-h-screen bg-gray-50 pb-12 pt-28 px-4 md:px-8" dir="rtl">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-[#004f49] mb-8 text-center">قائمة المنتجات الكاملة</h1>
        
        {/* Search Bar */}
        <div className="mb-8 flex items-center justify-center">
 <form
  onSubmit={(e) => {
    e.preventDefault();
    // نفّذ البحث هنا
  }}
  className="group relative flex items-center w-full max-w-sm mx-auto
             bg-white rounded-full px-6 py-3
             border border-[#004f49]/40
             shadow-sm
             focus-within:border-[#004f49]
             focus-within:shadow-md
             transition-all duration-300"
  dir="rtl"
>
  <input
    type="text"
    placeholder="ابحث عن منتج..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="bg-transparent outline-none text-sm flex-1 text-right
               placeholder-gray-500
               pr-2"
  />

  <button
    type="submit"
    aria-label="بحث"
    className="flex items-center justify-center
               w-9 h-9 rounded-full
               bg-[#004f49]/10
               text-[#004f49]
               group-focus-within:bg-[#004f49]
               group-focus-within:text-white
               transition-all duration-300"
  >
    <Search className="w-5 h-5" />
  </button>
</form>

</div>


        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#004f49] border-t-transparent"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">لا توجد منتجات مطابقة لبحثك.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}
      </motion.div>
      
    </div>
    <Footer />
    </> 
  );
}