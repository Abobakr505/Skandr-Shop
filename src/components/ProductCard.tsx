// src/components/ProductCard.tsx
// Updated to include Link to details page

import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product, quantity);
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
      dir="rtl"
    >
      <div className="relative h-56 overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </Link>
        {product.is_featured && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 bg-[#004f49] text-white px-3 py-1 rounded-full text-xs font-bold"
          >
            مميز
          </motion.div>
        )}
      </div>

      <div className="p-5">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-[#004f49] transition-colors">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </motion.button>
            <span className="w-8 text-center font-bold">{quantity}</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
          <div className="text-2xl font-bold text-[#004f49]">{product.price} ج.م</div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors ${
            isAdding
              ? 'bg-green-500 text-white'
              : 'bg-[#004f49] text-white hover:bg-[#003d37]'
          }`}
        >
          {isAdding ? (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              تم الإضافة ✓
            </motion.span>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              أضف للسلة
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}