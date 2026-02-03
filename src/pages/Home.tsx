// src/pages/Home.tsx
// The provided Home component, adjusted slightly for routing (e.g., if needed, but no changes here as per query)
// Note: Assumes Header has search, and ProductCard will have Link added in its code

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Product, CartItem } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import CheckoutModal from '../components/CheckoutModal';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import { Link, useLocation } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);
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

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleConfirmOrder = async (orderData: {
    name: string;
    phone: string;
    address: string;
    notes: string;
  }) => {
    try {
      const total = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      const { data: orderDataResult, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: orderData.name,
          customer_phone: orderData.phone,
          customer_address: orderData.address,
          total_amount: total,
          notes: orderData.notes,
        })
        .select()
        .maybeSingle();

      if (orderError) throw orderError;

      if (orderDataResult) {
        const orderItems = cartItems.map((item) => ({
          order_id: orderDataResult.id,
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        }));

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);

        if (itemsError) throw itemsError;
      }

      alert('تم تأكيد طلبك بنجاح! سنتواصل معك قريباً.');
      setCartItems([]);
      setIsCheckoutOpen(false);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('حدث خطأ أثناء إنشاء الطلب. يرجى المحاولة مرة أخرى.');
    }
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
      />

      <main>
        <HeroSlider />

        <section id="menu" className="py-16" dir="rtl">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className=" text-4xl font-bold text-gray-800 mb-4">قائمة الطعام</h2>
              <p className="text-xl text-gray-600">اختر من قائمتنا المتنوعة</p>
            </motion.div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#004f49] border-t-transparent"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-gray-600">
                لم يتم العثور على منتجات
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
          <div className='flex items-center justify-center mt-12'>
          <Link
            to="/products"
                  className="bg-[#004f49] text-white px-8 py-4 rounded-lg font-bold text lg hover:bg-[#003d37] transition-colors shadow-lg "
                >
                    اكتشف المزيد 
                  </Link>
                  </div>
        </section>

        <AboutSection />
        <ContactSection />
      </main>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        total={cartTotal}
        onConfirmOrder={handleConfirmOrder}
      />
    </div>
  );
}

export default Home;