// src/pages/ProductDetails.tsx
// صفحة تفاصيل المنتج – محسنة بالكامل للهواتف المحمولة مع الحفاظ على الفخامة على الشاشات الكبيرة

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Plus, Minus, ShoppingCart, ArrowRight, Home, Package, Truck, RefreshCw, Star, Heart, Share2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { CartItem, Product } from '../types';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'description' | 'shipping' | 'reviews'>('description');
  const [selectedImage, setSelectedImage] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // placeholder لصور متعددة (يمكن توسيعها لاحقاً)
  const productImages = product ? [product.image_url, product.image_url, product.image_url, product.image_url] : [];

  useEffect(() => {
    async function fetchData() {
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
          .order('is_featured', { ascending: false })
          .order('created_at', { ascending: false })
          .limit(12);

        if (allError) throw allError;
        setRelatedProducts(allProducts?.filter(p => p.id !== Number(id)) || []);
      } catch (err) {
        console.error('Error fetching product details:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleAddToCart = (product: Product, qty: number) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const addToCartWithAnimation = () => {
    if (!product) return;
    setIsAdding(true);
    handleAddToCart(product, quantity);
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 800);
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <>
        <Header cartItemsCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-16 w-16 border-6 border-[#004f49] border-t-transparent rounded-full"
          />
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header cartItemsCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
          <p className="text-2xl text-gray-600 font-medium text-center">المنتج غير موجود</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header cartItemsCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24 px-4 sm:px-6 " dir="rtl">
        {/* Breadcrumbs – أصغر وأفضل على الموبايل */}
        <div className="max-w-7xl mx-auto mb-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-600 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm">
            <Link to="/" className="flex items-center gap-1 hover:text-[#004f49]">
              <Home className="w-4 h-4" />
              الرئيسية
            </Link>
            <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <Link to="/products" className="hover:text-[#004f49]">المنتجات</Link>
            <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-[#004f49] font-medium truncate max-w-[150px] sm:max-w-none">{product.name}</span>
          </nav>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          {/* Main Section – عمود واحد على الموبايل، عمودين على الكبير */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
            {/* Images Gallery */}
            <div className="space-y-4 order-1 lg:order-none">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl bg-white">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-full aspect-square object-cover"
                  src={productImages[selectedImage] || product.image_url}
                  alt={product.name}
                />

                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-3">
                  {product.is_featured && (
                    <div className="bg-gradient-to-r from-[#004f49] to-[#006d65] text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                      مميز
                    </div>
                  )}
                  <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                    متوفر
                  </div>
                </div>
              </div>

              {/* Thumbnails – مخفية على الشاشات الصغيرة جداً أو أفقية مع scroll */}
              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {productImages.map((img, index) => (
                    <motion.button
                      key={index}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedImage(index)}
                      className={`relative overflow-hidden rounded-xl shadow-md min-w-[80px] aspect-square ${
                        selectedImage === index ? 'ring-4 ring-[#004f49]' : ''
                      }`}
                    >
                      <img src={img} alt={`صورة ${index + 1}`} className="w-full h-full object-cover" />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center order-2 ">
              <div className='flex flex-col justify-center gap-2 mb-2'>
                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex text-yellow-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`w-5 h-5 sm:w-6 sm:h-6 ${star <= 4.5 ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="text-sm sm:text-base text-gray-700">(4.5 • 124 تقييم)</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight bg-gradient-to-r from-[#004f49] to-[#006d65] bg-clip-text text-transparent">
                  {product.name}
                </h1>

                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8">
                  {product.description || 'وصف جذاب ومفصل للمنتج يجذب العميل ويوضح مميزاته الفريدة.'}
                </p>

                <div className="text-4xl sm:text-5xl font-extrabold text-[#004f49] mb-8">
                  {product.price} ج.م
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-stretch gap-4 mb-10">
                  <div className="flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 rounded-full px-4 py-4 shadow-inner">
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                      <Minus className="w-6 h-6 text-[#004f49]" />
                    </motion.button>
                    <span className="mx-6 text-2xl font-bold text-[#004f49]">{quantity}</span>
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => setQuantity(quantity + 1)}>
                      <Plus className="w-6 h-6 text-[#004f49]" />
                    </motion.button>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={addToCartWithAnimation}
                    disabled={isAdding}
                    className={`py-5 px-6  rounded-full font-bold text-lg shadow-xl transition-all ${
                      isAdding ? 'bg-green-600 text-white' : 'bg-gradient-to-r from-[#004f49] to-[#006d65] text-white'
                    }`}
                  >
                    {isAdding ? (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center justify-center gap-3">
                        تم الإضافة ✓
                      </motion.span>
                    ) : (
                      <span className="flex items-center justify-center gap-3">
                        <ShoppingCart className="w-7 h-7" />
                        أضف إلى السلة
                      </span>
                    )}
                  </motion.button>
                </div>



                {/* Quick Benefits – أفضل توزيع على الموبايل */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Truck className="w-10 h-10 text-[#004f49] mx-auto mb-2" />
                    <p className="text-sm font-semibold">توصيل مجاني</p>
                    <p className="text-xs text-gray-600">فوق 500 ج.م</p>
                  </div>
                  <div className="text-center">
                    <RefreshCw className="w-10 h-10 text-[#004f49] mx-auto mb-2" />
                    <p className="text-sm font-semibold">إرجاع سهل</p>
                    <p className="text-xs text-gray-600">14 يوم</p>
                  </div>
                  <div className="text-center">
                    <Package className="w-10 h-10 text-[#004f49] mx-auto mb-2" />
                    <p className="text-sm font-semibold">ضمان أصلي</p>
                    <p className="text-xs text-gray-600">100%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section – تبويبات أفقية مع scroll على الموبايل */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 lg:p-12 mb-20">
            <div className="flex overflow-x-auto gap-8 pb-4 mb-8 scrollbar-hide border-b border-gray-100">
              {(['description', 'shipping', 'reviews'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 text-lg font-semibold whitespace-nowrap transition-all relative ${
                    activeTab === tab ? 'text-[#004f49]' : 'text-gray-500'
                  }`}
                >
                  {tab === 'description' && 'الوصف'}
                  {tab === 'shipping' && 'الشحن والإرجاع'}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="mobileActiveTab"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#004f49] to-[#006d65] rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* باقي محتوى التبويبات كما هو مع تحسين للموبايل */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-base sm:text-lg leading-relaxed text-gray-700"
            >
              {activeTab === 'description' && (
                <div className="space-y-6">
                  <p>{product.description || 'وصف مفصل وجذاب للمنتج.'}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['جودة فائقة', 'تصميم أنيق', 'متانة عالية', 'سهولة الاستخدام', 'ضمان شامل', 'خامات طبيعية'].map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#004f49] rounded-full flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">الشحن</h3>
                    <ul className="space-y-3">
                      <li>• توصيل مجاني فوق 500 ج.م</li>
                      <li>• 2-5 أيام عمل داخل مصر</li>
                      <li>• شحن فوري في القاهرة</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">الإرجاع</h3>
                    <ul className="space-y-3">
                      <li>• إرجاع مجاني خلال 14 يوم</li>
                      <li>• استرداد كامل أو استبدال</li>
                      <li>• المنتج بحالته الأصلية</li>
                    </ul>
                  </div>
                </div>
              )}

              
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-20">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-[#004f49] to-[#006d65] bg-clip-text text-transparent"
              >
                منتجات قد تعجبك
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
                {relatedProducts.slice(0, 8).map((related) => (
                  <motion.div
                    key={related.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <ProductCard product={related} onAddToCart={handleAddToCart} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </>
  );
}