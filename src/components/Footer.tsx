import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Facebook, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#004f49] text-white mt-20" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-[#004f49] rounded-md flex items-center justify-center">
              <img src="/about.jpg" alt="" />
            </div>
              <div>
                <h3 className="text-xl font-bold">إسكندر</h3>
                <p className="text-sm text-gray-300">كبدة إسكندراني أصلية</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              نقدم لكم أشهى وألذ كبدة إسكندراني بالطريقة الأصلية منذ عام 1985
            </p>
          </motion.div>
          <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.1 }}
>
  <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>

  <div className="space-y-3">
    {[
      { label: 'الرئيسية', href: '#home' },
      { label: 'المنيو', href: '#menu' },
      { label: 'من نحن', href: '#about' },
      { label: 'تواصل معنا', href: '#contact' },
    ].map((item, i) => (
      <a
        key={i}
        href={item.href}
        className="group flex items-center gap-3 text-sm text-white transition-colors"
      >
        {/* النقطة */}
        <span
          className="w-2 h-2 rounded-full bg-white
                     opacity-0 scale-0
                     group-hover:opacity-100 group-hover:scale-100
                     transition-all duration-300"
        />
        <span>{item.label}</span>
      </a>
    ))}
  </div>
</motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-4">معلومات التواصل</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span className="text-sm">03-4567890</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">الإسكندرية، شارع فؤاد</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5" />
                <span className="text-sm">يومياً من 10 صباحاً - 2 فجراً</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span className="text-sm">info@eskander.com</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-4">تابعنا</h3>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-300"
        >
          <p>جميع الحقوق محفوظة © 2024 إسكندر - كبدة إسكندراني</p>
        </motion.div>
      </div>
    </footer>
  );
}
