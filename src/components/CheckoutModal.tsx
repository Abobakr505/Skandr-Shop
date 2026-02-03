import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, MapPin, FileText } from 'lucide-react';
import { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onConfirmOrder: (orderData: {
    name: string;
    phone: string;
    address: string;
    notes: string;
  }) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  total,
  onConfirmOrder
}: CheckoutModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmOrder({ name, phone, address, notes });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
              dir="rtl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                <h2 className="text-2xl font-bold text-gray-800">إتمام الطلب</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3">ملخص الطلب</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex justify-between items-center"
                      >
                        <span className="text-gray-700">
                          {item.product.name} × {item.quantity}
                        </span>
                        <span className="font-bold text-[#004f49]">
                          {(item.product.price * item.quantity).toFixed(2)} ج.م
                        </span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2 flex justify-between items-center">
                      <span className="font-bold text-lg">المجموع:</span>
                      <span className="font-bold text-xl text-[#004f49]">
                        {total.toFixed(2)} ج.م
                      </span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        الاسم الكامل
                      </div>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004f49] focus:border-transparent"
                      placeholder="أدخل اسمك الكامل"
                      dir="rtl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        رقم الهاتف
                      </div>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004f49] focus:border-transparent"
                      placeholder="01XXXXXXXXX"
                      dir="rtl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        عنوان التوصيل
                      </div>
                    </label>
                    <textarea
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004f49] focus:border-transparent resize-none"
                      rows={3}
                      placeholder="أدخل العنوان بالتفصيل"
                      dir="rtl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        ملاحظات إضافية (اختياري)
                      </div>
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004f49] focus:border-transparent resize-none"
                      rows={2}
                      placeholder="أي ملاحظات خاصة بالطلب"
                      dir="rtl"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#004f49] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#003d37] transition-colors shadow-lg"
                  >
                    تأكيد الطلب
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
